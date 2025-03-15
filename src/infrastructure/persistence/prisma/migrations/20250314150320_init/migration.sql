-- CreateEnum
CREATE TYPE "BorrowingStatus" AS ENUM ('BORROWED', 'RETURNED', 'RETURNED_LATE', 'LOST');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('ACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('AVAILABLE', 'BORROWED', 'LOST');

-- CreateTable
CREATE TABLE "Member" (
    "code" TEXT NOT NULL DEFAULT 'M01',
    "name" TEXT NOT NULL,
    "status" "MemberStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Member_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Book" (
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "status" "BookStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Book_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Borrowing" (
    "id" TEXT NOT NULL,
    "memberCode" TEXT NOT NULL,
    "bookCode" TEXT NOT NULL,
    "borrowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),
    "status" "BorrowingStatus" NOT NULL DEFAULT 'BORROWED',

    CONSTRAINT "Borrowing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "Member"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "Book"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
