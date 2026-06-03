import { LikesRepository } from "../domain/likes.repository"

export class ToggleLikeUseCase {
    constructor(private readonly likesRepository: LikesRepository) {}

    async execute(postId: string, userId: string): Promise<{ liked: boolean }> {
        try {
            await this.likesRepository.add(postId, userId)
            return { liked: true }
        } catch {
            // Si ya existía el registro, lo removemos (comportamiento tipo Toggle)
            await this.likesRepository.remove(postId, userId)
            return { liked: false }
        }
    }
}
