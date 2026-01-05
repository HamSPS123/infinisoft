# Authentication System with Token Refresh

This document explains the authentication system implementation for the InfiniSoft client application, including the token refresh mechanism.

## Overview

The authentication system uses:
- JWT tokens for authentication
- Refresh tokens for maintaining sessions
- Axios interceptors for handling token expiration
- Environment variables for configuration

## Key Components

### 1. Auth Store (`src/stores/authStore.ts`)
- Uses Zustand for state management
- Persists authentication state in localStorage
- Handles login, logout, and token refresh operations
- Exposes authentication state and methods

### 2. Auth Types (`src/stores/authTypes.ts`)
- Defines TypeScript interfaces for authentication data
- Includes Zod schema for validation

### 3. Axios Configuration (`src/config/axios.ts`)
- Sets up a configured Axios instance
- Implements request interceptors to add authentication headers
- Implements response interceptors to handle token expiration
- Automatically refreshes tokens when they expire

### 4. Environment Configuration (`src/config/env.ts`)
- Manages environment variables
- Provides defaults for API URLs and token expiry times

### 5. Auth Hook (`src/hooks/useAuth.ts`)
- Provides a React hook for components to access auth functionality
- Handles form validation using Zod
- Exposes user state and authentication methods

## Token Refresh Flow

1. When a request returns a 401 Unauthorized error:
   - The response interceptor catches the error
   - It checks if the error is due to an expired token

2. If the token is expired:
   - The interceptor calls the refresh token endpoint
   - It sends the refresh token in the Authorization header

3. If refresh is successful:
   - The new access token (and optionally new refresh token) is stored
   - The original failed request is retried with the new token

4. If refresh fails:
   - The user is logged out
   - They are redirected to the login page

## API Endpoints

- **Login**: `POST /auth/login`
  - Request: `{ email: string, password: string }`
  - Response: `{ token: string, refreshToken: string, user: User }`

- **Refresh Token**: `POST /auth/refresh`
  - Headers: `Authorization: Bearer <refresh_token>`
  - Response: `{ token: string, refreshToken?: string }`

- **Logout**: `POST /auth/logout`
  - Headers: `Authorization: Bearer <token>`

## Environment Variables

Configure these in the `.env` file using Vite's environment variable conventions (with the `VITE_` prefix):

```
VITE_API_URL=http://localhost:3000/api
VITE_AUTH_TOKEN_EXPIRY=3600
VITE_REFRESH_TOKEN_EXPIRY=604800
```

> **Note**: In Vite, only variables prefixed with `VITE_` are exposed to your application code.

## Usage Example

```tsx
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  const handleLogin = async () => {
    const success = await login({ email: 'user@example.com', password: 'password' });
    if (success) {
      // Handle successful login
    }
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```
