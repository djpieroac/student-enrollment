# Backend Boilerplate

A robust Node.js backend boilerplate with TypeScript, Express, Prisma, and JWT authentication.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express 5.1.0
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Container**: Docker for MySQL
- **Code Quality**: 
  - Biome for formatting and linting
  - TypeScript strict mode
- **Development**: 
  - ts-node-dev for hot reloading
  - Environment variables support

## Features

- 🔐 JWT Authentication with access and refresh tokens
- 🗄️ MySQL database with Prisma ORM
- 🐳 Docker configuration for MySQL
- 🔍 Type safety with TypeScript
- ⚡ Hot reloading for development
- 🚦 Error handling middleware
- 🔒 Cookie-based token storage
- 👥 User management system
- 🔄 Route protection middleware

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- MySQL (or Docker for MySQL)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd boilerplate_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   ```env
   PORT=4001
   APP_FRONTEND_URL=http://localhost:3000
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_SECRET_REFRESH=your_jwt_refresh_secret_key_here
   
   # MySQL Configuration
   MYSQL_ROOT_PASSWORD=root
   MYSQL_DATABASE=boilerplate_db
   MYSQL_USER=admin
   MYSQL_PASSWORD=admin123
   MYSQL_PORT=3306
   ```

5. Start MySQL with Docker:
   ```bash
   npm run docker:up
   ```

6. Run database migrations:
   ```bash
   npm run migrate
   ```

7. Generate Prisma Client:
   ```bash
   npm run generate
   ```

8. Seed the database:
   ```bash
   npm run seed
   ```

9. Start the development server:
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:4001`.

## Project Structure

\`\`\`
src/
├── auth/                 # Authentication module
│   ├── auth.routes.ts
│   ├── auth.controller.ts
│   ├── auth.usecase.ts
│   └── auth.credential.ts
├── users/               # User management module
│   ├── user.routes.ts
│   ├── user.controller.ts
│   └── user.usecase.ts
├── shared/             # Shared utilities
│   ├── shared.constants.ts
│   └── shared.http.error.ts
├── middlewares/        # Express middlewares
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── lib/               # Library code
│   ├── prisma.ts
│   └── password.ts
└── index.ts           # Application entry point
\`\`\`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Testing API Endpoints

The project includes HTTP files for testing endpoints using the VSCode REST Client extension:

- `auth.http` - Authentication endpoints
- `users.http` - User management endpoints

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- Protected routes with middleware
- Role-based authorization
- Input validation
- Error handling middleware

## Development Commands

```bash
# Docker Commands
npm run docker:up      # Start Docker containers
npm run docker:down    # Stop Docker containers
npm run docker:logs    # View Docker logs

# Database Commands
npm run migrate        # Run database migrations
npm run generate      # Generate Prisma Client
npm run db:push       # Push schema changes to database
npm run studio        # Open Prisma Studio
npm run reset         # Reset database
npm run seed          # Seed the database

# Development
npm run dev           # Start development server with hot reload
npm run dev:start     # Start development server without generating client

# Code Quality
npm run tsc          # Type checking
npm run format       # Format code with Biome
npm run lint         # Lint code with Biome
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License