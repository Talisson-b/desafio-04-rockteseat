
// Importação do carrosel 
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { Cart, HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import { stripe } from '@/lib/stripe';
import { GetStaticProps } from 'next';
import Stripe from 'stripe';
import Link from 'next/link';
import Head from 'next/head'
import { Handbag } from '@phosphor-icons/react/dist/ssr/Handbag';
import  {MouseEvent, useContext } from 'react'
import { CartContext } from '@/context/cartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatPrice } from '@/components/header';

export interface Homeprops {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    default_price: string
  }[]
}

export default function Home({products}: Homeprops) {
  const {addToCart} = useContext(CartContext)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
      
    }
  })

  function handleToCart(e: MouseEvent<HTMLDivElement>, product: any) {
    e.preventDefault()
    addToCart(product)
    
  }
  return (
    <>
        <Head>
        <title>
          Home | Ignite Shop
        </title>
      </Head>
        <HomeContainer ref={sliderRef} className='keen-slider'>
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
        {products.map((product) => (
             <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
          <Product  className='keen-slider__slide' >
            <Image src={product.imageUrl} width={520} height={480} alt="camiseta"/>
            <footer>
              <strong>{product.name}</strong>
              <span>{formatPrice(product.price)}</span> 
              <Cart onClick={((e) => handleToCart(e, product))}><Handbag size={32} weight="bold" /></Cart>
            </footer>
          </Product>
          </Link>
         
        ))}     
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
    const response = await stripe.products.list({
      expand: ['data.default_price']
    })
    
    const products = response.data.map((product) => {

    const price = product.default_price as Stripe.Price
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount! / 100,
        default_price: price.id
        
      }
    })
  

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }

}
