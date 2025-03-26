import { API_CONFIG } from "@/constants/config";

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.contentType = API_CONFIG.CONTENT_TYPE;
    this.timeout = API_CONFIG.TIMEOUT;
    this.maxRetries = API_CONFIG.MAX_RETRIES;
  }

  /**
   * Thực hiện request API
   * @param {string} endpoint - Đường dẫn API
   * @param {Object} options - Tùy chọn fetch
   * @param {number} retryCount - Số lần thử lại (mặc định: 0)
   * @returns {Promise<any>} Kết quả từ API
   */
  async request(endpoint, options = {}, retryCount = 0) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        "Content-Type": this.contentType,
      },
    };

    // Thêm timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const mergedOptions = {
        ...defaultOptions,
        ...options,
        signal: controller.signal,
      };

      // Thêm auth token nếu có
      const token = this.getToken();
      if (token) {
        mergedOptions.headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, mergedOptions);
      clearTimeout(timeoutId);

      // Kiểm tra response
      if (!response.ok) {
        if (response.status === 401) {
          // Xử lý trường hợp token hết hạn
          this.clearToken();
        }

        // Phân tích lỗi từ server
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.error?.message ||
            `HTTP error! status: ${response.status}`;
        } catch {
          errorMessage = `HTTP error! status: ${response.status}`;
        }

        throw new Error(errorMessage);
      }

      // Kiểm tra content-type của response
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      clearTimeout(timeoutId);

      // Xử lý lỗi timeout
      if (error.name === "AbortError") {
        console.error("Request timeout");
        throw new Error("Yêu cầu đã hết thời gian, vui lòng thử lại sau");
      }

      // Thử lại nếu chưa vượt quá số lần cho phép
      if (retryCount < this.maxRetries) {
        console.log(
          `Retrying request (${retryCount + 1}/${this.maxRetries})...`
        );
        return this.request(endpoint, options, retryCount + 1);
      }

      console.error("API request failed:", error);
      throw error;
    }
  }

  /**
   * Lấy token từ localStorage
   * @returns {string|null} Token
   */
  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  }

  /**
   * Xóa token khỏi localStorage
   */
  clearToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async getCurrentUser() {
    return this.request("/auth/me");
  }

  // Comic endpoints
  async getComics(params = {}) {
    return this.request("/comics", {
      method: "GET",
      params,
    });
  }

  async getComicById(id) {
    return this.request(`/comics/${id}`);
  }
}

// Tạo instance của ApiService
export const apiService = new ApiService();
