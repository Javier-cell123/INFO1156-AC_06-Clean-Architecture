import { CommentsRepository } from "../domain/comments.repository"
import { Comment } from "../domain/comment.entity"

export class CreateCommentUseCase {
    constructor(private readonly commentsRepository: CommentsRepository) {}

    async execute(
        content: string,
        postId: string,
        authorId: string,
    ): Promise<Comment> {
        if (!content || content.trim().length === 0) {
            throw new Error("El comentario no puede estar vacío")
        }
        return this.commentsRepository.create(content, postId, authorId)
    }
}
