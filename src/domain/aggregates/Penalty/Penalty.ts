import { v4 as uuidv4 } from "uuid";

export class Penalty {
    constructor(
        public readonly id: string,
        public readonly memberCode: string,
        public readonly startDate: Date,
        public readonly endDate: Date
    ) {}

    static create(memberCode: string): Penalty {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        return new Penalty(uuidv4(), memberCode, startDate, endDate);
    }

    isActive(): boolean {
        const now = new Date();
        return now >= this.startDate && now <= this.endDate;
    }
}