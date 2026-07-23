import { prisma } from '@/modules/shared/lib/prisma'
import { iAddressRepository } from './iAddressRepository'
import { Address } from '../domain'

export const addressRepository: iAddressRepository = {
  deleteUserAddress: async (userId: string) => {
    try {
      await prisma.userAddress.delete({
        where: { userId },
      })
      return { ok: 'ok' }
    } catch (error) {
      return {
        ok: false,
        message: 'Error al eliminar la dirección',
      }
    }
  },
  getUserAddress: async (userId: string) => {
    try {
      const address = await prisma.userAddress.findUnique({
        where: { userId },
      })

      if (!address) return null

      const { countryId, address2, ...rest } = address

      return {
        ...rest,
        address2: address2 ?? undefined,
        country: countryId,
      }
    } catch (error) {
      return null
    }
  },

  setUserAddress: async (address: Address, userId: string) => {
    try {
      const newAddress = await createOrReplaceAddress(address, userId)
      const { countryId, address2, ...rest } = newAddress
      return {
        ok: true,
        address: {
          ...rest,
          address2: address2 ?? undefined,
          country: countryId,
        },
      }
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        message: 'No se pudo guardar la dirección',
      }
    }
  },
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    })

    const addressToSave = {
      userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city,
    }

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      })
      return newAddress
    }
    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    })
    return updatedAddress
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo guardar la dirección')
  }
}
