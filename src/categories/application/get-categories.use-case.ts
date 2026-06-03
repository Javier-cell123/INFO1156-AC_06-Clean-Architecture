import { CategoriesRepository } from "../domain/categories.repository"
import { Category } from "../domain/category.entity"

export class GetCategoriesUseCase {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async execute(): Promise<Category[]> {
        return this.categoriesRepository.findAll()
    }
}
