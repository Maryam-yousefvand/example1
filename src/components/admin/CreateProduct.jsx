
import React, { useState } from 'react'
// import Botton from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createProducts } from '../../features/products/productSlice';



const CreateProduct = () => {

    const dispatch = useDispatch()

    const [productImage, setProductImage] = useState("")
    const [productName, setProductName] = useState("")
    const [productBrand, setProductBrand] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productDesc, setProductDesc] = useState("")

    const produactImageUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setProductImage(reader.result)
            }
        } else {
            setProductImage("")
        }
    }





    const handleCreateProductSubmit = (e) => {
        e.preventDefault()
        dispatch(createProducts({
            name: productName,
            brand: productBrand,
            price: productPrice,
            desc: productDesc,
            image: productImage
        }))

        setProductBrand("")
        setProductDesc("")
        setProductImage("")
        setProductName("")
        setProductPrice("")
    }

    console.log(productName)

    return (
        <div className='create-product pt-5 d-flex'>
            <div className='w-50'>
                <h4>Create a Product</h4>
                <form className='d-flex flex-column w-75' onSubmit={handleCreateProductSubmit}>
                    <input
                        type="file"
                        accept='image/*'
                        className='mt-2 mb-2'
                        onChange={produactImageUpload}
                    />

                    <select className='mt-2 mb-2 p-1' onChange={(e) => setProductBrand(e.target.value)} >
                        <option value="">Select Brand</option>
                        <option value="iphone">iPhone</option>
                        <option value="sumsung">Sumsung</option>
                        <option value="xiomi">Xiomi</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        className='mt-2 mb-2 p-1'
                        type="text"
                        placeholder='Name'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <input
                        className='mt-2 mb-2 p-1'
                        type="number"
                        placeholder='Price'
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                    <input
                        className='mt-2 mb-2 p-1'
                        type="text"
                        placeholder='Short Description'
                        value={productDesc}
                        onChange={(e) => setProductDesc(e.target.value)}
                    />

                    <button className='mt-2 mb-2' >Submit</button>
                </form>
            </div>
            <div className='create-product-img w-75'>
                {productImage ? <img src={productImage} alt="product image" /> : <p className='w-100'>Image Previwe!</p>}

            </div>
        </div>
    )
}

export default CreateProduct
