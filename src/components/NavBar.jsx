import React, { useEffect } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import '../style/NavBar.css'
import { getTotals } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css"
import { logoutUser, registerUser } from "../features/auth/authSlice";
import { toast } from 'react-toastify';


const NavBar = () => {

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getTotals())
    }, [cart])





    const user = JSON.parse(localStorage.getItem("token"))
    // console.log(user);


    return (
        <nav className="nav-bar">
            <Link to="/">
                <h2>OnlineShop</h2>
            </Link>

            <Link to="/cart">
                <IconContext.Provider
                    value={{
                        color: "white",
                        className: "global-class-name",
                        size: "30px",
                    }}
                >
                    <div className="nav-bag">
                        <BsHandbagFill />
                        <span className="bag-quantity">{cart.cartTotalQantity}</span>
                    </div>
                </IconContext.Provider>
            </Link>

            {user !== null ? (

                <div className="d-flex">
                    <div className="text-white mx-2">{user.name}</div>
                    <div>
                        <Link to="/admin/summary">Admin</Link>
                    </div>
                    <div className="text-white mx-2"
                        onClick={() => {
                            dispatch(logoutUser(null))
                            toast.warning("Logged out", { position: "top-right" })

                        }}
                    >Logout
                    </div>
                </div>

            ) : (

                <div className="">
                    <Link to="/login" className="text-white">Login /</Link>
                    <Link to="/register" className="text-white"> Register</Link>
                </div>
            )
            }




        </nav >
    );
};

export default NavBar;

// const Logout = styled.div`
// color:white;
// cursor:pointer;
// `
