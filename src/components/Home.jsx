import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { getAllProducts, fetchAsyncProducts } from './../features/products/productSlice';
import '../style/Product.css';
import Product from './Product';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { decreaseCart, getAllProductsToCart } from '../features/cart/cartSlice';
import Button from 'react-bootstrap/Button';


const Home = () => {

  const addToCart = "Add To Cart"

  const products = useSelector(getAllProducts)
  const dispatch = useDispatch()
  const cart = useSelector(getAllProductsToCart)
  // console.log(products);

  useEffect(() => {
    dispatch(fetchAsyncProducts())

  }, [dispatch])

  // localStorage.getItem("cartItems")


  return (
    <Container className='home-container '>
      <h2>New Arrivals</h2>
      <Row xxl={3}  >
        {products.map((product) => (
          <Col className='' key={product._id}>
            <Product data={product} className="" />



          </Col>


        ))}
        {/* <div>
          {cart.map(item => (
            <div key={item.id}>{item.cartQuantity}</div>
          ))}
        </div> */}

      </Row>


      {/* {cart.map(item =>
        <div>
          <Button
            variant="light"
            className='mx-5'
            onClick={() => dispatch(decreaseCart(item))}

          >
            -
          </Button>
          <h3 className='text-center '>{item.cartQuantity}</h3>
          <Button
            variant="light" className='mx-5'
            onClick={() => dispatch(addToCart(item))}
          >+</Button>
        </div>
        
        )} */}
    </Container>
  )
}

export default Home


