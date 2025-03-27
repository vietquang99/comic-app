"use client";

import { useState } from "react";
import { addComment } from "@/services/comic";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CommentSection({ comicId, initialComments = [] }) {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [localComments, setLocalComments] = useState(initialComments);

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
    <Card>
      <CardHeader>
        <CardTitle>Bình luận & Đánh giá</CardTitle>
        <CardDescription>
          {localComments.length > 0
            ? `${localComments.length} đánh giá`
            : "Chưa có đánh giá nào"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Hiển thị xếp hạng trung bình */}
        <div className="mb-6">
          <div className="flex items-center">
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
            <span className="ml-2 text-sm text-muted-foreground">
              ({localComments.length} đánh giá)
            </span>
          </div>
        </div>

        {/* Form thêm bình luận */}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Đánh giá của bạn
            </label>
            <div className="flex">{renderStars(rating, true)}</div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Bình luận của bạn
            </label>
            <Textarea
              id="comment"
              rows="4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ ý kiến của bạn về truyện này..."
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert
              variant="success"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
          </Button>
        </form>

        {/* Danh sách bình luận */}
        <div className="mt-8 space-y-4">
          <h4 className="font-medium">
            Tất cả bình luận ({localComments.length})
          </h4>

          {localComments.length === 0 ? (
            <p className="text-muted-foreground">
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </p>
          ) : (
            <div className="space-y-4">
              {localComments.map((comment, index) => (
                <div
                  key={comment.id || index}
                  className="p-4 border rounded-lg bg-muted/40"
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">
                      {comment.user_name || "Người dùng ẩn danh"}
                    </div>
                    <div className="flex">{renderStars(comment.rating)}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(comment.created_at).toLocaleDateString("vi-VN")}
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
