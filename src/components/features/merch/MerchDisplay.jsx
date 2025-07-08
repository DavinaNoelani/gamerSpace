import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../../../redux/cart/cartSlice";
import { getMerch } from '../../../redux/merch/merchSlice';
import hearts from '../../../assets/images/hearts.png'
import Header from "../../layout/Header";
import Zoom from "../../common/Zoom";




const MerchDisplay = ({ setItemCount, itemCount, setRibbon, idForMerch, setId }) => {

    const dispatch = useDispatch();


    const { merch } = useSelector((state) => state.merch);
    // console.log(merch, 'merch')
    const { cartItems, amount } = useSelector((state) => state.cart)

    const { user } = useSelector((state) => state.user)

    const [showFilter, setShowFilter] = useState(false)
    const [hideButton, setHideButton] = useState(true)
    const [search, setSearch] = useState('')
    const [matchesList, setMatchesList] = useState([])
    const [matches, setMatches] = useState(false)
    const [size, setSize] = useState([])
    const [type, setType] = useState('')
    const [imgSrc, setImgSrc] = useState('')
    const [fullView, setFullView] = useState(false)


    const options = ['Select..', 'Apparel', 'Decor', 'Plushy', 'Gifts', 'Limited Edition']


    useEffect(() => {
        if (user) {
            setId(user._id) // Set the user ID for the cart
        }
        // Fetch merch data when the component mounts
        dispatch(getMerch())
    }, [dispatch])

    const showFilterHandle = () => {
        setShowFilter(true)
        setHideButton(false)
    }

    const closeFilter = () => {
        setShowFilter(false)
        setHideButton(true)
        setMatches(false)
    }

    const searchHandle = (e) => {
        let searchList = merch.filter((item) =>
            item.description.toLowerCase().includes(search.toLowerCase()) ||
            item.size.toLowerCase().includes(search.toLowerCase()) ||
            item.ageRange.toLowerCase().includes(search.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.merchType.toLowerCase().includes(search.toLowerCase()))
        if (searchList.length > 0) {
            setMatchesList(searchList)
            setMatches(true)
        } else {
            setMatches(false)
        }
    }

    const filterChange = () => {
        let checkBoxS = document.getElementById('checkboxS')
        let checkBoxM = document.getElementById('checkboxM')
        let checkBoxL = document.getElementById('checkboxL')
        let checkBoxAZ = document.getElementById('checkboxAZ')
        let lowToHigh = document.getElementById('lowToHigh')
        let highToLow = document.getElementById('highToLow')

        if (lowToHigh.checked === true) {
            let priceFilter = merch
                .map((obj) =>
                    ({ id: obj._id, merchType: obj.merchType, name: obj.name, image: obj.image, price: obj.price, description: obj.description }))
                .sort((a, b) => a.price > b.price ? 1 : a.price < b.price ? -1 : 0)
            if (priceFilter.length > 0) {
                setMatchesList(priceFilter)
                setMatches(true)
            } else {
                setMatches(false)
            }
        } else if (highToLow.checked === true) {
            let priceOrder = merch
                .map((obj) =>
                    ({ id: obj._id, merchType: obj.merchType, name: obj.name, image: obj.image, price: obj.price, description: obj.description }))
                .sort((a, b) => a.price < b.price ? 1 : a.price > b.price ? -1 : 0)
            if (priceOrder.length > 0) {
                setMatchesList(priceOrder)
                setMatches(true)
            } else {
                setMatches(false)
            }
        } else if (checkBoxAZ.checked === true) {
            let alphaFilter = merch
                .map((obj) =>
                    ({ id: obj._id, merchType: obj.merchType, name: obj.name, image: obj.image, price: obj.price, description: obj.description }))
                .sort((a, b) => a.name.localeCompare(b.name))
            setMatchesList(alphaFilter)
            setMatches(true)
        } else if (checkBoxS.checked === true || checkBoxM.checked === true || checkBoxL.checked === true) {
            // Filter by all selected sizes
            let selectedSizes = [];
            if (checkBoxS.checked) selectedSizes.push('S');
            if (checkBoxM.checked) selectedSizes.push('M');
            if (checkBoxL.checked) selectedSizes.push('L');
            let sizeList = merch.filter((item) =>
                selectedSizes.map(s => s.toLowerCase()).includes(item.size.toLowerCase())
            );
            if (sizeList.length > 0) {
                setMatchesList(sizeList)
                setMatches(true)
            } else {
                setMatches(false)
            }
        } else if (type && type !== '') {
            let typeList = merch.filter((item) =>
                item.merchType.toLowerCase().includes(type.toLowerCase()))
            if (typeList.length > 0) {
                setMatchesList(typeList)
                setMatches(true)
            } else {
                setMatches(false)
            }
        } else {
            setMatches(false)
        }
    }

    const reset = () => {
        setMatches(false)
        setSearch('')
        setMatchesList([])
        setSize('')
        setType('')
        // Optionally, uncheck all checkboxes and reset select input if needed
        const checkboxes = ['checkboxS', 'checkboxM', 'checkboxL', 'checkboxAZ', 'lowToHigh', 'highToLow'];
        checkboxes.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.checked = false;
        });
        // Reset select input to default option
        const select = document.querySelector('.select-input');
        if (select) select.selectedIndex = 0;
    }

    const addToCartHandle = (id, price, name, img) => {
        setItemCount(itemCount + 1)
        setRibbon(true)

        const addItem = {
            id: id,
            title: name,
            price: price,
            img: img,
            amount: 1
        }
        dispatch(addToCart(addItem))
    }


    const enlargePhoto = (img) => {
        setImgSrc(img)
        setFullView(true)
    }

    return (
        <>
            <div className="content">

                <Header />

                {hideButton && (
                    <div className="text-center">
                        <button className="btn" onClick={showFilterHandle}>Search</button>
                    </div>
                )}


                {showFilter && (
                    <nav className="sidebar block collapse top" style={{ zIndex: 3 }} id='mySideBar'>
                        <span className="close-filter" onClick={closeFilter}>&#9876;</span>
                        <div className="container display-container padding-16">
                            <h3 className="wide text-center">
                                <img src={hearts} style={{ width: '70%' }} alt='logo' />
                            </h3>
                        </div>

                        <div className="padding-64 large text-grey" style={{ fontWeight: 'bold' }}>
                            <h4>Search</h4>
                            <div className="align-input">
                                <input value={search} onChange={(e) => setSearch(e.target.value)} type='text' className="filter-input" />
                                <button className="filter-btn" onClick={searchHandle}>Search</button>
                            </div>
                            <br />
                            <h4>Filter</h4>

                            <h5 className="mt-3">Size</h5>
                            <div className="display-flex">
                                <div className="form-group form-check check-flex">
                                    <input id="checkboxS" className="form-check-input" type='checkbox' value='S' onChange={(e) => setSize(e.target.value)} />
                                    <label htmlFor="checkboxS" className="label form-check-label">S</label>
                                </div>

                                <div className="form-group form-check check-flex">
                                    <input id="checkboxM" className="form-check-input" type='checkbox' value='M' onChange={(e) => setSize(e.target.value)} />
                                    <label htmlFor="checkboxM" className="label form-check-label">M</label>
                                </div>

                                <div className="form-group form-check check-flex">
                                    <input id="checkboxL" className="form-check-input" type='checkbox' value='L' onChange={(e) => setSize(e.target.value)} />
                                    <label htmlFor="checkboxL" className="label form-check-label">L</label>
                                </div>
                            </div>
                            <select className="filter-input select-input" onChange={(e) => setType(e.target.value)} defaultValue="">
                                <option value="" disabled>Select..</option>
                                {options.slice(1).map((option, index) => {
                                    return (
                                        <option key={index + 1} value={option}>
                                            {option}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <h6 className="alpha">Price</h6>
                        <div className="display-flex">
                            <div className="form-group form-check check-flex">
                                <input id="lowToHigh" className="form-check-input" type='checkbox' value='LowToHigh'
                                />
                                <label htmlFor="lowToHigh" className="label form-check-label">Low to High</label>
                            </div>
                            <div className="form-group form-check check-flex">
                                <input id="highToLow" className="form-check-input" type='checkbox' value='HighToLow'
                                />
                                <label htmlFor="highToLow" className="label form-check-label">High to Low</label>
                            </div>
                        </div>

                        <h5>Type</h5>
                        <select className="filter-input select-input" onChange={(e) => setType(e.target.value)}>
                            {options.map((option, index) => {
                                return (
                                    <option key={index} value={option === 'Select..' ? '' : option}>
                                        {option}
                                    </option>
                                )
                            })}
                        </select>


                        <div className="button-group">
                            <button className="filterBtn" onClick={filterChange}>Filter</button>
                            <button className="filterBtn" onClick={reset}>Reset</button>
                        </div>

                    </nav >
                )}

                <div className="container mb-5">
                    {matches && (
                        <div className="row mb-5">
                            {matchesList.map((item, index) => (
                                <div className="col-lg-4 col-sm-6" key={index}>
                                    <div className="card merch-card" style={{ width: '18rem' }} >
                                        <img className="img-fluid merch-img" style={{ width: '100%' }} src={item.image} onClick={() => enlargePhoto(item.image)} />
                                        <div className="h2">{item.name}</div>
                                        <p className="merch-price">${item.price}</p>
                                        <p className="merch-description">{item.description}</p>
                                        <button className="addToCart" onClick={() => addToCartHandle(item.id || item._id, item.price, item.name, item.image)}>Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!matches && (
                        <div className="row my-5">
                            {merch.map((item, index) => (
                                <div className="col-lg-4 col-sm-6" key={index}>
                                    <div className="card merch-card" style={{ width: '18rem' }} >

                                        {/* <div className="imgOverlay-container"> */}
                                        <img className="img-fluid merch-img" style={{ width: '100%' }} src={item.image} onClick={() => enlargePhoto(item.image)} />
                                        {/* <div className="imgOverlay">
                                                <a className="icon" title="Click to See Full Image">
                                                    Zoom
                                                </a>
                                            </div>
                                        </div> */}

                                        <div className="h2">{item.name}</div>
                                        <p className="merch-price">${item.price}</p>
                                        <p className="merch-description">{item.description}</p>
                                        <button className="addToCart" onClick={() => addToCart(item._id, item.price, item.name, item.image)}>Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {fullView && (
                    <>
                        <div className="fullView-container">
                            <span className="close-cart" onClick={() => setFullView(false)}>&times;</span>
                            <div className="fullview-background">
                                <img src={imgSrc} className='imageFull ' alt='item' />
                                <Zoom image={imgSrc} />
                            </div>
                        </div>


                    </>
                )}
            </div>
        </>
    )
}

export default MerchDisplay