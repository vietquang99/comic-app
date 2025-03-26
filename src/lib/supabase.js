import { createClient } from "@supabase/supabase-js";

// Các biến môi trường cần được đặt trong .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Kiểm tra xem các biến môi trường đã được đặt chưa
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Thiếu biến môi trường Supabase. Vui lòng đặt NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY trong .env.local"
  );
}

// Sử dụng singleton pattern để đảm bảo chỉ một instance của Supabase client được tạo
let supabaseInstance = null;

/**
 * Lấy instance Supabase client (singleton pattern)
 * @returns {Object} Supabase client
 */
export function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  supabaseInstance = createClient(supabaseUrl || "", supabaseAnonKey || "", {
    auth: {
      persistSession: false,
    },
    // Tối ưu header request
    global: {
      headers: {
        "x-application-name": "comic-app",
      },
    },
  });

  return supabaseInstance;
}

// Tạo client Supabase
export const supabase = getSupabaseClient();

// Thêm debounce cho các request liên tiếp
const pendingRequests = {};

/**
 * Lấy dữ liệu từ bảng với caching
 * @param {string} table - Tên bảng
 * @param {Object} options - Các tùy chọn truy vấn
 * @returns {Promise} Kết quả truy vấn
 */
export async function fetchData(table, options = {}) {
  const {
    select = "*",
    filters = [],
    limit,
    order = { column: "created_at", ascending: false },
  } = options;

  // Tạo key duy nhất cho request
  const requestKey = JSON.stringify({ table, options });

  // Kiểm tra nếu đã có request tương tự đang pending
  if (pendingRequests[requestKey]) {
    return pendingRequests[requestKey];
  }

  // Tạo request mới và lưu vào danh sách pending
  const requestPromise = new Promise(async (resolve, reject) => {
    try {
      let query = supabase.from(table).select(select);

      // Áp dụng các bộ lọc
      filters.forEach((filter) => {
        const { column, operator, value } = filter;
        query = query.filter(column, operator, value);
      });

      // Áp dụng sắp xếp
      if (order) {
        query = query.order(order.column, { ascending: order.ascending });
      }

      // Áp dụng giới hạn
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error(`Lỗi khi lấy dữ liệu từ bảng ${table}:`, error);
        reject(error);
      } else {
        resolve(data);
      }
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu từ bảng ${table}:`, error);
      reject(error);
    } finally {
      // Xóa request khỏi danh sách pending
      delete pendingRequests[requestKey];
    }
  });

  // Lưu promise vào danh sách pending
  pendingRequests[requestKey] = requestPromise;

  return requestPromise;
}

/**
 * Lấy một bản ghi theo ID
 * @param {string} table - Tên bảng
 * @param {number|string} id - ID của bản ghi
 * @param {string} select - Các cột cần lấy
 * @returns {Promise} Bản ghi
 */
export async function fetchById(table, id, select = "*") {
  // Tạo key duy nhất cho request
  const requestKey = JSON.stringify({ table, id, select });

  // Kiểm tra nếu đã có request tương tự đang pending
  if (pendingRequests[requestKey]) {
    return pendingRequests[requestKey];
  }

  // Tạo request mới và lưu vào danh sách pending
  const requestPromise = new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(select)
        .eq("id", id)
        .single();

      if (error) {
        console.error(
          `Lỗi khi lấy dữ liệu từ bảng ${table} với ID ${id}:`,
          error
        );
        reject(error);
      } else {
        resolve(data);
      }
    } catch (error) {
      console.error(
        `Lỗi khi lấy dữ liệu từ bảng ${table} với ID ${id}:`,
        error
      );
      reject(error);
    } finally {
      // Xóa request khỏi danh sách pending
      delete pendingRequests[requestKey];
    }
  });

  // Lưu promise vào danh sách pending
  pendingRequests[requestKey] = requestPromise;

  return requestPromise;
}

/**
 * Chèn dữ liệu vào bảng
 * @param {string} table - Tên bảng
 * @param {Object|Array} data - Dữ liệu cần chèn
 * @returns {Promise} Dữ liệu đã chèn
 */
export async function insertData(table, data) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();

  if (error) {
    console.error(`Lỗi khi chèn dữ liệu vào bảng ${table}:`, error);
    throw error;
  }

  return result;
}

/**
 * Cập nhật dữ liệu trong bảng
 * @param {string} table - Tên bảng
 * @param {Object} data - Dữ liệu cần cập nhật
 * @param {Object} match - Điều kiện để khớp bản ghi cần cập nhật
 * @returns {Promise} Dữ liệu đã cập nhật
 */
export async function updateData(table, data, match) {
  const { column, value } = match;

  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq(column, value)
    .select();

  if (error) {
    console.error(`Lỗi khi cập nhật dữ liệu trong bảng ${table}:`, error);
    throw error;
  }

  return result;
}

/**
 * Xóa dữ liệu khỏi bảng
 * @param {string} table - Tên bảng
 * @param {Object} match - Điều kiện để khớp bản ghi cần xóa
 * @returns {Promise} Kết quả xóa
 */
export async function deleteData(table, match) {
  const { column, value } = match;

  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq(column, value)
    .select();

  if (error) {
    console.error(`Lỗi khi xóa dữ liệu từ bảng ${table}:`, error);
    throw error;
  }

  return data;
}
