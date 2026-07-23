import { UserId, Address } from '../domain'

export interface iAddressRepository {
  deleteUserAddress: (query: UserId) => Promise<{ ok: string } | { ok: boolean; message: string }>
  getUserAddress: (query: UserId) => Promise<Address | null>
  setUserAddress: (
    address: Address,
    userId: UserId
  ) => Promise<{ ok: boolean; address: Address } | { ok: boolean; message: string }>
}
