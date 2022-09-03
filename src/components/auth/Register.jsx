import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import "../../style/Register.css"
import "bootstrap/dist/css/bootstrap.min.css"
// import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


const Register = () => {
    let err = 0;

    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const navigate = useNavigate("")


    // const authEmail = []
    // authEmail = useSelector((state) => state.auth.email)


    const [name, setName] = useState("")
    const [errName, setErrName] = useState("")
    const [validName, setValidName] = useState("")

    const [email, setEmail] = useState("")
    const [errEmail, setErrEmail] = useState("")
    const [validEmail, setValidEmail] = useState("")


    const [password, setPassword] = useState("")
    const [errPassword, setErrPassword] = useState("")
    const [validPassword, setValidPassword] = useState("")


    const [matchPassword, setMatchPassword] = useState("")
    const [errMatchPassword, setErrMatchPassword] = useState("")
    const [validMatchPassword, setValidMatchPassword] = useState("")

    const nameRef = useRef()
    const errRef = useRef();

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(name)
        setValidName(result)
    }, [name])

    useEffect(() => {
        setErrName("")
    }, [name])


    useEffect(() => {
        setErrEmail("")
    }, [email])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        setErrPassword("")
        setErrMatchPassword("")
    }, [password, matchPassword])


    useEffect(() => {
        const result = PWD_REGEX.test(password)
        setValidPassword(result)
    }, [password])


    useEffect(() => {
        setErrMatchPassword("")
    }, [matchPassword])

    useEffect(() => {

        if (!matchPassword == "" || !matchPassword == null) {
            const result = matchPassword === password
            setValidMatchPassword(result)
        }


    }, [matchPassword, password])



    // console.log(user)

    const user = {
        name,
        email,
        password
    }



    const handleSubmitRegister = (e) => {
        e.preventDefault();

        const trueName = USER_REGEX.test(name)
        const trueEmail = EMAIL_REGEX.test(email)
        const truePassword = PWD_REGEX.test(password)





        if (name == "" || name == null) {
            setErrName("enter a name")
            err++
        }

        else if (!trueName) {
            setErrName("Invalid Name")
            err++
        }


        if (!trueEmail) {
            setErrEmail("Invaid Email")
            err++
        }

        if (password == "" || password == null) {
            setErrPassword("Please Enter Password")
            err++
        }
        else if (!truePassword) {
            setErrPassword("Invalid Password")
            err++
        }

        if (matchPassword == "" || matchPassword == null) {
            setErrMatchPassword("Password do not match")
            err++
        }

        else if (matchPassword !== password) {
            setErrMatchPassword("Password do not match")
            err++
        }



        if (err > 0) {
            return false

        }


        else {
            dispatch(registerUser({ name, email, password }))


            setName("")
            setEmail("")
            setPassword("")
            setMatchPassword("")
            setValidMatchPassword("")
            // navigate("/cart")


        }

    }

    useEffect(() => {
        if (auth._id) {
            navigate('/cart')



        }
    }, [auth._id, navigate])


    // const [user, setUser] = useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // })
    // console.log(user)

    return (

        <>
            <div className='register d-flex flex-column align-items-center pt-5'>
                <h2 className='pb-2 pt-2'>Register</h2>

                <form onSubmit={handleSubmitRegister} className=" d-flex flex-column w-25">
                    <input className={errName ? ('mb-2 mt-2 pt-2 pb-2 border-red') :
                        (validName ? ('mb-2 mt-2 pt-2 pb-2 border-green') : ('mb-2 mt-2 pt-2 pb-2 border-gray'))}

                        type="text"
                        name='name'
                        placeholder='Name'
                        ref={nameRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    // onChange={(e) => setUser({ ...user, name: e.target.value })}


                    />
                    <input
                        className={errEmail ? ('mb-2 mt-2 pt-2 pb-2 border-red') :
                            (validEmail ? ('mb-2 mt-2 pt-2 pb-2 border-green') : ('mb-2 mt-2 pt-2 pb-2 border-gray'))}
                        type="text"
                        name='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className={errPassword ? ('mb-2 mt-2 pt-2 pb-2 border-red') :
                            (validPassword ? ('mb-2 mt-2 pt-2 pb-2 border-green') : ('mb-2 mt-2 pt-2 pb-2 border-gray'))
                        }
                        type="password"
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className={errMatchPassword ? ('mb-2 mt-2 pt-2 pb-2 border-red') :
                            (validMatchPassword ? ('mb-2 mt-2 pt-2 pb-2 border-green') : ('mb-2 mt-2 pt-2 pb-2 border-gray'))
                        }
                        type="password"
                        name='match-password'
                        placeholder='Confirm Password'
                        value={matchPassword}
                        onChange={(e) => setMatchPassword(e.target.value)}
                    />

                    <button className='mb-2 mt-2 pt-2 pb-2' >Register
                        {/* {auth.registerStatus === "Pending" ? ("submiting") : ("Register")} */}
                    </button>

                    <div>{errName}</div>
                    <div>{errEmail}</div>
                    <div>{errPassword}</div>
                    <div>{errMatchPassword}</div>


                </form>
            </div>
        </>
    )
}

export default Register
