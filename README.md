# Library Management System

A Domain-Driven Design (DDD) implementation for a library system with books, members, and borrowing rules.

## Features
- 🧑💻 **Member Management**: 
  - Create members
  - Track active/banned status
  - Limit: 2 books per member
- 📚 **Book Management**:
  - Create books with stock tracking
  - Available/Borrowed/Lost statuses
- 🔄 **Borrowing System**:
  - Borrow/return books with validation
  - 7-day return policy
  - **Penalty**: 3-day ban for late returns >7 days
- 📊 **Reports**:
  - List all books with available stock
  - List members with borrowed counts

## Tech Stack
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma
- **Validation**: Zod
- **Architecture**: DDD + Clean Architecture
- **Documentation**: Swagger

## Setup
1. **Clone repo**:
  ```bash
  git clone https://github.com/dhandiyy/be-eigen.git
  cd be-eigen
  ```
2. **Install dependencies**:
  ```bash
  npm install
  ```
3. **Database setup**:
  ```bash
  cp .env.example .env
  # Update .env with your database credentials
  npx prisma migrate dev
  ```
4. **Start server**:
  ```bash
  npm run dev
  ```

## API Documentation
This project uses Swagger for API documentation. You can explore and test the API endpoints interactively.

### Accessing Swagger UI
When the server is running, visit:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Available Endpoints
#### Books
- **POST** `/api/books` - Create a new book
- **GET** `/api/books` - List all books with availability status

#### Members
- **POST** `/api/members` - Create a new member
- **GET** `/api/members` - List all members with borrowed book counts

#### Borrowing
- **POST** `/api/book/borrow` - Borrow a book by providing book and member codes
- **POST** `/api/book/return` - Return a borrowed book
