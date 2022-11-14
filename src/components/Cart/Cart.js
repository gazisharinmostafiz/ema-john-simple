import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const {cart} = props;
    // console.log(cart);
    let total = 0;
    let shipping = 0;
    for(const product of cart){
        total = total + product.price;
        shipping = shipping + product.shipping;
    }
    const tax = (total * (10 /100)).toFixed(2); // decimal fixed
    const grandTotal = total + shipping + parseFloat( tax);
    return (
        <div className='cart'>
             <h3>Order summary</h3>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price : ${total} </p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: {tax}</p>
            <h5>Grand Total:{grandTotal.toFixed(2)}</h5>
        </div>
    );
};

export default Cart;