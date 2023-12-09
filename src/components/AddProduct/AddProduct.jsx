import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsSelector, actions } from "../../features/reducer";
import { redirect } from "react-router-dom";

import styles from "./AddProduct.module.css";

function AddAProduct(){
    const dispatch = useDispatch();
    const data = useSelector(productsSelector);
    const titleRef = useRef();
    const priceRef = useRef();
    const desRef = useRef();
    const imgRef = useRef();


    function reset(){
        titleRef.current.value = "";
        priceRef.current.value = "";
        imgRef.current.value = "";
        desRef.current.value = "";
    }

    function handleSubmit(e){
        e.preventDefault();
        let product = {
            "id" : data.products.length + 1,
            "title" : titleRef.current.value,
            "price" : priceRef.current.value,
            "image" : imgRef.current.value,
            "description" : desRef.current.value
        }
        dispatch(actions.addProduct(product));
        reset();
        return redirect("/");

        

    }
    return(
        <>
        <div className={styles.addProductPage}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <p className={styles.formText}>Enter Product Details</p>
        <input placeholder="Product Title" ref={titleRef} className={styles.inputBox}></input>
        <input placeholder="Product Price" ref={priceRef} className={styles.inputBox}></input>
        <textarea placeholder="Product Description" ref={desRef} className={styles.inputBox}></textarea>
        <input placeholder="Image Url" ref={imgRef} className={styles.inputBox}></input>
        <button className={styles.button}>Add Product</button>
        </form>
        </div>
        </>
    )
}

export default AddAProduct;