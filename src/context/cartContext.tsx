import { useMemo, useState } from 'react'
import { createContext, ReactNode } from 'react'
import { toast } from 'react-toastify'

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  default_price: string
}
interface CartContextData {
  items: Product[]
  addToCart: (product: Product) => void
  removeToCart: (productId: string) => void
  total: number
}


interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<Product[]>([])


  console.log(items)

  function addToCart(product: Product) {

    const productAlreadExists = items.some((item) => {
      return item.id === product.id
    })

    if(productAlreadExists) {
      const notifyAlreadyExist = () => toast("Você pode comprar apenas 1 unidade desse item");
      notifyAlreadyExist()
      return
    } 
    setItems((state) =>[...state, product])
    const notify = () => toast("Produto Adicionado");
    notify()
  }

  function removeToCart(productId: string) {
    const newList = items.filter((item) => {
      return item.id !== productId
    })
    return setItems(newList)
  }

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
     return acc + item.price
    }, 0)
  }, [items])



  return (
    <CartContext.Provider value={{
      addToCart,
      removeToCart,
      items,
      total

    }}>
      {children}
    </CartContext.Provider>
  )

}

export default CartProvider