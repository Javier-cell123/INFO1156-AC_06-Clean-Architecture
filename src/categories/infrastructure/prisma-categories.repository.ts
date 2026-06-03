import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../shared/prisma.service"
import { CategoriesRepository } from "../domain/categories.repository"
import { Category } from "../domain/category.entity"

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(name: string): Promise<Category> {
        const created = await this.prisma.category.create({ data: { name } })
        return new Category(created.id, created.name, created.createdAt)
    }

    async findAll(): Promise<Category[]> {
        const list = await this.prisma.category.findMany()
        return list.map((c) => new Category(c.id, c.name, c.createdAt))
    }

    async findById(id: string): Promise<Category | null> {
        const category = await this.prisma.category.findUnique({
            where: { id },
        })
        if (!category) return null
        return new Category(category.id, category.name, category.createdAt)
    }
}
