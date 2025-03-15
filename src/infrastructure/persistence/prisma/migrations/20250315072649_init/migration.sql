-- CreateTable
CREATE TABLE "Penalty" (
    "id" TEXT NOT NULL,
    "memberCode" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "Member"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
