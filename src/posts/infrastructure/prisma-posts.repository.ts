import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../shared/prisma.service"
import { PostsRepository } from "../domain/posts.repository"
import { Post } from "../domain/post.entity"

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: {
        title: string
        content: string
        authorId: string
    }): Promise<Post> {
        const p = await this.prisma.post.create({ data })
        return new Post(
            p.id,
            p.title,
            p.content,
            p.authorId,
            p.createdAt,
            p.updatedAt,
        )
    }

    async findById(id: string): Promise<Post | null> {
        const p = await this.prisma.post.findUnique({ where: { id } })
        if (!p) return null
        return new Post(
            p.id,
            p.title,
            p.content,
            p.authorId,
            p.createdAt,
            p.updatedAt,
        )
    }

    async findAll(): Promise<Post[]> {
        const list = await this.prisma.post.findMany()
        return list.map(
            (p) =>
                new Post(
                    p.id,
                    p.title,
                    p.content,
                    p.authorId,
                    p.createdAt,
                    p.updatedAt,
                ),
        )
    }
}
