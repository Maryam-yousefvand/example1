import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../../style/dashboard.css'

import "bootstrap/dist/css/bootstrap.min.css"




const Dashboard = () => {
    return (
        <div className='dashboard '>


            <div className='dashboard-nav d-flex flex-column align-items-center pt-5'>
                <NavLink to="/admin/summary" className={({ isActive }) => isActive ? "text-summary pb-3 w-50" : "text-black pb-3 w-50"} >Summary</NavLink>
                <NavLink to="/admin/products" className={({ isActive }) => isActive ? "text-summary pb-3 w-50" : "text-black pb-3 w-50"}>Products</NavLink>

                <NavLink to="/admin/order" className={({ isActive }) => isActive ? "text-summary pb-3 w-50" : "text-black pb-3 w-50"}>Order</NavLink>
                <NavLink to="/admin/user" className={({ isActive }) => isActive ? "text-summary pb-3 w-50" : "text-black pb-3 w-50"}>User</NavLink>
            </div>

            <div className='dashboard-content pt-5 px-5 '>
                <Outlet className="ccc" />
            </div>

        </div>
    )
}

export default Dashboard
