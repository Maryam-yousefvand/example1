
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode"


const setHeaders = () => {
    const headers = {
        headers: {
            "x-auth-token": JSON.parse(localStorage.getItem("token"))
        },
    };

    return headers;
};


const initialState = {
    token: JSON.parse(localStorage.getItem("token")),
    // token: JSON.parse(sessionStorage.getItem("token")),
    name: "",
    password: "",
    email: "",
    _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
    isAdmin: false,
    getListUserStatus: "",
    users: [],
    userDeleteStatus: ""

}



export const registerUser = createAsyncThunk("auth/registerUser",
    // (user, rejectWithValue) => {
    async ({ name, email, password }, rejectWithValue) => {


        try {
            const token = await axios.post('http://localhost:4000/register/create', {
                name: name,
                email: email,
                password: password

                // name: user.name,
                // email: user.email,
                // password: user.password
            },
                // {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         "Access-Control-Allow-Origin": "*",
                //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                //     }

                // }
            )

            localStorage.setItem("token", JSON.stringify(token.data));
            // sessionStorage.setItem("token", JSON.stringify(token.data));

            return token.data;

        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
            // return rejectWithValue()
        }



    }
)





export const loginUser = createAsyncThunk("auth/loginUser",
    async (values, rejectWithValue) => {
        try {
            const token = await axios.post("http://localhost:4000/login/create", values)

            localStorage.setItem("token", JSON.stringify(token.data));

            return token.data
        } catch (error) {

            console.log(error.response)
            return rejectWithValue(error.response.data)

        }
    })



export const getUser = createAsyncThunk(
    "auth/getUser",
    async (id, { rejectWithValue }) => {
        try {
            const token = await axios.get(`http://localhost:4000/user/${id}`, setHeaders());
            localStorage.setItem("token", JSON.stringify(token.data));
            return token.data;
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
);



export const listOfUsers = createAsyncThunk("auth/listOfUsers",
    async () => {

        try {
            const response = await axios.get("http://localhost:4000/register")
            // console.log(response.data);
            return response.data

        } catch (error) {
            console.log(error.response);
        }


    })

export const userDelete = createAsyncThunk("auth/userDelete",
    async (_id) => {


        try {
            console.log(_id);
            await axios.delete(`http://localhost:4000/register/delete/${_id}`)



        } catch (error) {
            console.log(error.response);
        }

    })





const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        loadUser(state, action) {

            const token = state.token

            if (token) {
                // const user = jwtDecode(token)
                const user = JSON.parse(localStorage.getItem("token"))

                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    _id: user._id,
                    userLoaded: true,
                    isAdmin: user.isAdmin,
                }

            }
        },

        logoutUser(state, action) {

            localStorage.removeItem("token")


            return {
                ...state,
                token: "",
                name: "",
                password: "",
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false,
                isAdmin: false,

            }
        },
        // userDelete(state, action) {
        //     state.users = []
        //     const nextCartItems = state.users.filter(user =>
        //         user._id !== action.payload._id
        //     )

        //     state.users = nextCartItems


        // }




    },

    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "Pending" }
        })

        builder.addCase(registerUser.fulfilled, (state, action) => {

            if (action.payload) {
                const user = action.payload

                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    _id: user._id,
                    registerStatus: "Success",
                    isAdmin: user.isAdmin,
                }
            } else { return state }

        })

        builder.addCase(registerUser.rejected, (state, action) => {

            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload
            }

        })

        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: "loginPending" }
        })

        builder.addCase(loginUser.fulfilled, (state, action) => {

            if (action.payload) {
                const user = action.payload

                return {
                    ...state,
                    token: action.payload,
                    email: user.email,
                    password: user.password,
                    _id: user._id,
                    loginStatus: "Success",
                    isAdmin: user.isAdmin,
                }
            } else { return state }
        })

        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "Rejected",
                loginError: action.payload
            }


        })

        builder.addCase(getUser.pending, (state, action) => {
            return {
                ...state,
                getUserStatus: "pending",
            };
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = action.payload
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    getUserStatus: "success",
                    isAdmin: user.isAdmin,
                };
            } else return state;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            return {
                ...state,
                getUserStatus: "rejected",
                getUserError: action.payload,
            };
        });

        builder.addCase(listOfUsers.pending, (state, action) => {
            return {
                ...state,
                getListUserStatus: "Pending"
            }

        })

        builder.addCase(listOfUsers.fulfilled, (state, action) => {


            return {
                ...state,
                users: action.payload

            }
        })


        builder.addCase(listOfUsers.rejected, (state, action) => {
            return {
                ...state,
                getListUserStatus: "Rejected"
            }
        })

        builder.addCase(userDelete.pending, (state, action) => {
            return {
                ...state,
                userDeleteStatus: "Pending"

            }
        })

        builder.addCase(userDelete.fulfilled, (state, action) => {


            return {
                ...state,
                userDeleteStatus: "Success"
            }
        })

        builder.addCase(userDelete.rejected, (state, action) => {
            return {
                ...state,
                userDeleteStatus: "Rejected"
            }
        })

    },




})

export const { loadUser, logoutUser } = authSlice.actions
export default authSlice.reducer