import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Filter from "../components/common/Filter";
// import { isOpen } from "../redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMerch } from "../redux/merchSlice";

const sizes = ["S", "M", "L", "XL"]; // add as many as you need

const FilterElements = ({ setId, setItemCount, itemCount, setRibbon, onClose, isOpen }) => {

    const dispatch = useDispatch();
    // const { merch } = useSelector((state) => state.merch);
    const { user } = useSelector((state) => state.user);
    // const [id, setId] = useState(null);


    useEffect(() => {
            if (user) {
                setId(user._id) // Set the user ID for the cart
            }
            // Fetch merch data when the component mounts
            dispatch(getMerch())
        }, [dispatch, user, setId])


    const [itemSizes, setItemSizes] = useState([]);
    const [showFilter, setShowFilter] = useState(false)
    const [hideButton, setHideButton] = useState(true)

    const handleChange = (e) => {
        const value = e.target.value;
        setItemSizes((prev) =>
            prev.includes(value)
                ? prev.filter((size) => size !== value) // remove if unchecked
                : [...prev, value] // add if checked
        );
    };

    const showFilterHandle = () => {
        setShowFilter(true)
        setHideButton(false)
    }

    return (
        <div className='content'>

            <Header />

            {hideButton && (
                <div className="text-center">
                    <button className="btn" onClick={() => showFilterHandle()}>Search</button>
                </div>
            )}

            {showFilter && (
                <Filter
                    itemSizes={itemSizes}
                    setItemSizes={setItemSizes}
                    setItemCount={setItemCount}
                    itemCount={itemCount}
                    setRibbon={setRibbon}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            )}

            {sizes.map((size) => (
                <div className="form-group form-check check-flex" key={size}>
                    <input
                        type='checkbox'
                        className="form-check-input"
                        id={`checkbox${size}`}
                        value={size}
                        checked={itemSizes.includes(size)}
                        onChange={handleChange}
                    />
                    <label htmlFor={size}>{size}</label>
                </div>
            ))}

        </div>
    );
};

export default FilterElements;