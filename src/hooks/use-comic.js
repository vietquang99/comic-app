import { useState, useEffect, useCallback } from "react";
import { comicService } from "@/services/comic";
import { ALL_STATUSES } from "@/constants/comic-status";

/**
 * Hook quản lý trạng thái và tương tác với truyện
 * @returns {Object} - Các hàm và state liên quan đến truyện
 */
export const useComic = () => {
  // Trạng thái của danh sách truyện
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // Trạng thái lọc và sắp xếp
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    status: "",
    sortBy: "updatedAt",
    sortOrder: "desc",
  });

  // Danh sách trạng thái
  const [statuses, setStatuses] = useState(ALL_STATUSES);

  /**
   * Lấy danh sách truyện
   */
  const fetchComics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Tạo param từ filters và pagination
      const params = {
        ...filters,
        limit: pagination.pageSize,
        start: (pagination.page - 1) * pagination.pageSize,
      };

      // Gọi API service
      const result = await comicService.searchComics(params);

      if (result && result.data) {
        setComics(result.data);
        setPagination((prev) => ({
          ...prev,
          total: result.meta?.pagination?.total || 0,
        }));
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải danh sách truyện");
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  /**
   * Lấy thông tin chi tiết truyện
   */
  const getComicDetail = async (id) => {
    try {
      return await comicService.getComicById(id);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải thông tin truyện");
      return null;
    }
  };

  /**
   * Tăng lượt xem cho truyện
   */
  const increaseViewCount = async (id) => {
    try {
      return await comicService.increaseViewCount(id);
    } catch (err) {
      console.error("Lỗi khi tăng lượt xem:", err);
      return null;
    }
  };

  /**
   * Đặt lại bộ lọc và tải lại danh sách
   */
  const resetFilters = () => {
    setFilters({
      title: "",
      author: "",
      status: "",
      sortBy: "updatedAt",
      sortOrder: "desc",
    });
  };

  /**
   * Cập nhật bộ lọc
   */
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));

    // Reset lại trang về 1 khi thay đổi bộ lọc
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  /**
   * Chuyển đến trang khác
   */
  const goToPage = (page) => {
    setPagination((prev) => ({
      ...prev,
      page: page,
    }));
  };

  /**
   * Thay đổi số lượng truyện mỗi trang
   */
  const changePageSize = (size) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      page: 1,
    }));
  };

  /**
   * Lấy danh sách các trạng thái từ server
   */
  const fetchStatuses = async () => {
    try {
      const result = await comicService.getStatuses();
      if (result && result.status && result.statusText) {
        // Tạo danh sách trạng thái cho dropdown
        const serverStatuses = Object.entries(result.status).map(
          ([key, value]) => ({
            label: key,
            value: value,
            code: result.statusText[value],
          })
        );

        setStatuses(serverStatuses);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách trạng thái:", err);
    }
  };

  // Tự động lấy danh sách trạng thái khi khởi tạo hook
  useEffect(() => {
    fetchStatuses();
  }, []);

  // Tự động lấy danh sách truyện khi filters hoặc pagination thay đổi
  useEffect(() => {
    fetchComics();
  }, [fetchComics]);

  return {
    // State
    comics,
    loading,
    error,
    pagination,
    filters,
    statuses,

    // Actions
    fetchComics,
    getComicDetail,
    increaseViewCount,
    resetFilters,
    updateFilters,
    goToPage,
    changePageSize,
  };
};
