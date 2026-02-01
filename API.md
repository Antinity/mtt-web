# API Reference

## Authentication
All protected routes require an `Authorization` header with a Bearer token.
**Header:** `Authorization: Bearer <token>`

## Endpoints

### Auth
- **POST** `/api/auth/login`
  - **Body**: `{ "username": "string", "password": "password" }`
  - **Returns**: `{ "token": "string", "user": UserSchema }`
- **POST** `/api/auth/register`
  - **Body**: `{ "username": "string", "password": "password", "email": "string" }`
  - **Returns**: `{ "success": boolean }`

### Users
- **GET** `/api/users/@me` (Protected)
  - **Returns**: `UserSchema`
- **PATCH** `/api/users/@me` (Protected)
  - **Body**: `{ "displayName"?: "string", "bio"?: "string", "avatar"?: "string" }`
  - **Returns**: `UserSchema`

### Tournaments
- **GET** `/api/tournaments`
  - **Returns**: `TournamentSchema[]`
- **GET** `/api/tournaments/:id`
  - **Returns**: `TournamentSchema`
- **POST** `/api/tournaments` (Protected/Admin)
  - **Body**: `{ "name": "string", "description": "string", "startDate": "ISO8601", "maxPlayers": number }`
  - **Returns**: `TournamentSchema`

### Teams
- **GET** `/api/teams/:id`
  - **Returns**: `TeamSchema`
- **POST** `/api/teams` (Protected)
  - **Body**: `{ "name": "string", "members": string[] }`
  - **Returns**: `TeamSchema`

## Schemas

### UserSchema
```json
{
  "id": "string (UUID)",
  "username": "string",
  "displayName": "string",
  "email": "string",
  "avatar": "string|null",
  "role": "USER | ADMIN",
  "createdAt": "string (ISO8601)"
}
```

### TournamentSchema
```JSON
{
  "id": "string (UUID)",
  "name": "string",
  "description": "string",
  "status": "OPEN | ONGOING | FINISHED",
  "startDate": "string (ISO8601)",
  "maxPlayers": "number",
  "registeredPlayers": "number"
}
```

### TeamSchema
```JSON
{
  "id": "string (UUID)",
  "name": "string",
  "ownerId": "string (UUID)",
  "members": "UserSchema[]",
  "createdAt": "string (ISO8601)"
}
```
