// Frontend/src/features/posts/hook/usePost.js
import { getFeed, toggleLike } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleToggleLike = async (postId) => {
    
    // console.log("heart click:", postId);
  
    // 1) Optimistic UI update – turant toggle
    setFeed((prev) =>
      prev.map((p) =>
        p._id === postId ? { ...p, isLiked: !p.isLiked } : p
      )
    );
  
    try {
      // 2) Actual API call
      const { isLiked } = await toggleLike(postId);
      // console.log("toggleLike se kya aaya:", isLiked, "postId:", postId);
  
      // 3) Server ke response se state sync
      setFeed((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, isLiked } : p
        )
      );
    } catch (err) {
      console.error("toggleLike error:", err);
  
      // (optional) 4) Agar error aaye to UI rollback
      setFeed((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, isLiked: !p.isLiked } : p
        )
      );
    }
  };

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleToggleLike,
  };
};