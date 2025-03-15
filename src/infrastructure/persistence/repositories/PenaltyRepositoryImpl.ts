import { PrismaClient } from "@prisma/client";
import { Penalty } from "../../../domain/aggregates/Penalty/Penalty";
import { PenaltyRepository } from "../../../domain/repositories/IPenalty.repository";
import { PenaltyMapper } from "../mappers/PenaltyMapper";

export class PenaltyRepositoryImpl implements PenaltyRepository {
	constructor(private prisma: PrismaClient) {}

	async save(penalty: Penalty): Promise<void> {
		const data = PenaltyMapper.toPersistence(penalty);
		await this.prisma.penalty.upsert({
			where: { id: data.id },
			create: data,
			update: data,
		});
	}
	async findActivePenalties(memberCode: string): Promise<Penalty[]> {
		const now = new Date();
		const penalties = await this.prisma.penalty.findMany({
			where: {
				memberCode,
				startDate: { lte: now },
				endDate: { gte: now },
			},
		});
		return penalties.map((penalty) => PenaltyMapper.toDomain(penalty));
	}
}
