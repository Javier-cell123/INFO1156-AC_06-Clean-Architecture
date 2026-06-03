import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../shared/prisma.service"
import { LikesRepository } from "../domain/likes.repository"
import { Like } from "../domain/like.entity"

@Injectable()
export class PrismaLikesRepository implements LikesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async add(postId: string, userId: string): Promise<Like> {
        const created = await this.prisma.like.create({
            data: { postId, userId },
        })
        return new Like(
            created.id,
            created.postId,
            created.userId,
            created.createdAt,
        )
    }

    async remove(postId: string, userId: string): Promise<boolean> {
        const deleted = await this.prisma.like.deleteMany({
            where: { postId, userId },
        })
        return deleted.count > 0
    }

    async countByPostId(postId: string): Promise<number> {
        return this.prisma.like.count({ where: { postId } })
    }
}
