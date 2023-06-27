import { createDomain } from 'effector-next'
import { IBoilerParts } from '@/types/boilerparts'
import { IFilterCheckboxItem } from '@/types/catalog'
import { boilerManufacturers, partsManufacturers } from '@/utils/catalog'

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilerManufacturers =
  boilerParts.createEvent<IFilterCheckboxItem[]>()
export const updateBoilerManufacturer =
  boilerParts.createEvent<IFilterCheckboxItem>()

export const setPartManufacturers =
  boilerParts.createEvent<IFilterCheckboxItem[]>()
export const updatePartManufacturer =
  boilerParts.createEvent<IFilterCheckboxItem>()

const updateManufacturer = (
  manufacturers: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  manufacturers.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }
    return item
  })

export const $boilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setBoilerParts, (_, parts) => parts)

export const $boilerManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(
    boilerManufacturers as IFilterCheckboxItem[]
  )
  .on(setBoilerManufacturers, (_, parts) => parts)
  .on(updateBoilerManufacturer, (state, payload) =>
    updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    })
  )

export const $partManufacturers = boilerParts
  .createStore<IFilterCheckboxItem[]>(
    partsManufacturers as IFilterCheckboxItem[]
  )
  .on(setPartManufacturers, (_, parts) => parts)
  .on(updatePartManufacturer, (state, payload) =>
    updateManufacturer(state, payload.id as string, {
      checked: payload.checked,
    })
  )
