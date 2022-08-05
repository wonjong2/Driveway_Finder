import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
// import { useStoreContext } from "../../utils/GlobalState";
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";


function DrivewayItem(item) {
    // const [state, dispatch] = useStoreContext();

    const {
        _id,
        address,
        description,
        rules,
        image,
        price,
        availableDate,
        startTime,
        endTime
    } = item;

    // const addToCart = () => {
    //     const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    //     if (itemInCart) {
    //         dispatch({
    //             type: UPDATE_CART_QUANTITY,
    //             _id: _id,
    //             purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    //         });
    //         idbPromise('cart', 'put', {
    //             ...itemInCart,
    //             purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    //         });
    //     } else {
    //         dispatch({
    //             type: ADD_TO_CART,
    //             product: { ...item, purchaseQuantity: 1 }
    //         });
    //         idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    //     }
    // }

    return (
        <div className="card px-1 py-1">
            <Link to={`/driveway/${_id}`}>
                <img
                    alt={address}
                    src={`/images/${image}`}
                />
                <p>{address}</p>
            </Link>
            <div>
                <div>Abailable on {availableDate}</div>
                <span>${price} / hour</span>
            </div>
            {/* <button onClick={addToCart}>Add to cart</button> */}
        </div>
    );
}

export default DrivewayItem;