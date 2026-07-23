import { AuthResult, LoginFormResult, RegisterResult } from '../domain'
import { authRepository, iAuthRepository } from '../infra'

export interface iAuthController {
  login: (email: string, password: string) => Promise<AuthResult>
  authenticate: (prevState: string | undefined, formData: FormData) => Promise<LoginFormResult>
  logout: () => Promise<void>
  registerUser: (name: string, email: string, password: string) => Promise<RegisterResult>
}

const AuthController = (repo: iAuthRepository): iAuthController => ({
  login: (email, password) => repo.login(email, password),
  authenticate: (prevState, formData) => repo.authenticate(prevState, formData),
  logout: () => repo.logout(),
  registerUser: (name, email, password) => repo.registerUser(name, email, password),
})

export const serverAuthController = (): iAuthController => {
  return AuthController(authRepository)
}
