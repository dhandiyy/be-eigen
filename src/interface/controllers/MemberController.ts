import { Request, Response } from "express";
import { CreateMemberUseCase } from "../../application/use-cases/CreateMember/CreateMember.use-case";
import { z } from "zod";
import { ListMemberUseCase } from "../../application/use-cases/ListMember/ListMember.use-cast";

export class MemberController {
	constructor(
        private createMemberUseCase: CreateMemberUseCase,
        private listMemberUseCase: ListMemberUseCase
    ) {}

	async create(req: Request, res: Response) {
		const schema = z.object({
			name: z.string().min(2),
		});

		try {
			const input = schema.parse(req.body);
			const member = await this.createMemberUseCase.execute(input);

			res.status(201).json({
				code: member.code,
				name: member.name,
			});
		} catch (error) {
			res.status(400).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async list(_req: Request, res: Response) {
		try {
			const members = await this.listMemberUseCase.execute();
			res.json(members);
		} catch (error) {
			res.status(500).json({
                error: error instanceof Error ? error.message : String(error),
            });
		}
	}
}
