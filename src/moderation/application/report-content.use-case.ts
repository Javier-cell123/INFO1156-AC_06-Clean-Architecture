import { ModerationRepository } from "../domain/moderation.repository"
import { ModerationReport } from "../domain/moderation.entity"

export class ReportContentUseCase {
    constructor(private readonly moderationRepository: ModerationRepository) {}

    async execute(targetId: string, reason: string): Promise<ModerationReport> {
        if (!reason || reason.trim().length < 5) {
            throw new Error(
                "La razón del reporte debe tener al menos 5 caracteres",
            )
        }
        return this.moderationRepository.report(targetId, reason)
    }
}
