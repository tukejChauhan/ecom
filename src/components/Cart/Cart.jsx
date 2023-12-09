import styles from "./style.module.css";

//importing hooks
import { useSelector, useDispatch } from "react-redux";

//importing necessary methods from productReducer
import { productsSelector, actions } from "../../features/reducer";



export default function Home(){
    const dispatch = useDispatch();
    //accessing cart and total from state using selector hook
    const {cart, total} = useSelector(productsSelector);

    function handleRemove(Product) {
        let index = cart.indexOf(Product);
        let temp = [...cart];
        temp.splice(index, 1);
        dispatch(actions.removeFromCart(temp));
    }
    return(<>
        <div className={styles.cartPage}>
    <div className={styles.productGrid}>
        {cart.map((product) => (
            <div className={styles.productContainer}>
            <div className={styles.imageContainer}><img src={product.image} alt="Product" width="100%" height="100%"/> </div>
            <div className={styles.productDetails}>
                <div className={styles.productName}>
                    <p>{product.title}</p>
                </div>
                <div className={styles.productOptions}>
                <p className={styles.productPrice}>$ {product.price}</p>
                </div>
                    <button className={styles.removeBtn} title="Remove from Cart" onClick={() => handleRemove(product)}>Remove From Cart</button>
                </div>
            </div>
        ))}

        </div>
    </div>
        </>)
}




