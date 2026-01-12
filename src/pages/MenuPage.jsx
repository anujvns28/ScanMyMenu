import React from 'react'
import { CartProvider } from '../context/CartContext'
import Menu from './Menu'

const MenuPage = () => {
  return (
    <CartProvider>
        <Menu/>
    </CartProvider>
  )
}

export default MenuPage
