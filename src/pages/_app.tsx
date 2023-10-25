import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
globalStyles()

import CartProvider, { CartContext } from '@/context/cartContext'
import HeaderComponent from '@/components/header'


export default function App({ Component, pageProps }: AppProps) {
  
  return (
<CartProvider>
  <Container>
      <HeaderComponent />
      <Component {...pageProps} />
      </Container>
  </CartProvider>
   
  )
}
