import React from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart';
import AddAProduct from './components/AddProduct/AddProduct';
import Error from './components/Error/Error';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element: <Navbar />, children: [
    {index: true, element: <Home />},
    {path: "/cart", element:<Cart /> },
    {path: "/addProduct", element: <AddAProduct />}
  ],
errorElement: <Error/>}
])


function App() {
  return (
    <>
    <ToastContainer />
    <div className="App">
      
     <RouterProvider router={router}/>  
    </div>
    </>
  );
}

export default App;
