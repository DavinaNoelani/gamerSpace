import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Construction from "./underConstruction";
import Header from "../components/layout/Header.jsx";
import Login from "../components/features/admin/Login.jsx";
import { close } from '../redux/modalSlice.js';



const Home = ({ setLogModal, setOpenLogin, openLogin }) => {

    const { isOpen } = useSelector((state) => state.modal);

    const navigate = useNavigate('')
    const dispatch = useDispatch();

    const [openBrowse, setOpenBrowse] = useState(false)


    return (
        <>
            <Header />

            <div className="btn-group buttonDiv">
                {/* <button className="btn" onClick={() => setOpenBrowse(true)}> */}

                <button className="btn" onClick={() => {setOpenBrowse(true); dispatch(close())}}>
                    Browse
                </button>

                <div className="vl">
                    <span className="vl-innertext">or</span>
                </div>

                <button className="btn" onClick={() => {dispatch(close()); setOpenLogin(true)}}>Login</button>
            </div>

            {openLogin &&
                <Login
                    isOpen={isOpen}
                    onClose={() => dispatch(close())}
                    setOpenLogin={setOpenLogin}
                    setLogModal={setLogModal}
                />
            }

            {openBrowse &&
                <div className="browse-container">
                    <span onClick={() => setOpenBrowse(false)} className="close-browse">
                        {/* close */}
                        &#8630;
                        </span>
                    <div className="browse-content">
                        <div className="group">
                            <button className="btn browse-btns" onClick={() => navigate('/games')}>Games</button>
                            <button className="btn browse-btns" onClick={() => navigate('/merch')}>Merch</button>

                        </div>

                    </div>
                </div>
            }

        </>
    )
}

export default Home