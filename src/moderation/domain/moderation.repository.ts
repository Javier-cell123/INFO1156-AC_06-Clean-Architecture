import { ModerationReport } from "./moderation.entity"

export interface ModerationRepository {
    report(targetId: string, reason: string): Promise<ModerationReport>
    updateStatus(
        id: string,
        status: "APPROVED" | "REJECTED",
    ): Promise<ModerationReport>
    getPending(): Promise<ModerationReport[]>
}
