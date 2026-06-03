export class ModerationReport {
    constructor(
        public readonly id: string,
        public readonly targetId: string, // ID del Post o Comentario reportado
        public readonly reason: string,
        public readonly status: "PENDING" | "APPROVED" | "REJECTED",
        public readonly createdAt: Date,
    ) {}
}
