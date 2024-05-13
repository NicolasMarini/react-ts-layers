export class PostModel {
  private id: number;
  private userId: number;
  private title: string;
  private body: string;

  constructor(id: number, userId: number, title: string, body: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  //   create(item: NewPost): NewPost {
  //     return { userId: item.userId, title: item.title, body: item.body };
  //   }

  public getId(): number {
    return this.id;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getTitle(): string {
    return this.title;
  }

  public getBody(): string {
    return this.body;
  }

  getInfo() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      body: this.body,
    };
  }
}
