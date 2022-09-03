import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';


const Products = () => {
    return (
        <div className='d-flex flex-column'>
            <div className=' d-flex align-items-center justify-content-between w-100'>
                <div>Product</div>
                <NavLink to="/admin/products/create-product"><Button>Create</Button></NavLink>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Products
