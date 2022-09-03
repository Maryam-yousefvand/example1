import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    let err = 0;
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [errEmail, setErrEmail] = useState("")
    const [validEmail, setValidEmail] = useState("")


    const [password, setPassword] = useState("")
    const [errPassword, setErrPassword] = useState("")
    const [validPassword, setValidPassword] = useState("")

    useEffect(() => {
        setErrEmail("")
    }, [email])

    useEffect(() => {
        setErrPassword("")
    }, [password])


    const handleSubmit = (e) => {

        e.preventDefault()

        if (email == "" || email == null) {
            setErrEmail("invalid Email")
            err++

        }

        if (password == "" || password == null) {
            setErrPassword("invalid password")
            err++
        }




        if (err > 0) {
            return false
        } else {
            dispatch(loginUser({ email, password }))
            setEmail("")
            setPassword('')
        }

    }

    useEffect(() => {

        if (auth._id) {
            navigate("/cart")
            const id = auth._id
        }

    }, [auth._id, navigate])



    return (
        <div className='login d-flex flex-column align-items-center pt-5'>

            <h2 className='pt-'>Login</h2>
            <form className='login d-flex flex-column w-25' action=''
                onSubmit={handleSubmit}
            >

                <input
                    className='mb-2 mt-2 pt-2 pb-2'
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className='mb-2 mt-2 pt-2 pb-2'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />



                <button type='submit' className='mb-2 mt-2 pt-2 pb-2'>Login</button>

                <div>{errEmail}</div>
                <div>{errPassword}</div>

            </form>

        </div >
    )
}

export default Login
