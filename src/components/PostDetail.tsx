import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";

const PostDetail = () => {
  const { post, getPostById, loading } = usePost();
  const params = useParams();
  const postId = Number(params.postId);

  useEffect(() => {
    getPostById(postId);
  }, [postId]);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <h1>Post Detail</h1>
      <p>{post?.getTitle()}</p>
      <p>{post?.getBody()}</p>
    </div>
  );
};

export default PostDetail;
