import { UserId, Address } from '../domain'
import { addressRepository, iAddressRepository } from '../infra'

type DeleteResult = { ok: string } | { ok: boolean; message: string }
type SetResult = { ok: boolean; address: Address } | { ok: boolean; message: string }

interface iAddressController {
  getUserAddress: (userId: UserId) => Promise<Address | null>
  deleteUserAddress: (userId: UserId) => Promise<DeleteResult>
  setUserAddress: (address: Address, userId: UserId) => Promise<SetResult>
}

const AddressController = (api: iAddressRepository): iAddressController => ({
  getUserAddress: (userId) => api.getUserAddress(userId),
  deleteUserAddress: (userId) => api.deleteUserAddress(userId),
  setUserAddress: (address, userId) => api.setUserAddress(address, userId),
})

export const implementServerAddressController = (): iAddressController => {
  return AddressController(addressRepository)
}
