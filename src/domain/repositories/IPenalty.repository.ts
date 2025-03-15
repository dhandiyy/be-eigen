import { Penalty } from "../aggregates/Penalty/Penalty";

export interface PenaltyRepository {
	save(penalty: Penalty): Promise<void>;
	findActivePenalties(memberCode: string): Promise<Penalty[]>;
}
