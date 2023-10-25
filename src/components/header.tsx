import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { BagContainer, Close, Content, ContentContainer, Header, ImageContainer, InfoItem, ListItemContainer, PriceContainer, PricesContainer, QuantityContainer } from '@/styles/componets/header'
import { Handbag, X } from '@phosphor-icons/react'
import { CartContext } from '@/context/cartContext'
import logo from '../assets/logoImg.svg'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const HeaderComponent = () => {
  const {items, removeToCart, total} = useContext(CartContext)

  async function handleBuyProduct() {

    try {
      const lineItems = items.map((item) => ({
        price: item.default_price,
        quantity: 1
      })) 
      const response = await axios.post('/api/checkout', {
        lineItems: lineItems
        
      })
      // setIsCreatingCheckoutSession(true)
      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (error) {
      // setIsCreatingCheckoutSession(false)
      console.log(error, 'Falha ao redirecioanar ao checkout!')
    } 
  }


  return (
    <Header>
    <Link href='/'>
    <Image src={logo} width={150} height={150} alt=''/>
    </Link>
  <Dialog.Root>
    <Dialog.Trigger asChild>
    <BagContainer>
        <span><Handbag size={32} weight="bold" /></span>
        <p>{items.length}</p>
    </BagContainer>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Content>
        <ListItemContainer>
          <h3>Sacola de compras</h3>
          
            {items.map((item) => (
              <ContentContainer key={item.id}>
              <ImageContainer>
                <Image src={item.imageUrl} width={94} height={94} alt=''  />
              </ImageContainer>
              <InfoItem>
                <p>{item.name}</p>
                <strong>{formatPrice(item.price)}</strong>
                <button onClick={() => removeToCart(item.id)}>Remover</button>
                </InfoItem>
              </ContentContainer>
            ))}
    
         

          {items.length > 0 && (
            <PricesContainer>
            <QuantityContainer>
              <p>Quantidade</p>
              <span>{items.length} itens</span>
            </QuantityContainer>

            <PriceContainer>
              <p>Valor total</p>
              <strong>{formatPrice(total)}</strong>
            </PriceContainer>
            
          <button  onClick={()=> handleBuyProduct()}>Finalizar compra</button>
        </PricesContainer>
          )}

        </ListItemContainer>
        <Close>
          <X size={24}/>
        </Close>
      </Content>
    </Dialog.Portal>
  </Dialog.Root>
</Header>
  )
}

export default HeaderComponent


