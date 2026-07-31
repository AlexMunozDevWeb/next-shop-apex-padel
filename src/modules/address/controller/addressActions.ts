'use server'

import { implementServerAddressController } from './AddressController'
import { Address, UserId } from '../domain'

export const setUserAddressAction = async (address: Address, userId: UserId) => {
  return implementServerAddressController().setUserAddress(address, userId)
}

export const deleteUserAddressAction = async (userId: UserId) => {
  return implementServerAddressController().deleteUserAddress(userId)
}
