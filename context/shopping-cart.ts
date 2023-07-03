/* eslint-disable indent */
import { createDomain } from 'effector-next'
import { IShoppingCartItem } from '@/types/shopping-cart'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  partId: number
  total_price: number
}>()
export const updateCartItemCount = shoppingCart.createEvent<{
  partId: number
  count: number
}>()

const remove = (cartItems: IShoppingCartItem[], partId: number) =>
  cartItems.filter((item) => item.partId !== partId)

const updateCartItem = <T extends keyof IShoppingCartItem>(
  cartItems: IShoppingCartItem[],
  partId: number,
  payload: Record<T, IShoppingCartItem[T]>
) => {
  const map = cartItems.map((item) => {
    if (item.partId === partId) {
      return {
        ...item,
        ...payload,
      }
    }
    return item
  })
  console.log('map: ', map)
  return map
}

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)])
  .on(updateCartItemTotalPrice, (state, { partId, total_price }) => [
    ...updateCartItem(state, partId, { total_price }),
  ])
  .on(updateCartItemCount, (state, { partId, count }) => [
    ...updateCartItem(state, partId, { count }),
  ])
