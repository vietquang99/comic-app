import { mockComics } from "@/constants/mock-data";
import { supabase, fetchData, fetchById } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

// Cache các hàm lấy dữ liệu thường xuyên sử dụng
const CACHE_TAGS = {
  ALL_COMICS: "all-comics",
  FEATURED_COMICS: "featured-comics",
  UPDATED_COMICS: "updated-comics",
};

/**
 * Lấy danh sách tất cả các truyện từ Supabase
 * @param {boolean} useMockData - Sử dụng dữ liệu mock nếu true
 * @returns {Promise<Array>} Danh sách truyện
 */
export const getAllComics = unstable_cache(
  async (useMockData = false) => {
    if (useMockData) {
      // Kết hợp truyện từ featured và updated
      const allComics = [...mockComics.featured, ...mockComics.updated];
      // Loại bỏ trùng lặp bằng ID
      return [...new Map(allComics.map((comic) => [comic.id, comic])).values()];
    }

    try {
      // Lấy dữ liệu từ Supabase
      const data = await fetchData("comics");
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách truyện:", error);
      // Fallback về dữ liệu mock nếu có lỗi
      const allComics = [...mockComics.featured, ...mockComics.updated];
      return [...new Map(allComics.map((comic) => [comic.id, comic])).values()];
    }
  },
  ["getAllComics"],
  { tags: [CACHE_TAGS.ALL_COMICS], revalidate: 3600 } // Cache 1 giờ
);

/**
 * Lấy thông tin chi tiết của một truyện theo ID từ Supabase
 * @param {number} id - ID của truyện
 * @param {boolean} useMockData - Sử dụng dữ liệu mock nếu true
 * @returns {Promise<Object|null>} Thông tin chi tiết truyện hoặc null nếu không tìm thấy
 */
