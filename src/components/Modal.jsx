import React from 'react';
import { clearCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modalSlice';
import { useDispatch } from 'react-redux';

const Modal = ({setItemCount, setRibbon}) => {

    const dispatch = useDispatch()


    return (
        <aside className='clearCart-modal-container'>
            <div className='clearCart-modal'>
                <h4>Remove all items from your shopping cart?</h4>

                <div className='btn-container'>
                    <button type='button' className='btn confirm-btn'
                        onClick={() => {
                            dispatch(clearCart())
                            dispatch(closeModal())
                            setItemCount(0)
                            setRibbon(false)
                        }}
                    >
                        confirm
                    </button>
                    <button type='button' className='btn clear-btn'
                    onClick={() => {
                        dispatch(closeModal())
                    }}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </aside>
    );
};
export default Modal;