import { PostsRepository } from "../domain/posts.repository"
import { Post } from "../domain/post.entity"

export class CreatePostUseCase {
    constructor(private readonly postsRepository: PostsRepository) {}

    async execute(
        title: string,
        content: string,
        authorId: string,
    ): Promise<Post> {
        if (!title || title.trim().length === 0) {
            throw new Error("El título no puede estar vacío")
        }
        return this.postsRepository.create({ title, content, authorId })
    }
}
