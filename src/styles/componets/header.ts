import { styled } from "..";
import * as Dialog from '@radix-ui/react-dialog'

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  // position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',


  span: {
    padding: '0.75rem',
    background: '$gray800',
    borderRadius: 6,

    color: '#8d8d99'
  }
})

export const BagContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',

  p: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    border: '4px solid #1e1e1e',
    position: 'absolute',
    top: -12,
    right: -10,
    width: '2rem',
    height: '2rem',
    background: '$green500',
    color: '$white',
    fontWeight: 'bold',
    lineHeight: 0
  }
})

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  background: '$gray800',
  maxWidth: 480,
  width: '100%',
  minHeight: '100vh',
  height: '100%',
})

export const ListItemContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '4.5rem 3rem 3rem',
  height: '100%',
})

export const Close = styled(Dialog.Close, {
  position: 'absolute',
  top: 24,
  right: 24,
  border: 'none',
  background: 'transparent',
  color: '#8d8d99'
})



export const ContentContainer = styled('div', {
  display: 'flex',
  gap: '1.5rem',
  marginTop: '2rem',

  '& + &': {
    marginTop: '1.5rem'
  }
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
})

export const InfoItem = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',

  p: {
    fontSize: '$lg',
    color: '$gray300',
    lineHeight: 1.6
  },

  strong: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '$lg',
    color: '$gray100',
    lineHeight: 1.6,
    marginBlock: '0.125rem 0.5rem'
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '$green500',
    background: 'transparent',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  }
})

export const PricesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  height: '100%',
  width: '100%',



  button: {
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$white',
    background: '$green500',
    border: 'none',
    borderRadius: 8,
    padding: '1.5rem',
    marginTop: '3.125rem'
  }

})

export const QuantityContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  p: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '$gray100'
  },

  span: {
    fontSize: '$lg',
    lineHeight: 1.6,
    color: '$gray300'
  }
})

export const PriceContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  p: {
    fontWeight: 'bold',
    fontSize: '$lg',
    lineHeight: 1.6
  },

  strong: {
    fontWeight: 'bold',
    fontSize: '$xl',
    lineHeight: 1.4
  },
})