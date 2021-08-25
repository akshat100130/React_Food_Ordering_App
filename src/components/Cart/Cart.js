import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props =>{
    const CartCtx = useContext(CartContext);

    const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
    const hasItems = CartCtx.items.length > 1;

    const cartItemAddHandler = item => {
        CartCtx.addItem({...item, amount:1});
    }
    const cartItemRemoveHandler = id => {
        CartCtx.removeItem(id);
    }

    const cartItems = (<ul className={classes['cart-items']}>
        {CartCtx.items.map( item => 
        <li><CartItem 
        key={item.id} 
        price={item.price} 
        name={item.name} 
        amount={item.amount} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddHandler.bind(null, item)}/></li>
        )}
    </ul>
    );

    return(
        <Modal onClosee={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;