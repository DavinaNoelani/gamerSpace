import { useDispatch,useSelector } from 'react-redux';
import CartItem from "./CartItem.jsx";
import { close, open } from '../../redux/modalSlice.js';
import { clearCart } from '../../redux/cartSlice.js';

const Cart = ({ setItemCount, itemCount, ribbon, setRibbon, item, amount, total }) => {

    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.modal);

    // If the cart is empty, return an empty cart message
    if (amount < 1) {
        return (
            <div className="cart-modal">
                <span className="close-cart" onClick={() => dispatch(close())}>&times;</span>

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

        <div className="cart-modal">
            <span className="close-cart" onClick={() => dispatch(close())}>&times;</span>
            <section className="cart cartDisplay">

                <header>
                    <h2>your bag</h2>
                </header>

                <div>
                    <CartItem
                        isOpen={isOpen}
                        onClose={() => dispatch(close())}
                        key={item.id}
                        item={item}
                        setItemCount={setItemCount}
                        itemCount={itemCount}
                        ribbon={ribbon}
                        setRibbon={setRibbon}
                    />
                </div>

                <footer>
                    <hr className="hrCart" />
                    <div className="cart-total">
                        <h4>
                            total <span>${total.toFixed(2)}</span>
                        </h4>
                    </div>
                    <div className='btn-container'>

                        <button className="btn clear-btn" onClick={() => dispatch(clearCart())}>
                            clear cart
                        </button>
                        <button type="button" className="btn confirm-btn" onClick={() => dispatch(open())}>
                            Checkout
                        </button>

                    </div>
                </footer>
            </section>

        </div>
    )
}

export default Cart