import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { PostModel } from "../models/PostModel";

const PostDetail = () => {
  const { postDetail, getPostDetail, loadloadingPostDetail, postDetailError } =
    usePost();
  const params = useParams();
  const postId = Number(params.postId);

  useEffect(() => {
    getPostDetail(postId);
  }, [postId]);

  if (loadloadingPostDetail) {
    return <span>Loading...</span>;
  }

  console.log("postDetail:: ", postDetail);

  return (
    <div>
      <h1>Post Detail</h1>
      <p>{postDetail && (postDetail as PostModel).getTitle()}</p>
      <p>{postDetail && (postDetail as PostModel).getBody()}</p>
    </div>
  );
};

export default PostDetail;
