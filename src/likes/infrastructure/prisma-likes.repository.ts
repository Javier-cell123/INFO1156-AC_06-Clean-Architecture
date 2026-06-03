// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaLikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(postId: string) {
    const created = await this.prisma.like.create({
      data: { postId: postId, reactionType: 'LIKE', weight: 1 },
    });
    return created;
  }
}