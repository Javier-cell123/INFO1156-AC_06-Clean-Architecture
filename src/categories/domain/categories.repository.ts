import { Category } from "./category.entity"

export interface CategoriesRepository {
    create(name: string): Promise<Category>
    findAll(): Promise<Category[]>
    findById(id: string): Promise<Category | null>
}
