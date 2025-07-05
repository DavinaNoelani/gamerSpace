import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getGames, reset, addComment } from '../features/game/gameSlice';
import avatar from '../images/girl_mountain.jpg';
import { dateConversion } from "../constants/functions";
import Header from "./Header";
import { addToCart, syncCartWithServer } from "../features/cart/cartSlice";
import hearts from '../images/hearts.png';



const GameDisplay = ({ setItemCount, itemCount, setRibbon }) => {

    const dispatch = useDispatch();
    const { games, isError } = useSelector((state) => state.game);
    const [showComments, setShowComments] = useState(false)
    const [message, setMessage] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const [titleSearch, setTitleSearch] = useState('')
    const [consoleSearch, setConsoleSearch] = useState('')
    const [matchesList, setMatchesList] = useState([])
    const [matches, setMatches] = useState(false)
    const [search, setSearch] = useState('')
    const [hideButton, setHideButton] = useState(true)
    // const [showFilter, setShowFilter] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const [fullView, setFullView] = useState(false)
    const cartItems = useSelector((state) => state.cart.cartItems)


    useEffect(() => {
        window.scrollTo(0, 0)

        if (isError) {
            console.log('error');
        }
        dispatch(getGames());

    }, [dispatch, isError])

    const options = ['Select..', 'Wii', 'GameCube', 'Switch', '2DS', '3DS', 'SNES', 'NES']

    const showFilterHandle = () => {
        setShowFilter(true)
        setHideButton(false)
    }

    const postComment = (id, currentArray) => {
        const newComment = {
            message: message,
            date: Date.now()
        }

        const newMessageArray = [...currentArray, newComment]
        const sendToRedux = {
            newComments: newMessageArray,
            id: id
        }
        console.log(sendToRedux, ' sent')

        dispatch(addComment(sendToRedux))
        setMessage('')
    }

    const switchCommentView = () => {
        setShowComments(true)
        setMatches(false)
        setHideButton(false)
    }

    const addToCartHandle = () => {
        setItemCount(itemCount + 1)
        setRibbon(true)
        dispatch(addToCart({
            id: cartItems.length + 1,
            price: cartItems.price,
            title: cartItems.title,
            image: cartItems.image,
            amount: 1
        }))
        dispatch(syncCartWithServer(cartItems))
    }

    const searchHandle = (e) => {
        let searchList = games.filter((item) =>
            item.description.toLowerCase().includes(search.toLowerCase()) ||
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.console.toLowerCase().includes(search.toLowerCase()) ||
            item.rating.toLowerCase().includes(search.toLowerCase()))
        if (searchList.length > 0) {
            setMatchesList(searchList)
            setMatches(true)
        } else {
            setMatches(false)
        }
    }

    const filterChange = () => {
        let checkBox = document.getElementById('checkbox')
        let checkBoxAZ = document.getElementById('checkboxAZ')
        let lowToHigh = document.getElementById('lowToHigh')
        let highToLow = document.getElementById('highToLow')

        if (lowToHigh.checked === true) {
            let priceFilter = games
                .map((obj) =>
                    ({ id: obj._id, console: obj.console, title: obj.title, image: obj.image, price: obj.price, description: obj.description }))
                .sort((a, b) => a.price === b.price ? 0 : a.price < b.price ? 1 : -1)
                .reverse()
            if (priceFilter.length > 0) {
                setMatchesList(priceFilter)
                setMatches(true)
            } else {
                setMatches(false)
            }
        } else if (highToLow.checked === true) {
            let priceOrder = games
                .map((obj) =>
                    ({ id: obj._id, console: obj.console, title: obj.title, image: obj.image, price: obj.price, description: obj.description }))
                .sort((a, b) => a.price === b.price ? 0 : a.price < b.price ? 1 : -1)
            if (priceOrder.length > 0) {
                setMatchesList(priceOrder)
                setMatches(true)
            } else {
                setMatches(false)
            }
        } else if (checkBoxAZ.checked === true) {
            let alphaFilter = games
                .map((obj) =>
                    ({ id: obj._id, console: obj.console, title: obj.title, image: obj.image, price: obj.price, description: obj.description }))
                .sort((a, b) => a.title === b.title ? 0 : a.title < b.title ? 1 : -1)
                .reverse()
            if (alphaFilter.length > 0) {
                setMatchesList(alphaFilter)
                setMatches(true)
            } else {
                setMatches(false)
            }
        } else if (checkBox.checked === true) {
            let titleList = games.filter((item) =>
                item.title.toLowerCase().includes(titleSearch.toLowerCase())
            )
            if (titleList.length > 0) {
                setMatchesList(titleList)
                setMatches(true)
            } else {
                setMatches(false)
            }
        } else {
            let consoleList = games.filter((item) =>
                item.console.toLowerCase().includes(consoleSearch.toLowerCase()))
            if (consoleList.length > 0) {
                setMatchesList(consoleList)
                setMatches(true)
            } else {
                setMatches(false)
            }
        }
    }

    const closeFilter = () => {
        setShowFilter(false)
        setHideButton(true)
        setMatches(false)
    }

    const reset = () => {
        setMatches(false)
        setSearch('')
        window.location.reload(false)
    }

    const enlargePhoto = (img) => {
        setImgSrc(img)
        console.log(imgSrc, 'src')
        setFullView(true)
    }

    return (
        <>
            <div className="content">

                <Header />

                {hideButton && (
                    <div className="text-center">
                        <button className="btn shadow-light rounded-lg" onClick={showFilterHandle}>Search</button>
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
                            <h4>Filter</h4>
                            <div className="align-input">
                                <input value={search} onChange={(e) => setSearch(e.target.value)} type='text' className="filter-input" />
                                <button className="filter-btn" onClick={searchHandle}>Search</button>
                            </div>

                            <h5 className="mt-3">Rating</h5>
                            <div className="display-flex">
                                <div className="form-group form-check check-flex">
                                    <input id="checkbox" className="form-check-input" type='checkbox' value='E' onChange={(e) => setTitleSearch(e.target.value)} />
                                    <label htmlFor="checkbox" className="label form-check-label">Everyone</label>
                                </div>

                                <div className="form-group form-check check-flex">
                                    <input id="checkbox" className="form-check-input" type='checkbox' value='M' onChange={(e) => setTitleSearch(e.target.value)} />
                                    <label htmlFor="checkbox" className="label form-check-label">Mature</label>
                                </div>

                                <div className="form-group form-check check-flex">
                                    <input id="checkbox" className="form-check-input" type='checkbox' value='L' onChange={(e) => setTitleSearch(e.target.value)} />
                                    <label htmlFor="checkbox" className="label form-check-label">Youth</label>
                                </div>
                            </div>

                            <h5>Sort By</h5>
                            <h6 className="alpha">Alphabetical</h6>
                            <div className="display-flex">
                                <div className="form-group form-check check-flex">
                                    <input id="checkboxAZ" className="form-check-input" type='checkbox' value='A-Z'
                                    />
                                    <label htmlFor="checkboxAZ" className="label form-check-label">A-Z</label>
                                </div>
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

                            <h5>Console</h5>
                            <div className="type-container my-3">
                                {/* <label htmlFor="types" className="label form-check-label">Select...</label> */}
                                <select className="filter-input select-input" onChange={(e) => setConsoleSearch(e.target.value)}>
                                    {options.map((option, index) => {
                                        return (
                                            <option key={index}>
                                                {option}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="button-group">
                            <button className="filterBtn" onClick={filterChange}>Filter</button>
                            <button className="filterBtn" onClick={reset}>Reset</button>
                        </div>

                    </nav>
                )}

                <div className="container mb-5">

                    {matches && (
                        <div className="row mb-5">
                            {!showComments && (
                                <>
                                    {/* <div className="card-container"> */}
                                    {matchesList.map(game => (
                                        <div className="col-lg-4 col-md-6 col-sm-6" key={game._id}>
                                            <div className="game-card" style={{ width: '22rem' }}>
                                                <div className="card-body">
                                                    <img className="img-fluid merch-img" alt='game' src={game.image} onClick={() => enlargePhoto(game.image)} />

                                                    <div className="font-on-display game-title">
                                                        {game.title}
                                                    </div>

                                                    <div className="button-wrap grid-item6">
                                                        <button className="btn" onClick={switchCommentView}>
                                                            &#10009; options
                                                        </button>
                                                    </div>

                                                    <br />

                                                    <div className="price-container">
                                                        <div className="font-on-display price-text">
                                                            &#128178; {game.price}
                                                        </div>
                                                        <button data-bs-toggle="tooltip" title="Buy" className="buy-btn" onClick={() => addToCart(game._id, game.price, game.title, game.image)}>&#128722;</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                    {/* </div> */}
                                </>
                            )}

                        </div>
                    )}



                    {!matches && (
                        <div className="row mb-5 mt-4">
                            {!showComments && (
                                <>
                                    {games.map(game => (
                                        <div className="col-lg-4 col-md-6 col-sm-6" key={game._id}>
                                            <div className=" card game-card" style={{ width: '22rem' }}>
                                                <div className="card-body">
                                                    <img className="img-fluid merch-img" alt='game' src={game.image} onClick={() => enlargePhoto(game.image)} />

                                                    <div className="font-on-display game-title">
                                                        {game.title}
                                                    </div>

                                                    <div className="button-wrap grid-item6">
                                                        <button className="btn optionBtn" onClick={switchCommentView}>
                                                            &#10009; options
                                                        </button>
                                                    </div>

                                                    <br />

                                                    <div className="price-container">
                                                        <div className="font-on-display price-text">
                                                            &#128178; {game.price}
                                                        </div>
                                                        <button className="buy-btn" onClick={() => addToCartHandle(game._id, game.price, game.title, game.image)}>&#128722;</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                </>
                            )}

                        </div>
                    )}

                    {fullView && (
                        <div className="fullView-container">
                            <span className="close-cart" onClick={() => setFullView(false)}>&times;</span>
                            <img src={imgSrc} className='gameImageFull' alt='item' />
                        </div>
                    )}


                    {showComments && (
                        <>
                            <div className="text-center mb-5">
                                <button onClick={() => setShowComments(false)} className="btn">
                                    View All
                                </button>
                            </div>

                            <div className="card-container">
                                {games.map(game => (
                                    <div className="card-back" key={game._id}>
                                        <div className="card-body">
                                            <div className="top-card">
                                                <div className="title">
                                                    <h2 className="title-head">
                                                        <i>Title</i>
                                                    </h2>
                                                    <div className="font-on-display">
                                                        {game.title}
                                                    </div>
                                                </div>

                                                <div className="price-container">
                                                    <span id="price-icon">
                                                        &#128178;
                                                    </span>
                                                    <p className="font-on-display">
                                                        {game.price}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="game-image-container">

                                                <div className="console-for-comments row">

                                                    <div className='col-lg-4 col-md-6 col-sm-4'>
                                                        <h2 className="console-head">
                                                            <i>Console</i>
                                                        </h2>
                                                        <p className="font-on-display">
                                                            <span className="console-span">{game.console}</span>
                                                        </p>
                                                    </div>

                                                    <div className='col-lg-4 col-sm-4'>
                                                        <h2 className="description-label">
                                                            Description
                                                        </h2>
                                                        <p className="font-on-display">
                                                            {game.description}
                                                        </p>
                                                    </div>

                                                    <div className="col-lg-4 col-md-6 col-sm-4">
                                                        <img
                                                            className="game-thumbnail2 img-fluid"
                                                            alt='game'
                                                            src={game.image}
                                                        />
                                                    </div>

                                                </div>

                                            </div>

                                            <h2>Comments:</h2>
                                            <div className="comment-container">
                                                <br />
                                                <div className="font-on-display">
                                                    {game.comment.map(item => {
                                                        return (
                                                            <div className="list" key={item._id}>
                                                                <img className="list-img" src={avatar} style={{ width: '90px' }} alt='' />

                                                                <span className="date-font">
                                                                    {dateConversion(item.date)}
                                                                </span>
                                                                <p className="column">{item.message}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <input
                                                className="form-input "
                                                type='text'
                                                cols='30'
                                                rows='10'
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />

                                            <div className="button-wrap grid-item6">
                                                <button className="btn" onClick={() => postComment(game._id, game.comment)}>Send &#128233;</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                </div>

            </div>


        </>
    )

}

export default GameDisplay