import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { listOfUsers, userDelete } from '../../features/auth/authSlice';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

const User = () => {

    const dispatch = useDispatch()

    const users = useSelector((state) => state.auth.users)
    // console.log(users);
    const auth = useSelector((state) => state.auth)
    // console.log(users);


    useEffect(() => {
        dispatch(listOfUsers())
    }, [users])



    const handleUserDelete = async (_id) => {
        // console.log(_id, name, email, password);
        // try {
        //     await axios.delete("http://localhost:4000/register", _id)
        // } catch (error) {
        //     console.log(error.response);

        // }
        // alert("ok")
        dispatch(userDelete(_id))

        // try {
        //     await axios.delete(`http://localhost:4000/register/delete/62a7262fd23eb07b7a2117f9`)



        // } catch (error) {
        //     console.log(error.response);
        // }
        // console.log(users);
    }




    return (
        <div className='list-users pb-5'>
            <h3>List of users</h3>

            <div className='list-users-head d-flex pt-5 pb-3 mb-3' >
                <div className='w-25'>Name</div>
                <div className='w-50'>Email</div>
            </div>

            {users.map((user) => (

                <div className='d-flex' key={user._id}>
                    <div className='w-25 mt-3'>{user.name}</div>
                    <div className='w-50 mt-3'>{user.email}</div>
                    <Button
                        variant='danger'
                        className='mt-3'
                        onClick={() => handleUserDelete(user._id)}
                    >
                        delete</Button>
                </div>

            ))}



        </div>
    )
}

export default User
