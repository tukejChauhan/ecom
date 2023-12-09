import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast} from "react-toastify";


export const AsyncFetchProducts = createAsyncThunk('products/fetchProducts', async (args, thunkAPI) => {
    fetch("https://my-json-server.typicode.com/tukejChauhan/products/products")
        .then(res => res.json())
        .then(products => {
            thunkAPI.dispatch(actions.setProducts(products))})
    }
);




const initialState = {
    products: [],
    cart: [],
    selectedId: null,
    sorted: false

}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, actions) => {
            state.products = actions.payload;
            
        },
        addToCart: (state, actions) => {
            state.cart = [...state.cart, actions.payload];
            toast.success("Product added to cart successfully");
            
        },
        removeFromCart: (state,actions) => {
            state.cart = [...actions.payload];
            toast.success("Product removed from cart successfully");
        },
        editProduct: (state,actions) => {
            state.selectedId = actions.payload;
        },
        saveChanges: (state,actions) => {
            console.log(actions.payload);
            state.products = actions.payload;
            state.selectedId = null;
            toast.success("Product edited successfully");
        },
        addProduct: (state,actions) => {
            state.products = [...state.products, actions.payload];
            toast.success("Product added successfully");
        },
        deleteProduct: (state,actions) => {
            let products = [...state.products]
            state.products = products.filter((product) => product.id !== actions.payload)
        },
        changeView: (state,actions) => {
            state.sorted = !state.sorted
        }
    }
})  


export const actions = productSlice.actions;

export const productReducer = productSlice.reducer;

export const productsSelector = (state) => state.productReducer;