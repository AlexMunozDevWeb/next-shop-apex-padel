export type AuthResult = { ok: true } | { ok: false; message: string }

export type RegisterResult =
  | { ok: true; user: { id: string; name: string; email: string }; message: string }
  | { ok: false; message: string }

export type LoginFormResult = 'Success' | 'Invalid credentials' | 'Unknown error'
