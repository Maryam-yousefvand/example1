import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

import './../style/Cart.css'
import Button from 'react-bootstrap/Button';


import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, decreaseCart, incrementCart, getAllProductsToCart, removeFromCart, getTotals, getCartTotalAmount } from './../features/cart/cartSlice';
import { Link } from 'react-router-dom'

import { registerUser } from '../features/auth/authSlice';

const Cart = () => {


  const cart = useSelector((state) => state.cart)

  const cartItems = useSelector(getAllProductsToCart)
  // let cartItems = JSON.parse(localStorage.getItem("cartItems"))

  const cartTotal = useSelector(getCartTotalAmount)

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [storage, setStorage] = useState("")

  const handleAddToCart = (product) => {

    dispatch(addToCart(product))

  }



  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))

  }

  useEffect(() => {
    // localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [])



  const user = JSON.parse(localStorage.getItem("token"))
  // useEffect(() => {
  //   dispatch(addToCart())
  // }, [dispatch])

  return (
    <div className='cart cart-container'>
      <h1 className="cart-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (

        <div className="cart-title">Your cart is empty</div>
      ) : (


        <Container className="cart-table">

          <Row xxl={4} className="cart-table-title ">
            <Col xxl={5} className="cart-table-title"><h3>Products</h3></Col>
            <Col xxl={2} className="cart-table-title"><h3>Price</h3></Col>
            <Col xxl={3} className="cart-table-title"><h3>Quanitity</h3></Col>
            <Col xxl={2} className="cart-table-title"><h3>Total</h3></Col>
          </Row>


          {
            cartItems.map(product =>


              <Row key={product._id} className="pb-5 pt-5 border-bottom cart-item">
                <Col xxl={5} className="d-flex  ">
                  <div>
                    <img src={product.image} alt="" className='cart-img' />
                  </div>
                  <div className='cart-detail'>
                    <h3>{product.name}</h3>
                    <h3>{product.desc}</h3>
                    <button
                      className='mt-3 btn btn-danger'
                      onClick={() => handleRemoveFromCart(product)}
                    >Remove</button>
                  </div>
                </Col>
                <Col xxl={2} className="d-flex align-items-center">
                  <h3>{`$${product.price}`}</h3>
                </Col>
                <Col xxl={3} className="d-flex align-items-center justify-content-center ">
                  <Button
                    variant="light"
                    className='mx-5'
                    onClick={() => dispatch(decreaseCart(product))}

                  >
                    -
                  </Button>
                  <h3 className='text-center '>{product.cartQuantity}</h3>
                  <Button
                    variant="light" className='mx-5'
                    onClick={() => handleAddToCart(product)}
                  >+</Button>
                </Col>

                <Col xxl={2} className="d-flex align-items-center justify-content-end ">
                  <h3>{`$${product.price * product.cartQuantity}`}</h3>
                </Col>
              </Row>
            )}


          <Row className='d-flex justify-content-between pt-5 pb-5 '>
            <Col xxl={8}>
              <button variant='outline-secondary'
                onClick={() => dispatch(clearCart())}>Clear Cart</button>
            </Col>
            <Col xxl={3} className=''>
              <div className='d-flex justify-content-between'>
                <span>Subtotal</span>
                <div>${(cart.cartTotalAmount)}</div>
              </div>
              <p></p>

              {user !== null ? (<div><Button className='w-100' >Check Out</Button></div>) :
                (<div>Login to check out</div>)
              }



              {/* <div><Button className='w-100' >Check Out</Button></div> */}
              <Link to="/" className='continue-shopping'>Continue Shopping</Link>
            </Col>
          </Row>


        </Container>

      )
      }





    </div >
  )
}

export default Cart

