import './style.css';
import {Link, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AsyncFetchProducts } from '../../features/reducer';
import { productsSelector } from '../../features/reducer';

export default function Navbar(){
    const dispatch = useDispatch();
    const cart = useSelector(productsSelector).cart;
    useEffect(() => {
        dispatch(AsyncFetchProducts());
    },[]);
    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link className='navbar-logo active' to='/'>
                    <img src="https://play-lh.googleusercontent.com/CMYz0470Xn0fFBz5VGC69Gvtd41L07Kz1Te0RQt_woXuPOXa2Wut5J9L6o9RwOm7lwk" />
                </Link>
            
                <ul className='left-nav-menu'>
                    <li className='nav-item active'>
                        <Link className='nav-links active' to='/'>
                            Products
                        </Link>
                    </li>   
                        <li className='nav-item active'>
                        <Link className='nav-links active' to="/addProduct">
                            Add a Product
                            <span><img className="icon-style" src="https://cdn-icons-png.flaticon.com/128/4315/4315609.png" alt="sign-in"></img></span>
                            
                        </Link>
                    </li>

                </ul>
                <ul className='right-nav-menu'>
                     
                        <li className='nav-item active'>
                        <Link className='nav-links active' to="/Cart">
                            <span><img className="icon-style" src="https://cdn-icons-png.flaticon.com/128/2838/2838838.png" alt="sign-in"></img></span>
                            <span className="cart-count">{cart.length}</span>
                            Cart
                        </Link>
                    </li>
                    <li className='nav-item active'>
                        <Link className='nav-links active' to="/Profile">
                        John Doe
                            <span><img className="icon-style" src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="sign-in"></img></span>
                           
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
            <Outlet />
        </>
    )
}