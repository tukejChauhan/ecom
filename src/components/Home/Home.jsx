import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {productsSelector, actions} from "../../features/reducer";
import { useEffect,useRef } from "react";




export default function Home(){
    const dispatch = useDispatch();
    const data = useSelector(productsSelector);
    let products;
    if(!data.sorted) products = data.products;
    else {
        products = [...data.products];
        products.sort((a,b) => a.price-b.price);
    }
    console.log("products assigned");
    const nameRef = useRef();
    const priceRef = useRef();
    const desRef = useRef();

    useEffect(()=>{
        if(data.selectedId){
            nameRef.current.value = data.products[data.selectedId-1].title;
            priceRef.current.value = data.products[data.selectedId-1].price;
            desRef.current.value = data.products[data.selectedId-1].description;
        }
    },[data])
    
    function submitHandler(e){
        e.preventDefault();
        
         let products =  data.products.map((product)=> {
            if(product.id === data.selectedId){
                return {
                    ...product,
                "title" : nameRef.current.value,
                "description": desRef.current.value,
                "price": priceRef.current.value,
                }
            }
            return product;
         })
         console.log(products);
        dispatch(actions.saveChanges(products));
    }

    function sortPage(e){
        e.preventDefault();
        dispatch(actions.changeView());
    }

    return(<>
        <div className={styles.HomePage}>
            
            <button className={styles.sortBtn} onClick={sortPage}>{data.sorted? "Remove Sorting":"Sort By Price"}</button>
            <div className={styles.productGrid}>
                {products.map((product) => (<>
                
                    <div className={styles.productContainer} key={product.id}>
                    <div className={styles.imageContainer}><img src={product.image} alt={product.title}></img></div>
                    <div className={styles.product}>
                    {data.selectedId === product.id? 
                    <form onSubmit={(e) => submitHandler(e)} className={styles.form}>
                    <div className={styles.inputArea} >
                    <div className={styles.inputNaP}>
                    <input className={styles.inputBox} ref={nameRef}/>
                    <input className={styles.inputBox} ref = {priceRef}/>
                    </div>
                    <textarea rows="10" cols="50" className={styles.inputBox} ref = {desRef} />
                </div>
                <div className={styles.buttons}>
                <button className={styles.addtocartBtn} title="Add to Cart" onClick={() => dispatch(actions.addToCart(product))}>Add To Cart</button>
                <button className={styles.addtocartBtn} type="submit">Save</button>
                <button className={styles.addtocartBtn}>Delete</button>
                </div>
                </form>
                    :
                    <>
                    <div className={styles.productDetails} >
                    <div className={styles.productNaP}>
                    <div className={styles.productName}><p>{product.title}</p></div>
                    <div className={styles.productPrice}><p>${product.price}</p></div>
                    </div>
                    <div className={styles.productDescription}><p>{product.description}</p></div>
                </div>
                <div className={styles.buttons}>
                <button className={styles.addtocartBtn} title="Add to Cart" onClick={() => dispatch(actions.addToCart(product))}>Add To Cart</button>
                <button className={styles.addtocartBtn} onClick={() => dispatch(actions.editProduct(product.id))}>Edit</button>
                <button className={styles.addtocartBtn} onClick={() => dispatch(actions.deleteProduct(product.id))}>Delete</button>
                </div>  
                </>  
                    }                   
                    
                    </div>
                </div>
                </>))}
                
                
            </div>
        </div>
        </>)
}