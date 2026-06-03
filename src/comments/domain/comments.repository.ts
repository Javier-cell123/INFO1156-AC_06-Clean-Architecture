import { Comment } from "./comment.entity"

export interface CommentsRepository {
    create(content: string, postId: string, authorId: string): Promise<Comment>
    findByPostId(postId: string): Promise<Comment[]>
}
