import { useEffect, useState } from 'react'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart'

export const usePrice = (
  count: number,
  partId: number,
  initialPrice: number
) => {
  const [spinner, setSpinner] = useState(false)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateTotalPrice(price, partId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)
  const deleteCartItem = () => removeItemFromCart(partId, setSpinner)

  return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}
