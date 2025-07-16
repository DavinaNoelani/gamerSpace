import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from '../../assets/icons.js';
import { removeItem, increase, decrease } from '../../redux/cart/cartSlice.js';


const CartItem = ({ item, setItemCount, itemCount, ribbon, setRibbon }) => {

    const dispatch = useDispatch()

    const remove = () => {
        setItemCount(itemCount - 1)
        if (itemCount === 0) {
            setRibbon(false)
            console.log(ribbon, 'ribbon')
        }
    }

    return (
        <>

            <article className='cart-item'>
                <img src={item.img} alt={item.title} className='photos img-fluid' />

                <div>
                    <h4>{item.title}</h4>
                    <h4 className='item-price'>${item.price}</h4>
                    <button
                        className='remove-btn'
                        onClick={() => {
                            dispatch(removeItem(item.id))
                            remove()
                        }}
                    >
                        remove
                    </button>
                </div>

                <div>

                    <button className='amount-btn' onClick={() => dispatch(increase(item.id))}>
                        <ChevronUp />
                    </button>

                    <p className='amount'>{item.amount}</p>

                    <button className='amount-btn' onClick={() => {
                            if (item.amount === 1) {
                                dispatch(removeItem(item.id))
                                return;
                            }
                            dispatch(decrease(item.id))
                        }}
                    >
                        <ChevronDown />
                    </button>
                </div>
            </article>
        </>
    );
};

export default CartItem;