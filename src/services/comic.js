import { apiService } from './api';

export const comicService = {
  // Lấy danh sách truyện được đề cử
  getFeaturedComics: async () => {
    try {
      const response = await apiService.request('/comics/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured comics:', error);
      return [];
    }
  },

  // Lấy danh sách truyện mới cập nhật
  getUpdatedComics: async () => {
    try {
      const response = await apiService.request('/comics/updated');
      return response.data;
    } catch (error) {
      console.error('Error fetching updated comics:', error);
      return [];
    }
  },

  // Lấy chi tiết truyện
  getComicById: async (id) => {
    try {
      const response = await apiService.request(`/comics/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comic details:', error);
      return null;
    }
  }
}; 