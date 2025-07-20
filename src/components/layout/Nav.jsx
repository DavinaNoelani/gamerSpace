import React, { useState } from "react";
import { Link } from 'react-router-dom';
import UserInfo from "../features/admin/UserInfo.jsx";
import Cart from "../cart/Cart";
import Login from "../features/admin/Login.jsx";
import pokeball from '../../assets/images/pokeball.png'
import hearts from '../../assets/images/hearts.png'


const Nav = ({ setTheme,
    openSave, setOpenSave,
    itemCount, setItemCount,
    ribbon, setRibbon,
    openCart, setOpenCart,
    cart, logModal, setLogModal,
    setOpenLogin
}) => {


    const [switchLog, setSwitchLog] = useState(true)



    const randomize = () => {
        const colors = ['sunset', 'blueGreen', 'red', 'green', 'black', 'redBlack', 'pinkPurple']
        let index = Math.floor(Math.random() * colors.length)
        let choice = colors[index]
        setTheme(choice)
    }

    return (
        <>
            <div className="topNav-main">
                <div className="top-navigation">
                    <div className="menu">
                        <Link to='/' className="nav-link">
                            <img className="goBackHome" alt="Home Page" src={hearts} data-bs-toggle="tooltip" title="Home" />
                        </Link>
                        <Link to='/games' className="nav-link">Games</Link>
                        <Link to='/merch' className="nav-link">Merch</Link>
                    </div>

                    <div className="submenu">
                        <button data-bs-toggle="tooltip" title="Theme" onClick={randomize} className="poke">
                            <img alt="Randomized theme switcher" className="pokeImg" src={pokeball} />
                        </button>

                        <button
                            onClick={() => setOpenSave(true)}
                            data-bs-toggle="tooltip"
                            className="register-btn"
                            title="Register"
                        >
                            &#10012;
                        </button>

                        <br />


                        {switchLog && (
                            <>
                                <button className="optionBtn log-btn btn"
                                    onClick={() => {
                                        setSwitchLog(false)
                                        setLogModal(true)
                                    }}
                                >
                                    LogIn
                                </button>
                            </>
                        )}

                        {!switchLog && (
                            <>
                                <button className="log-btn btn" onClick={() => setSwitchLog(true)}>Quit</button>
                            </>
                        )}

                        <button onClick={() => setOpenCart(true)} className="topCorner">
                            &#128722;
                            {ribbon && <span className="buyRibbon">{itemCount}</span>}
                        </button>
                    </div>


                </div>
            </div>

            {openCart &&
                <Cart
                    openCart={openCart}
                    setOpenCart={setOpenCart}
                    cart={cart}
                    itemCount={itemCount}
                    setItemCount={setItemCount}
                    ribbon={ribbon}
                    setRibbon={setRibbon}
                />
            }

            {openSave && (
                <UserInfo
                    setOpenSave={setOpenSave}
                />
            )}

            {logModal &&
                <Login
                    setOpenLogin={setOpenLogin}
                    setLogModal={setLogModal}
                />}
        </>
    )
}

export default Nav