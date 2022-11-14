import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect( () =>{
        console.log('products load before fetch');
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        .then(res=> res.json())
        .then(data => {
            setProducts(data);
            console.log("local storage loaded")
        })
    },[]);

    useEffect(()=>{
        console.log('local storage first line');
     const storedCart = getStoredCart();
     const savedCart = [];

     for(const id in storedCart ){
        const addedProduct = products.find(product => product.id === id);
             if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                //console.log(addedProduct);
             }
     } 
     setCart(savedCart);
     console.log('local storage load finished');
    }, [products])

    const handleAddToCart = (product)=>{
        console.log(product);
        // cart.push(product); wrong dont do this
        const newCart = [...cart, product]
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
           <div className="products-container">
            {
                products.map(product=><Product 
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    ></Product>)
            }
           </div>
           <div className="cart-container">
            <Cart cart={cart}></Cart>
           </div>
        </div>
    );
};

export default Shop;