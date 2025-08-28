import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Construction from "./underConstruction";
import Header from "../components/layout/Header.jsx";
import Login from "../components/features/admin/Login.jsx";



const Home = ({ setLogModal, setOpenLogin, openLogin }) => {
    
    const navigate = useNavigate('')

    const [openBrowse, setOpenBrowse] = useState(false)


    return (
        <>
            <Header />

            <div className="btn-group buttonDiv">
                <button className="btn" onClick={() => setOpenBrowse(true)}>
                    Browse
                </button>

                <div className="vl">
                    <span className="vl-innertext">or</span>
                </div>

                <button className="btn" onClick={() => setOpenLogin(true)}>Login</button>
            </div>

            {openLogin &&
                <Login
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