
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const setHeaders = () => {
//     const headers = {
//         headers: {
//             "x-auth-token": JSON.parse(localStorage.getItem("token"))
//         },
//     };

//     return headers;
// };

export const fetchAsyncProducts = createAsyncThunk('products/fetchAsyncProducts',

    async () => {
        const response = await axios.get("http://localhost:4000/products")
        return response.data


        // async (id=null, {rejectWithValue}) => {
        //     try {
        //         const response = await axios.get("http://localhost:5000/products")
        //         return response.data
        //        } catch (error) {

        //         // return rejectWithValue(error.response.data)
        //         return rejectWithValue("error")

        //        }
        //    }

    })

export const createProducts = createAsyncThunk('products/createProducts',
    async (products) => {
        try {
            const response = await axios.post("http://localhost:4000/products/create",
                products,
                // setHeaders()
            )

            return response.data

        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {
    products: [],
    status: null,
    createStatus: null
    // error: null
}


export const productsSlice = createSlice({
    name: "products",
    initialState,

    // reducers:{},

    extraReducers: {
        [fetchAsyncProducts.pending]: () => {
            // state.status = "Pending..!"
            // console.log("Pending..!");
        },

        [fetchAsyncProducts.fulfilled]: (state, { payload }) => {
            // state.status = "True"
            // console.log("Success :)");
            // state.products = action.payload
            return { ...state, products: payload }

        },

        [fetchAsyncProducts.rejected]: (state, action) => {
            // console.log("Rejected :(")
            // state.status = "Rejected!"
            // state.error = action.payload
        },

        [createProducts.pending]: (state, action) => {
            state.createStatus = "Pending"
        },
        [createProducts.fulfilled]: (state, action) => {

            state.products.push(action.payload)
            state.createStatus = "Success"
            console.log("success")

        },
        [createProducts.rejected]: (state, action) => {
            state.createStatus = "Rejected"
            console.log("rejected")
        }
    }


})


export const getAllProducts = (state) => state.products.products

export default productsSlice.reducer