export const getComic = unstable_cache(
  async (id, useMockData = false) => {
    const numericId = parseInt(id, 10);

    if (useMockData) {
      return mockComics.details[numericId] || null;
    }

    try {
      // Lấy thông tin truyện từ Supabase
      const comic = await fetchById("comics", numericId);

      if (!comic) return null;

      // Lấy thêm các chapters của truyện
      const { data: chapters, error: chaptersError } = await supabase
        .from("chapters")
        .select("*")
        .eq("comic_id", numericId)
        .order("number", { ascending: false });

      if (chaptersError) throw chaptersError;

      // Lấy thêm các comments của truyện
      const { data: comments, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("comic_id", numericId)
        .order("created_at", { ascending: false });

      if (commentsError) throw commentsError;

      // Kết hợp dữ liệu
      return {
        ...comic,
        chapters: chapters || [],
        comments: comments || [],
      };
    } catch (error) {
      console.error(`Lỗi khi lấy chi tiết truyện với ID ${id}:`, error);
      // Fallback về dữ liệu mock nếu có lỗi
      return mockComics.details[numericId] || null;
    }
  },
  ["getComic"],
  {
    tags: ["comics", "comic-details"],
    revalidate: 3600,
  } // Cache 1 giờ với tags cố định
);

/**
 * Lấy danh sách các truyện nổi bật từ Supabase
 * @param {number} limit - Số lượng tối đa truyện cần lấy
 * @param {boolean} useMockData - Sử dụng dữ liệu mock nếu true
 * @returns {Promise<Array>} Danh sách truyện nổi bật
 */
export async function getFeaturedComics(limit = 8, useMockData = false) {
  if (useMockData) {
    return mockComics.featured.slice(0, limit);
  }

  try {
    // Lấy dữ liệu từ Supabase
    const data = await fetchData("comics", {
      filters: [{ column: "is_featured", operator: "eq", value: true }],
      limit,
      order: { column: "updated_at", ascending: false },
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách truyện nổi bật:", error);
    // Fallback về dữ liệu mock nếu có lỗi
    return mockComics.featured.slice(0, limit);
  }
}

/**
 * Lấy danh sách các truyện mới cập nhật từ Supabase
 * @param {number} limit - Số lượng tối đa truyện cần lấy
 * @param {boolean} useMockData - Sử dụng dữ liệu mock nếu true
 * @returns {Promise<Array>} Danh sách truyện mới cập nhật
 */
export async function getUpdatedComics(limit = 12, useMockData = false) {
  if (useMockData) {
    return mockComics.updated.slice(0, limit);
  }

  try {
    // Lấy dữ liệu từ Supabase
    const data = await fetchData("comics", {
      limit,
      order: { column: "updated_at", ascending: false },
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách truyện mới cập nhật:", error);
    // Fallback về dữ liệu mock nếu có lỗi
    return mockComics.updated.slice(0, limit);
  }
}

/**
 * Tìm kiếm truyện theo tên từ Supabase
 * @param {string} query - Từ khóa tìm kiếm
 * @param {boolean} useMockData - Sử dụng dữ liệu mock nếu true
 * @returns {Promise<Array>} Danh sách truyện tìm thấy
 */
export const searchComics = async (query, useMockData = false) => {
  if (!query) return [];

  if (useMockData) {
    const allComics = await getAllComics(true);
    const normalizedQuery = query.toLowerCase();
    return allComics.filter((comic) =>
      comic.title.toLowerCase().includes(normalizedQuery)
    );
  }

  try {
    // Tìm kiếm với Supabase
    const { data, error } = await supabase
      .from("comics")
      .select("*")
      .ilike("title", `%${query}%`);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(`Lỗi khi tìm kiếm truyện với từ khóa "${query}":`, error);
    // Fallback về tìm kiếm trong dữ liệu mock nếu có lỗi
    const allComics = await getAllComics(true);
    const normalizedQuery = query.toLowerCase();
    return allComics.filter((comic) =>
      comic.title.toLowerCase().includes(normalizedQuery)
    );
  }
};

/**
 * Lấy danh sách các chapter của một truyện từ Supabase
 * @param {number} comicId - ID của truyện
 * @param {boolean} useMockData - Sử dụng dữ liệu mock nếu true
 * @returns {Promise<Array|null>} Danh sách chapter hoặc null nếu không tìm thấy truyện
 */
export const getChapters = async (comicId, useMockData = false) => {
  if (useMockData) {
    const comic = mockComics.details[comicId];
    return comic ? comic.chapters : null;
  }

  try {
    // Lấy chapters từ Supabase
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("comic_id", comicId)
      .order("number", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(
      `Lỗi khi lấy danh sách chapter của truyện với ID ${comicId}:`,
      error
    );
    // Fallback về dữ liệu mock nếu có lỗi
    const comic = mockComics.details[comicId];
    return comic ? comic.chapters : null;
  }
};

/**
 * Lấy thông tin của một chapter cụ thể từ Supabase
 * @param {number} comicId - ID của truyện
 * @param {number} chapterId - ID của chapter
 * @param {boolean} useMockData - Sử dụng dữ liệu mock nếu true
 * @returns {Promise<Object|null>} Thông tin chapter hoặc null nếu không tìm thấy
 */
export const getChapter = async (comicId, chapterId, useMockData = false) => {
  if (useMockData) {
    const chapters = await getChapters(comicId, true);
    if (!chapters) return null;
    return (
      chapters.find((chapter) => chapter.id === parseInt(chapterId, 10)) || null
    );
  }

  try {
    // Lấy chapter từ Supabase
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("id", chapterId)
      .eq("comic_id", comicId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(
      `Lỗi khi lấy chapter ${chapterId} của truyện ${comicId}:`,
      error
    );
    // Fallback về dữ liệu mock nếu có lỗi
    const chapters = await getChapters(comicId, true);
    if (!chapters) return null;
    return (
      chapters.find((chapter) => chapter.id === parseInt(chapterId, 10)) || null
    );
  }
};

/**
 * Thêm bình luận mới vào truyện
 * @param {Object} comment - Thông tin bình luận
 * @returns {Promise<Object>} Bình luận đã thêm
 */
export const addComment = async (comment) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
      .select();

    if (error) throw error;

    return data[0];
  } catch (error) {
    console.error("Lỗi khi thêm bình luận:", error);
    throw error;
  }
};

/**
 * Cập nhật số lượt xem của truyện
 * @param {number} comicId - ID của truyện
 * @returns {Promise<Object>} Truyện đã cập nhật
 */
export const incrementViewCount = async (comicId) => {
  try {
    // Đầu tiên, lấy số lượt xem hiện tại
    const { data: comic, error: getError } = await supabase
      .from("comics")
      .select("views")
      .eq("id", comicId)
      .single();

    if (getError) throw getError;

    // Cập nhật số lượt xem
    const { data, error: updateError } = await supabase
      .from("comics")
      .update({ views: (comic.views || 0) + 1 })
      .eq("id", comicId)
      .select();

    if (updateError) throw updateError;

    return data[0];
  } catch (error) {
    console.error(`Lỗi khi cập nhật số lượt xem cho truyện ${comicId}:`, error);
    throw error;
  }
};
