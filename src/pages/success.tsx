import { stripe } from "@/lib/stripe"
import { ContainerImage, ImageContainer, SuccessContainer } from "@/styles/pages/success"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Stripe from "stripe"

interface SuccessProps {
  customerName: string
  lineItems: {
    imageUrl: string
    name: string
    price: number
    quantity: number
  }[]
}

const Success = ({customerName, lineItems}: SuccessProps) => {
  
  return (
   <>
  <Head>
    <title>
      Compra efetuada | Ignite Shop
    </title>
    <meta name="robots" content="noindex"/>
  </Head>
    <SuccessContainer>
      <ContainerImage>
        {lineItems.map((item) => (
          <ImageContainer key={item.name}>
            <Image src={item.imageUrl} width={120} height={120} alt=''/>
          </ImageContainer>

        ))}
      </ContainerImage>
      <h1>Compra efetuada</h1>
      <p>
      Uhuul <strong>{customerName}</strong>, sua compra de {lineItems.length} camisetas já está a caminho da sua casa. 
      </p>

      <Link href='/'>
        Voltar ao catágo
      </Link>
    </SuccessContainer>
   </>
  )
}

export default Success

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details!.name
  const lineItems = session.line_items?.data.map((item: any) => {
    const product = item.price.product as Stripe.Product;
    return {
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
      price: item.price.unit_amount / 100, // Convertendo centavos para reais
    };
  });

  return {
    props: {
      customerName,
      lineItems, // Agora você tem todos os itens da sessão
    }
  }

}