import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from "../../redux/modal/modalSlice";
import CartItem from "./CartItem.jsx";

const Cart = ({ setOpenCart, idForMerch, itemCount, setItemCount, ribbon, setRibbon }) => {

    const dispatch = useDispatch();
    const { cartItems, total, amount } = useSelector((state) => state.cart)
    console.log(cartItems, 'cartItems')


    if (amount < 1) {
        return (
            <div className="cart-modal">
                <span className="close-cart" onClick={() => setOpenCart(false)}>&times;</span>

                <section className="cart cartDisplay">
                    <header className="cart-header">
                        <h2>your bag</h2>
                        <h4 className="empty-cart">is currently empty</h4>
                    </header>
                </section>
            </div>
        )
    }


    return (

        <>
            <div className="cart-modal">
                <span className="close-cart" onClick={() => setOpenCart(false)}>&times;</span>
                <section className="cart cartDisplay">

                    <header>
                        <h2>your bag</h2>
                    </header>

                    <div>
                        {cartItems.map((item) => {
                            return <CartItem
                                key={item.id}
                                id={item._id}
                                title={item.title}
                                price={item.price}
                                img={item.image}
                                amount={item.amount}/>;
                        })}
                    </div>


                    <CartItem
                        id={idForMerch}
                        itemCount={itemCount}
                        setItemCount={setItemCount}
                        ribbon={ribbon}
                        setRibbon={setRibbon}
                    />

                    <footer>
                        <hr className="hrCart" />
                        <div className="cart-total">
                            <h4>
                                total <span>${total.toFixed(2)}</span>
                            </h4>
                        </div>
                        <div className='btn-container'>

                            <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
                                clear cart
                            </button>
                            <button type="button" className="btn confirm-btn" onClick={() => dispatch(openModal())}>
                                Checkout
                            </button>

                        </div>
                    </footer>
                </section>

            </div>
        </>
    )
}

export default Cart