import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseCart, getAllProductsToCart } from '../features/cart/cartSlice';

import { useNavigate } from "react-router-dom"
import { getAllProducts } from '../features/products/productSlice';




const Product = ({ data }) => {

    // let cartItems = []
    const cartItems = useSelector(getAllProductsToCart)
    const cart = useSelector(getAllProductsToCart)
    const products = useSelector(getAllProducts)
    const dispatch = useDispatch()

    const [storage, setStorage] = useState("")
    const navigate = useNavigate()

    // let cartItems = JSON.parse(localStorage.getItem("cartItems"))

    const handleAddToCart = (data) => {

        dispatch(addToCart(data))
        // window.location.reload()



    }

    // useEffect(() => {
    //     localStorage.setItem("cartItems", JSON.stringify(cartItems))
    // }, [])

    // console.log(JSON.parse(localStorage.getItem("cartItems")));





    return (
        <>

            <div className='product-container' key={data._id}>
                <h4>{data.name}</h4>
                <div className='product-img' >
                    <img className='' src={data.image} alt={data.name} />
                </div>
                <div className='product-detail'>
                    <div>{data.desc}</div>
                    <div className='product-price'>{data.price}</div>
                </div>


                <button onClick={() => handleAddToCart(data)} >Add To Cart</button>

                {/* <div>
                    <button

                        className=''
                        onClick={() => dispatch(decreaseCart(data))}

                    >
                        -
                    </button>
                    <div className='text-center'>{cart.cartQuantity}</div>
                    <button
                        className=''
                        onClick={() => dispatch(addToCart(data))}
                    >+</button>
                </div> */}









            </div>




        </>


    )
}

export default Product
