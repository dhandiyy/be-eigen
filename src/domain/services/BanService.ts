import { Ban } from "../entities/Ban";
import { Member } from "../entities/Member";
import { IBanRepository } from "../repositories/IBanRepository";

export class BanService {
	constructor(private banRepository: IBanRepository) {}

	async applyBanToMember(member: Member, bookCode: string): Promise<Ban> {
		const startDate = new Date();
		const endDate = new Date();
        endDate.setDate(startDate.getDate() + 3);

        const ban = Ban.create(
            member.code,
            bookCode,
            startDate,
            endDate
        );

        await this.banRepository.save(ban);
        return ban;
	}
}
