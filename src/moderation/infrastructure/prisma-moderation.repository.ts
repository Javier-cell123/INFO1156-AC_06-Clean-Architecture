// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaModerationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async reportContent(data: any) {
    return await this.prisma.postReport.create({
      data: { reason: data.reason, postId: data.postId },
    });
  }
}