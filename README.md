# Student Enrollment System

A modern student enrollment system built with Node.js and TypeScript, providing secure authentication and efficient student management.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express 5.1.0
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Container**: Docker for MySQL

## Features

- 🎓 Complete student enrollment management
- 🔐 Secure JWT Authentication
- 🗄️ MySQL database with Prisma ORM
- 🐳 Docker configuration for easy setup
- 🔒 Cookie-based secure sessions
- 👥 User and student management
- ⚡ Fast and efficient API responses

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

### Environment Setup

Configure your environment variables in `.env`:
```env
PORT=4001
APP_FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_SECRET_REFRESH=your_jwt_refresh_secret_key_here

# MySQL Configuration
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=enrollment_db
MYSQL_USER=admin
MYSQL_PASSWORD=admin123
MYSQL_PORT=3306
```

### Quick Start Commands

1. Start MySQL container:
```bash
npm run docker:up
```

2. Setup database:
```bash
npm run migrate   # Run migrations
npm run generate # Generate Prisma Client
npm run seed     # Seed initial data
```

3. Start development server:
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