import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Nav from './components/layout/Nav';
import Admin from './components/features/admin/Admin.jsx';
import UserInfo from './components/features/admin/UserInfo.jsx';
import GameDisplay from './components/features/games/GameDisplay.jsx';
import MerchDisplay from './components/features/merch/MerchDisplay.jsx';
import Footer from './components/layout/Footer.jsx';
import SideNav from './components/layout/SideNav.jsx';
import Modal from './components/common/Modal.jsx';
import Blog from './pages/Blog.jsx';
import { useSelector, useDispatch } from 'react-redux';
import Zoom from './components/common/Zoom.jsx';
import { close } from './redux/modalSlice.js';
// import FilterElements from './pages/FilterElements.jsx';




const App = () => {


    const dispatch = useDispatch();

    const { isOpen } = useSelector((state) => state.modal);

    const [theme, setTheme] = useState('')
    const [userInfo, setUserInfo] = useState([])
    const [openSave, setOpenSave] = useState(false)
    const [itemCount, setItemCount] = useState(0)
    const [ribbon, setRibbon] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [cart, setCart] = useState([0])
    const [idForMerch, setId] = useState('')
    const [logModal, setLogModal] = useState(false)
    const [openLogin, setOpenLogin] = useState(false);







    return (
        <>
            <div id={theme} className='app'>
                <Router>
                    <Nav
                        isOpen={isOpen}
                        onClose={() => dispatch(close())}
                        theme={theme}
                        setTheme={setTheme}
                        openSave={openSave}
                        setOpenSave={setOpenSave}
                        itemCount={itemCount}
                        setItemCount={setItemCount}
                        ribbon={ribbon}
                        setRibbon={setRibbon}
                        openCart={openCart}
                        setOpenCart={setOpenCart}
                        logModal={logModal}
                        setLogModal={setLogModal}
                        openLogin={openLogin}
                        setOpenLogin={setOpenLogin}
                        openModal={isOpen}
                    />

                    <SideNav />

                    {isOpen &&
                        <Modal
                            itemCount={itemCount}
                            setItemCount={setItemCount}
                            ribbon={ribbon}
                            setRibbon={setRibbon}
                            setOpenCart={setOpenCart}
                            openCart={openCart}
                        />
                    }

                    <Routes>
                        <Route path='/'
                            element={
                                <Home
                                    isOpen={isOpen}
                                    onClose={() => dispatch(close())}
                                    theme={theme}
                                    setTheme={setTheme}
                                    logModal={logModal}
                                    setLogModal={setLogModal}
                                    openLogin={openLogin}
                                    setOpenLogin={setOpenLogin}
                                />}
                        />

                        <Route
                            path='/admin'
                            element={
                                <Admin
                                    isOpen={isOpen}
                                    onClose={() => dispatch(close())}
                                    userInfo={userInfo}
                                    setUserInfo={setUserInfo}
                                    openSave={openSave}
                                    setOpenSave={setOpenSave}
                                    itemCount={itemCount}
                                    setItemCount={setItemCount}
                                    ribbon={ribbon}
                                    setRibbon={setRibbon}
                                    cart={cart}
                                    setCart={setCart}
                                    idForMerch={idForMerch}
                                    setId={setId}
                                />
                            }
                        />

                        <Route
                            path='/add-user'
                            element={
                                <UserInfo
                                    isOpen={isOpen}
                                    onClose={() => dispatch(close())}
                                    userInfo={userInfo}
                                    setUserInfo={setUserInfo}
                                />
                            } />

                        <Route
                            path='/games'
                            element={
                                <GameDisplay
                                    isOpen={isOpen}
                                    onClose={() => dispatch(close())}
                                    itemCount={itemCount}
                                    setItemCount={setItemCount}
                                    ribbon={ribbon}
                                    setRibbon={setRibbon}
                                    cart={cart}
                                    setCart={setCart}
                                />
                            }
                        />

                        <Route
                            path='/merch'
                            element={
                                <MerchDisplay
                                    isOpen={isOpen}
                                    onClose={() => dispatch(close())}
                                    itemCount={itemCount}
                                    setItemCount={setItemCount}
                                    ribbon={ribbon}
                                    setRibbon={setRibbon}
                                    cart={cart}
                                    setCart={setCart}
                                    idForMerch={idForMerch}
                                    setId={setId}
                                />
                            }
                        />
                        {/* <Route
                            path='/filter'
                            element={
                                <FilterElements
                                    isOpen={isOpen}
                                    onClose={() => dispatch(close())}
                                    itemCount={itemCount}
                                    setItemCount={setItemCount}
                                    ribbon={ribbon}
                                    setRibbon={setRibbon}
                                    cart={cart}
                                    setCart={setCart}
                                    idForMerch={idForMerch}
                                    setId={setId}
                                />
                            }
                        /> */}

                        <Route
                            path='/blog'
                            element={
                                <Blog

                                />
                            }
                        />

                        <Route
                            path='/search'
                            element={
                                <Zoom

                                />
                            }
                        />

                    </Routes>

                    <Footer />
                </Router>


            </div>

        </>
    );
}

export default App;
