import { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import { PostModel } from "../models/PostModel";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  title,
  body,
}: {
  title: string;
  body: string;
  id?: number;
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid gray",
        margin: 32,
        padding: 24,
        cursor: "pointer",
      }}
      key={id}
      onClick={() => navigate(`/posts/${id}`)}
    >
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

const Posts = () => {
  const { loading, posts, fetchAllPosts, error, createdPost, createPost } =
    usePost();

  console.log("Posts createdPost:: ", createdPost);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error && error instanceof Error) {
    console.log("There was an error:: ", error.message);
    return <h1>There was an error {error.message}</h1>;
  }

  return (
    <div>
      <h1>Posts</h1>

      <button
        onClick={(): Promise<PostModel | Error> =>
          createPost({ userId: 1, title: "foo", body: "bar" })
        }
      >
        Create Post
      </button>

      {posts.map((post) => (
        <Card id={post.getId()} title={post.getTitle()} body={post.getBody()} />
      ))}
    </div>
  );
};

export default Posts;
