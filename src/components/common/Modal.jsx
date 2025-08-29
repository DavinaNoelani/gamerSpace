import { clearCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux/modalSlice';

const Modal = ({ setItemCount, setRibbon }) => {

    const {isOpen} = useSelector((state) => state.modal);
    const dispatch = useDispatch()


    return (
        <aside className='clearCart-modal-container'>
            <div className='clearCart-modal'>
                <h4>Remove all items from your shopping cart?</h4>

                <div className='btn-container'>
                    <button type='button' className='btn confirm-btn'
                        onClick={() => {
                            dispatch(clearCart())
                            setItemCount(0)
                            setRibbon(false)
                        }}
                    >
                        confirm
                    </button>
                    <button type='button' className='btn clear-btn' isOpen={isOpen} onClose={dispatch(close())}>
                        cancel
                    </button>
                </div>
            </div>
        </aside>
    );
};
export default Modal;