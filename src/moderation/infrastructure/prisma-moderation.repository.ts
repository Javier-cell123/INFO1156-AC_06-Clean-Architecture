import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../shared/prisma.service"
import { ModerationRepository } from "../domain/moderation.repository"
import { ModerationReport } from "../domain/moderation.entity"

@Injectable()
export class PrismaModerationRepository implements ModerationRepository {
    constructor(private readonly prisma: PrismaService) {}

    async report(targetId: string, reason: string): Promise<ModerationReport> {
        const created = await this.prisma.report.create({
            data: { targetId, reason, status: "PENDING" },
        })
        return new ModerationReport(
            created.id,
            created.targetId,
            created.reason,
            created.status as any,
            created.createdAt,
        )
    }

    async updateStatus(
        id: string,
        status: "APPROVED" | "REJECTED",
    ): Promise<ModerationReport> {
        const updated = await this.prisma.report.update({
            where: { id },
            data: { status },
        })
        return new ModerationReport(
            updated.id,
            updated.targetId,
            updated.reason,
            updated.status as any,
            updated.createdAt,
        )
    }

    async getPending(): Promise<ModerationReport[]> {
        const list = await this.prisma.report.findMany({
            where: { status: "PENDING" },
        })
        return list.map(
            (r) =>
                new ModerationReport(
                    r.id,
                    r.targetId,
                    r.reason,
                    r.status as any,
                    r.createdAt,
                ),
        )
    }
}
