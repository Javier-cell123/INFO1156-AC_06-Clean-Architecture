// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaCategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string) {
    const created = await this.prisma.category.create({ 
      data: { 
        name: name, 
        slug: name.toLowerCase().replace(/\s+/g, '-') 
      } 
    });
    return { id: created.id, name: created.name, slug: created.slug };
  }

  async findAll() {
    const list = await this.prisma.category.findMany();
    return list.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));
  }

  async findById(id: string) {
    const c = await this.prisma.category.findUnique({ where: { id } });
    if (!c) return null;
    return { id: c.id, name: c.name, slug: c.slug };
  }
}