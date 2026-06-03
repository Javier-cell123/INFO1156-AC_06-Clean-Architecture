import { CategoriesRepository } from "../domain/categories.repository"
import { Category } from "../domain/category.entity"

export class CreateCategoryUseCase {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async execute(name: string): Promise<Category> {
        if (!name || name.trim().length === 0) {
            throw new Error("El nombre de la categoría no puede estar vacío")
        }
        return this.categoriesRepository.create(name)
    }
}
