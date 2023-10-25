import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { lineItems } = request.body

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  if (!lineItems) {
    return response.status(400).json({ error: 'Price not found.' })
  }


  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`

  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    success_url: successUrl,
    mode: 'payment',
    line_items: lineItems
  })

  return response.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}