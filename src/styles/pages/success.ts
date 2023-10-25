import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    marginTop: '3rem'
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    color: '$green500',
    fontSize: '$lg',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }

})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 145,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '0.25rem',
  marginTop: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '-40px',
  boxShadow: '15px 15px 15px  #000',

  img: {
    objectFit: 'cover'
  }
})

export const ContainerImage = styled('div', {
  display: 'flex',
  width: 600,
  justifyContent: 'center',
  alignItems: 'center',

})

