import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../shared/prisma.service"
import { CommentsRepository } from "../domain/comments.repository"
import { Comment } from "../domain/comment.entity"

@Injectable()
export class PrismaCommentsRepository implements CommentsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(
        content: string,
        postId: string,
        authorId: string,
    ): Promise<Comment> {
        const created = await this.prisma.comment.create({
            data: { content, postId, authorId },
        })
        return new Comment(
            created.id,
            created.content,
            created.postId,
            created.authorId,
            created.createdAt,
        )
    }

    async findByPostId(postId: string): Promise<Comment[]> {
        const list = await this.prisma.comment.findMany({ where: { postId } })
        return list.map(
            (c) =>
                new Comment(c.id, c.content, c.postId, c.authorId, c.createdAt),
        )
    }
}
