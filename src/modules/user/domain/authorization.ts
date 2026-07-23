export const canManageUsers = (role: string | undefined | null): boolean => {
  return role === 'admin'
}
