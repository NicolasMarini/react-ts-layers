import { useServiceContext } from "../contexts/ServiceContext";
import { PostModel } from "../models/PostModel";
import { useAPI } from "./useAPI";

export type NewPost = {
  userId: number;
  title: string;
  body: string;
};

export const usePost = () => {
  const { postService } = useServiceContext();
  console.log("usePost postService:: ", postService.getAll);
  const { loading, data, error, makeRequest } = useAPI<PostModel>(() =>
    postService.getAll()
  );

  const {
    loading: loadloadingPostDetail,
    data: postDetail,
    error: postDetailError,
    makeRequest: makeRequestPostDetail,
  } = useAPI<PostModel>((postId) => postService.getById(postId));

  const {
    loading: submitting,
    data: createdPost,
    error: postError,
    makeRequest: makeCreatePostRequest,
  } = useAPI<PostModel | Error>((post) => postService.create(post));

  const fetchAllPosts = async () => {
    try {
      const allPosts = await makeRequest();
      console.log("allPosts:: ", allPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const getPostDetail = async (postId: number) => {
    try {
      console.log("getting post detail...");
      await makeRequestPostDetail(postId);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const createPost = async (post: NewPost): Promise<void | Error> => {
    try {
      await makeCreatePostRequest(post);
    } catch (error) {
      console.error(error);

      return error as Error;
    }
  };

  return {
    loading,
    posts: data,
    fetchAllPosts,
    error,
    createPost,
    createdPost,
    getPostDetail,
    loadloadingPostDetail,
    postDetail,
    postDetailError,
  };
};
