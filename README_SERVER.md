Node.js + SQLite Auth Server

This project includes a minimal Express server that provides persistent, cross-device authentication using SQLite and JWT.

Quick start

1. Install dependencies

```bash
npm install
```

2. (Optional) Set `JWT_SECRET` environment variable for production

```bash
set JWT_SECRET=your_secret_here   # Windows (cmd)
$env:JWT_SECRET="your_secret_here" # PowerShell
export JWT_SECRET=your_secret_here  # macOS / Linux
```

3. Run the server

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

API endpoints

- POST `/api/signup` - signup body: `{ firstName,lastName,email,phone,password,accountType,interests,message }` — returns `{ token }` on success
- POST `/api/login` - login body: `{ email, password }` — returns `{ token }` on success
- GET `/api/me` - requires `Authorization: Bearer <token>` header — returns `{ user }`

Notes

- The site pages (`pages/signup.html`, `pages/login.html`, `pages/client-dashboard.html`) have been updated to try the server endpoints first. If the server is not reachable, the old localStorage fallback is used (but that fallback is device-specific).
- For production you should run the Node server behind a proper HTTPS-enabled host and use a strong `JWT_SECRET`.
- The server serves the project statically as well when started from the project root (useful for local testing).
