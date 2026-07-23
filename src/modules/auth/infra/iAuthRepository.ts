import { AuthResult, LoginFormResult, RegisterResult } from '../domain'

export interface iAuthRepository {
  login: (email: string, password: string) => Promise<AuthResult>
  authenticate: (prevState: string | undefined, formData: FormData) => Promise<LoginFormResult>
  logout: () => Promise<void>
  registerUser: (name: string, email: string, password: string) => Promise<RegisterResult>
}
