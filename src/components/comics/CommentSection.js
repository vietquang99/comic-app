"use client";

import { useState } from "react";
import { addComment } from "@/services/comic";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function CommentSection({ comicId, comments = [] }) {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [localComments, setLocalComments] = useState(comments);

  // Xử lý thay đổi rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Hiển thị stars rating
  const renderStars = (value, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (interactive) {
        stars.push(
          <button
            key={i}
            onClick={() => interactive && handleRatingChange(i)}
            className="text-yellow-400 focus:outline-none"
          >
            {i <= value ? (
              <FaStar className="inline" />
            ) : (
              <FaRegStar className="inline" />
            )}
          </button>
        );
      } else {
        stars.push(
          <span key={i} className="text-yellow-400">
            {i <= value ? (
              <FaStar className="inline" />
            ) : (
              <FaRegStar className="inline" />
            )}
          </span>
        );
      }
    }
    return stars;
  };

  // Xử lý gửi bình luận
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError("Vui lòng nhập nội dung bình luận");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // Tạo bình luận mới
      const commentData = {
        comic_id: parseInt(comicId, 10),
        content: newComment.trim(),
        rating,
        user_name: "Người dùng ẩn danh", // Có thể thay thế bằng tên người dùng nếu có hệ thống đăng nhập
        created_at: new Date().toISOString(),
      };

      // Gửi bình luận đến API
      const addedComment = await addComment(commentData);

      // Cập nhật UI
      setLocalComments([addedComment, ...localComments]);
      setNewComment("");
      setRating(5);
      setSuccess("Bình luận của bạn đã được gửi thành công!");

      // Xóa thông báo thành công sau 3 giây
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
      setError("Có lỗi xảy ra khi gửi bình luận. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4">Bình luận & Đánh giá</h3>

      {/* Hiển thị xếp hạng trung bình */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="flex">
            {renderStars(
              localComments.length > 0
                ? Math.round(
                    localComments.reduce(
                      (acc, comment) => acc + comment.rating,
                      0
                    ) / localComments.length
                  )
                : 0
            )}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            ({localComments.length} đánh giá)
          </span>
        </div>
      </div>

      {/* Form thêm bình luận */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Đánh giá của bạn
          </label>
          <div className="flex">{renderStars(rating, true)}</div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Bình luận của bạn
          </label>
          <textarea
            id="comment"
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Chia sẻ ý kiến của bạn về truyện này..."
          ></textarea>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
        </button>
      </form>

      {/* Danh sách bình luận */}
      <div className="space-y-4">
        <h4 className="font-medium">
          Tất cả bình luận ({localComments.length})
        </h4>

        {localComments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </p>
        ) : (
          localComments.map((comment, index) => (
            <div
              key={comment.id || index}
              className="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div className="font-medium">
                  {comment.user_name || "Người dùng ẩn danh"}
                </div>
                <div className="flex">{renderStars(comment.rating)}</div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(comment.created_at).toLocaleDateString("vi-VN")}
              </div>
              <p className="mt-2">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
