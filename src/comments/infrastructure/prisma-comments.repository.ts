// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaCommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(content: string, postId: string) {
    const created = await this.prisma.comment.create({
      data: { content: content, postId: postId },
    });
    return created;
  }
}