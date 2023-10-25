import { useContext } from 'react'
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/produc'

import Head from 'next/head'
import Image from 'next/image'

import Stripe from 'stripe'
import { CartContext } from '@/context/cartContext'
import { ToastContainer } from 'react-toastify'
import { formatPrice } from '@/components/header'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    default_price: string
  }
}

const Product = ({product}: ProductProps) => {
  const {addToCart, items} = useContext(CartContext)
 
  return (
   <>
   <Head>
    <title>
      {product.name}
    </title>
   </Head>
   <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
  <ProductContainer>
  <ImageContainer>
    <Image src={product.imageUrl} width={520} height={480} alt=''/> 
  </ImageContainer>

  <ProductDetails>
    <h1>{product.name}</h1>
    <span>{formatPrice(product.price)}</span>

    <p>{product.description}</p>

    <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
  </ProductDetails>
  </ProductContainer>
   </>
  )
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {id: 'prod_Os4Oa41Z6SqbCX'}},
      {params: {id: 'prod_Os4QMUusghAxnM'}},
      {params: {id: 'prod_Os4PVFOsyalkT5'}},
      {params: {id: 'prod_Os4NPHYuxWFg7t'}},

    ],
   fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price
 

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount! / 100,
        description: product.description,
        default_price: price.id,
      }
    },
    revalidate: 60 * 60 * 1, //1 hour
  }
}

