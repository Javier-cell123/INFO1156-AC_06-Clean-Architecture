export class Post {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly imageUrl: string,
    public readonly createdAt: Date
  ) {}
}