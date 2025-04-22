# Micro-Blog Backend

A robust backend API for a micro-blogging platform built with Express.js, TypeScript, and Supabase. This project provides a complete set of RESTful endpoints for user authentication, post management, comments, file uploads, and AI-generated content.

## Features

- 🔐 **Authentication** - Secure user signup and login with JWT
- 📝 **Posts Management** - Create, read, update, and delete posts
- 💬 **Comments** - Add and retrieve comments on posts
- 👍 **Likes** - Like and unlike posts
- 🖼️ **File Uploads** - Upload and manage media files for posts
- 🤖 **AI Integration** - Generate post content using Groq AI
- 🛡️ **Security** - Rate limiting, CORS, and Helmet for protection
- 🔍 **Validation** - Request validation using VineJS
- 🚦 **Error Handling** - Comprehensive error handling system

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js/Bun
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + Supabase Auth
- **Validation**: VineJS
- **File Storage**: Supabase Storage
- **AI**: Groq SDK
- **Security**: Helmet, Express Rate Limit
- **Logging**: Morgan
- **Containerization**: Docker

## Prerequisites

- Node.js (v16+) or Bun runtime
- Supabase account
- Groq API key (for AI features)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=4500
HOST=http://localhost
ENVIRONMENT=development
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GROQ_API_KEY=your_groq_api_key
SALT=your_password_salt
```

You can use the utility script to generate a secure JWT secret:

```bash
bun src/utils/secretKeyGen.js
```

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/micro-blog-backend.git
cd micro-blog-backend

# Install dependencies
npm install
# or with Bun
bun install
```

## Running the Application

```bash
# Development mode with hot reload
npm run dev
# or with Bun
bun dev

# Production mode
npm start
# or with Bun
bun start

# Docker development
npm run docker:dev
```

## API Endpoints

### Base URL

```
http://localhost:4500/api/v1
```

### Authentication

| Method | Endpoint       | Description                | Auth Required |
|--------|---------------|----------------------------|---------------|
| POST   | /auth/signup   | Register a new user        | No           |
| POST   | /auth/login    | Login a user               | No           |

### Posts

| Method | Endpoint       | Description                | Auth Required |
|--------|---------------|----------------------------|---------------|
| GET    | /posts         | Get all posts              | Yes          |
| GET    | /posts/:id     | Get a specific post        | Yes          |
| POST   | /posts         | Create a new post          | Yes          |
| PATCH  | /posts/:id     | Update a post              | Yes          |
| DELETE | /posts/:id     | Delete a post              | Yes          |
| POST   | /posts/:id/like | Like a post               | Yes          |
| DELETE | /posts/:id/like | Unlike a post             | Yes          |
| POST   | /posts/assets  | Upload media for a post    | Yes          |

### Comments

| Method | Endpoint       | Description                | Auth Required |
|--------|---------------|----------------------------|---------------|
| GET    | /comments/:id  | Get comments for a post    | Yes          |
| POST   | /comments/:id  | Add a comment to a post    | Yes          |

### AI Features

| Method | Endpoint       | Description                | Auth Required |
|--------|---------------|----------------------------|---------------|
| GET    | /ai/generate-post | Generate post content using AI | No    |

### Utility Endpoints

| Method | Endpoint       | Description                | Auth Required |
|--------|---------------|----------------------------|---------------|
| GET    | /              | Server status              | No           |
| GET    | /health-check  | Server health check        | No           |
| GET    | /gen-error     | Test error handling        | No           |

## Request & Response Examples

### Authentication

#### Signup

```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "Password123!",
  "password_confirmation": "Password123!"
}
```

Response:

```json
{
  "success": true,
  "status": 200,
  "message": "A verification email has been sent to your email address. Please check your inbox for further instructions.",
  "data": {
    "token": "jwt_token_here"
  }
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "Password123!"
}
```

Response:

```json
{
  "success": true,
  "status": 200,
  "messages": "You have successfully logged in.",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    }
  }
}
```

### Posts

#### Create Post

```http
POST /api/v1/posts
Content-Type: application/json
Authorization: Bearer jwt_token_here

{
  "content": "This is my first post!"
}
```

Response:

```json
{
  "success": true,
  "status": 201,
  "message": "Post created successfully."
}
```

#### Get All Posts

```http
GET /api/v1/posts
Authorization: Bearer jwt_token_here
```

Response:

```json
{
  "success": true,
  "status": 200,
  "data": [
    {
      "id": "post_id",
      "content": "This is my first post!",
      "created_at": "2023-06-01T12:00:00Z",
      "likes": []
    }
  ]
}
```

### File Upload

```http
POST /api/v1/posts/assets
Content-Type: multipart/form-data
Authorization: Bearer jwt_token_here

file: [binary data]
```

Response:

```json
{
  "message": "File uploaded successfully.",
  "data": {
    "path": "images/1623456789-a1b2c3d4.jpg"
  }
}
```

## Error Handling

The API uses a standardized error response format:

```json
{
  "success": false,
  "status": 400,
  "message": "Error message here"
}
```

In development mode, the response will also include a stack trace.

## Security

- **Authentication**: JWT-based authentication via Supabase Auth
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configured to allow specific origins
- **Helmet**: HTTP headers secured with Helmet middleware
- **Input Validation**: All requests validated with VineJS

## Docker Support

The project includes Docker configuration for easy deployment:

```bash
# Build the Docker image
docker build -t micro-blog-backend .

# Run with Docker Compose
docker-compose up
```

## Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format

# Fix linting issues (force)
npm run fix-force
```

## License

MIT

## Author

Mohasin K.R