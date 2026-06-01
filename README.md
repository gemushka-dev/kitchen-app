# Kitchen App (Recipe API)

A beautiful, fast, and fully-featured application for managing recipes, ingredients, and users. Built with a modern tech stack focused on maximum performance and strict type safety.

## Features

- **Auth:** User registration and secure authentication.
- **Responsive UI:** Fully optimized for mobile, tablet, and desktop.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM & Drizzle Kit
- **Package Manager:** pnpm

## Setup Instructions

1.Create a `env` file and add database info:

```env
DATABASE_URL=postgres://username:password@localhost:port/database
JWT_SECRET=your_secret_key
```

2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development app:
   ```bash
   pnpm dev
   ```
