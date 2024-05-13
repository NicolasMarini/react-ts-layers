import axios from "axios";
import { ApiClient, PostAPIError } from "../models/ApiClient";
import { PostModel } from "../models/PostModel";
import { POSTS, POST_DETAIL } from "../properties";
import { Repository } from "./Repository";

interface PostInterface {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export class PostRepository implements Repository<PostModel> {
  private apiClient: ApiClient;

  constructor(apiClient: any) {
    this.apiClient = apiClient;
  }

  async getById(id: number): Promise<PostModel> {
    // const response = await axios({
    //   method: "GET",
    //   url: `${HOST}/${POST_DETAIL.replace(":postId", id.toString())}`,
    // });

    // const data = (await response.data.json()) as PostModel;
    // return data;

    const post = await this.apiClient.getById<PostInterface>(
      POST_DETAIL.replace(":postId", id.toString())
    );

    // console.log(
    //   "repo Post: ",
    //   new PostModel(
    //     post.getId(),
    //     post.getUserId(),
    //     post.getTitle(),
    //     post.getBody()
    //   )
    // );

    // return post as PostModel;
    return new PostModel(post.id, post.userId, post.title, post.body);
  }

  async getAll(): Promise<PostModel[]> {
    const data = await this.apiClient.getById<PostInterface[]>(POSTS);

    const posts = data.map(
      (post: PostInterface): PostModel =>
        new PostModel(post.id, post.userId, post.title, post.body)
    );

    return posts;
  }

  async create<PostModel, NewPost>(post: NewPost): Promise<PostModel | Error> {
    const response = await this.apiClient.post<PostModel, NewPost>(POSTS, post);

    return response;
  }

  //   public async update(post: PostModel): void {}

  //   public async delete(id: number): void {}
}
