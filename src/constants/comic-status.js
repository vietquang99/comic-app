/**
 * Các hằng số định nghĩa trạng thái của truyện
 * Giữ đồng bộ với backend
 * @type {Object}
 */
export const COMIC_STATUS = {
  ONGOING: 0, // Đang tiến hành
  COMPLETED: 1, // Đã hoàn thành
  DROPPED: 2, // Đã ngừng
};

/**
 * Map các giá trị số sang text tương ứng
 * @type {Object}
 */
export const COMIC_STATUS_TEXT = {
  [COMIC_STATUS.ONGOING]: "ongoing",
  [COMIC_STATUS.COMPLETED]: "completed",
  [COMIC_STATUS.DROPPED]: "dropped",
};

/**
 * Map các giá trị số sang tên hiển thị cho người dùng
 * @type {Object}
 */
export const COMIC_STATUS_DISPLAY = {
  [COMIC_STATUS.ONGOING]: "Đang tiến hành",
  [COMIC_STATUS.COMPLETED]: "Đã hoàn thành",
  [COMIC_STATUS.DROPPED]: "Đã ngừng",
};

/**
 * Lấy text hiển thị cho người dùng dựa vào giá trị số
 * @param {number} statusValue - Giá trị số của trạng thái
 * @returns {string} - Tên hiển thị tương ứng
 */
export const getStatusDisplay = (statusValue) => {
  return COMIC_STATUS_DISPLAY[statusValue] || "Không xác định";
};

/**
 * Lấy text code dựa vào giá trị số
 * @param {number} statusValue - Giá trị số của trạng thái
 * @returns {string} - Giá trị text tương ứng
 */
export const getStatusText = (statusValue) => {
  return COMIC_STATUS_TEXT[statusValue] || "unknown";
};

/**
 * Lấy giá trị số dựa vào text code
 * @param {string} statusText - Giá trị text của trạng thái
 * @returns {number|null} - Giá trị số tương ứng hoặc null nếu không hợp lệ
 */
export const getStatusValue = (statusText) => {
  if (!statusText || typeof statusText !== "string") {
    return null;
  }

  const textLower = statusText.toLowerCase();
  for (const [key, value] of Object.entries(COMIC_STATUS_TEXT)) {
    if (value === textLower) {
      return parseInt(key);
    }
  }

  return null;
};

/**
 * Danh sách tất cả các trạng thái để hiển thị trong dropdown
 * @type {Array}
 */
export const ALL_STATUSES = Object.entries(COMIC_STATUS).map(
  ([key, value]) => ({
    label: COMIC_STATUS_DISPLAY[value],
    value: value,
    code: COMIC_STATUS_TEXT[value],
  })
);
