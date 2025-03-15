src/
├── domain/
│   ├── aggregates/
│   │   ├── Member/
│   │   │   ├── Member.ts                  # Aggregate root
│   │   │   ├── Penalty.ts                 # Entity
│   │   │   ├── Borrowing.ts               # Value object
│   │   │   └── value-objects/
│   │   │       └── MemberCode.ts
│   │   ├── Book/
│   │   │   ├── Book.ts
│   │   │   ├── BookStatus.ts              # Enum
│   │   │   └── value-objects/
│   │   │       └── BookStock.ts
│   │   └── Borrowing/
│   │       ├── Borrowing.ts
│   │       └── BorrowingStatus.ts         # Enum
│   ├── events/
│   │   ├── BookBorrowed.event.ts
│   │   ├── BookReturned.event.ts
│   │   └── MemberPenalized.event.ts
│   ├── repositories/
│   │   ├── MemberRepository.ts            # Interface
│   │   ├── BookRepository.ts
│   │   ├── BorrowingRepository.ts
│   │   └── PenaltyRepository.ts
│   └── services/
│       └── BorrowService.ts               # Domain service
├── application/
│   ├── use-cases/
│   │   ├── BorrowBook/
│   │   │   ├── BorrowBook.input.ts        # Zod schema
│   │   │   └── BorrowBook.use-case.ts
│   │   ├── ReturnBook/
│   │   │   ├── ReturnBook.input.ts
│   │   │   └── ReturnBook.use-case.ts
│   │   └── ...                           # Other use cases
│   └── exceptions/
│       └── DomainExceptions.ts            # Custom errors
├── infrastructure/
│   ├── persistence/
│   │   ├── prisma/
│   │   │   ├── schema.prisma             # Prisma schema
│   │   │   └── migrations/
│   │   ├── repositories/
│   │   │   ├── MemberRepositoryImpl.ts   # Prisma implementation
│   │   │   ├── BookRepositoryImpl.ts
│   │   │   └── ...
│   │   └── mappers/
│   │       ├── MemberMapper.ts           # Domain <-> DB model converter
│   │       ├── BookMapper.ts
│   │       └── ...
│   ├── event-bus/
│   │   ├── SimpleEventBus.ts             # Event bus implementation
│   │   └── handlers/
│   │       ├── PenaltyHandler.ts
│   │       ├── AuditHandler.ts
│   │       └── ...
│   └── config/
│       ├── database.ts                   # Prisma client
│       └── env.ts                        # Environment variables
└── interfaces/
    ├── rest/
    │   ├── controllers/
    │   │   ├── BookController.ts
    │   │   ├── MemberController.ts
    │   │   └── ...
    │   ├── routes/
    │   │   ├── bookRoutes.ts
    │   │   ├── memberRoutes.ts
    │   │   └── ...
    │   ├── middleware/
    │   │   ├── validationMiddleware.ts   # Zod validation
    │   │   └── errorMiddleware.ts
    │   └── dto/
    │       ├── BookResponse.dto.ts       # Response schema
    │       └── ...
    └── server.ts                         # Express setup


Folder yang umumnya wajib ada:
    Domain (berisi inti bisnis)
    Infrastructure (berisi implementasi teknis)

Folder yang cukup penting tapi bisa disesuaikan:
    Application (orchestrator antara domain dan presentation)
    Presentation (interface untuk pengguna)

Arah Komunikasi:
    Request masuk melalui Presentation Layer
    Presentation memanggil Application Layer
    Application Layer menggunakan Domain Layer (entities, services)
    Domain Layer mengakses data melalui Repository Interface
    Infrastructure Layer mengimplementasikan Repository Interface
    Response dikembalikan melalui jalur yang sama secara terbalik

Prinsip kunci: Layer dalam (Domain) tidak boleh bergantung pada layer luar. Domain tidak tahu tentang Infrastructure atau Presentation.