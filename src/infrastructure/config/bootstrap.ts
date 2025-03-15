import { PrismaClient } from "@prisma/client";
import { BookRepositoryImpl } from "../persistence/repositories/BookRepositoryImpl";
import { MemberRepositoryImpl } from "../persistence/repositories/MemberRepositoryImpl";
import { CreateBookUseCase } from "../../application/use-cases/CreateBook/CreateBook.use-case";
import { CreateMemberUseCase } from "../../application/use-cases/CreateMember/CreateMember.use-case";
import { BookController } from "../../interface/controllers/BookController";
import { MemberController } from "../../interface/controllers/MemberController";
import { BorrowingRepositoryImpl } from "../persistence/repositories/BorrowingRepositoryImpl";
import { ListBooksUseCase } from "../../application/use-cases/ListBook/ListBooks.use-case";
import { BorrowBookUseCase } from "../../application/use-cases/BorrowBook/BorrowBook.use-case";
import { ListMemberUseCase } from "../../application/use-cases/ListMember/ListMember.use-cast";
import { ReturnBookUseCase } from "../../application/use-cases/ReturnBook/ReturnBook.use-case";

const prisma = new PrismaClient();

//intialize repositories
const bookRepo = new BookRepositoryImpl(prisma);
const memberRepo = new MemberRepositoryImpl(prisma);
const borrowingRepo = new BorrowingRepositoryImpl(prisma);

//intialize use-case
const createBookUseCase = new CreateBookUseCase(bookRepo);
const createMemberUseCase = new CreateMemberUseCase(memberRepo);
const listBooksUseCase = new ListBooksUseCase(bookRepo,borrowingRepo);
const borrowBookUseCase = new BorrowBookUseCase(bookRepo, memberRepo, borrowingRepo);
const listMemberUseCase = new ListMemberUseCase(memberRepo, borrowingRepo);
const returnBookUseCase = new ReturnBookUseCase(borrowingRepo, bookRepo);


export const bookController = new BookController(createBookUseCase,listBooksUseCase, borrowBookUseCase, returnBookUseCase);
export const memberController = new MemberController(createMemberUseCase, listMemberUseCase);
