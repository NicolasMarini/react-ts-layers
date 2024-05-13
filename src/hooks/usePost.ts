import { useState } from "react";
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
    loading: submitting,
    data: createdPost,
    error: postError,
    makeRequest: makeCreatePostRequest,
  } = useAPI<PostModel | Error>((post) => postService.create(post));

  // const [posts, setPosts] = useState<PostModel[]>([]);

  const fetchAllPosts = async () => {
    try {
      // const allPosts = await postService.getAll();
      const allPosts = await makeRequest();
      console.log("allPosts:: ", allPosts);
      // setPosts(allPosts);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  /*

  const getPostById = async (postId: number) => {
    try {
      setLoading(true);
      const post = await postService.getById(postId);
      setPost(post);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };
  */

  const createPost = async (post: NewPost): Promise<unknown> => {
    try {
      // const createdPost = await postService.create<PostModel, NewPost>(post);
      await makeCreatePostRequest(post);

      // return createdPost;
    } catch (error) {
      console.error(error);

      return error as Error;
    } finally {
      // setLoading(false);
    }
  };

  return {
    loading,
    posts: data,
    // post,
    fetchAllPosts,
    error,
    createPost,
    createdPost,
    // , getPostById,
  };
};
