import { NewPost } from "../hooks/usePost";
import { PostModel } from "../models/PostModel";
import { PostRepository } from "../repositories/PostRepository";
import { Service } from "./Service";

export class PostService implements Service<PostModel> {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  getById = (id: number): Promise<PostModel> => {
    return this.postRepository.getById(id);
  };

  getAll = (): Promise<PostModel[]> => {
    return this.postRepository.getAll();
  };

  // public async create<PostModel, NewPost>(
  //   post: NewPost
  // ): Promise<PostModel | Error> {
  //   const response = await this.postRepository.create<PostModel, NewPost>(post);

  //   return response;
  // }

  create = async <PostModel, NewPost>(
    post: NewPost
  ): Promise<PostModel | Error> => {
    const response = await this.postRepository.create<PostModel, NewPost>(post);
    return response;
  };

  //   public async update(post: PostModel): Promise<void> {
  //     return this.postRepository.update(post);
  //   }

  //   public async delete(id: number): Promise<void> {
  //     return this.postRepository.delete(id);
  //   }
}
