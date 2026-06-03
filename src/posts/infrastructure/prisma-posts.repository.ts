// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaPostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const p = await this.prisma.post.create({
      data: {
        title: data.title,
        description: data.content || 'Sin descripción',
        imageUrl: 'default.png',
      },
    });
    return { id: p.id, title: p.title, description: p.description, imageUrl: p.imageUrl };
  }

  async findAll() {
    const list = await this.prisma.post.findMany();
    return list.map(p => ({ id: p.id, title: p.title, description: p.description, imageUrl: p.imageUrl }));
  }

  async findById(id: string) {
    const p = await this.prisma.post.findUnique({ where: { id } });
    if (!p) return null;
    return { id: p.id, title: p.title, description: p.description, imageUrl: p.imageUrl };
  }
}