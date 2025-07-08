import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { verifyUser } from "../../../redux/user/userSlice";



const Login = ({ setLogModal, setOpenLogin }) => {

    const { users, isError, isSuccess } = useSelector((state) => state.user)

    const [checkUsername, setCheckUsername] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [logged, setLogged] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        if(isError) {
            setLogged(true)
        }
        if(isSuccess) {
            setLogged(false)
            console.log('success')
        }
    })

    const verify = () => {
        const userToVerify = {
            username: checkUsername,
            password: checkPassword
        }

        dispatch(verifyUser(userToVerify))
    }

    return (
        <>

        {logged && (
            <div className="tinyModal">
                <div>Username &amp; Password does not match</div>
            </div>
        )}
            <div className="login-container">
                <span className="close-login close-register" 
                onClick={() => {
                    setOpenLogin(false)
                    setLogModal(false)
                }}
                >&times;</span>
                <form className="login-wrapper ">

                    <h1 className="form-header display-4">Login</h1>

                    <label className="form-row row">
                        <span className='col-lg-1'>&#10168;</span>
                        <input id="username" onChange={(e) => setCheckUsername(e.target.value)} type='text' className='form-input col-lg-11' placeholder="Username" value={checkUsername} />
                    </label>

                    <label className="form-row row">
                        <span className='col-lg-1'>&#10168;</span>
                        <input id="password" onChange={(e) => setCheckPassword(e.target.value)} type='password' className='form-input col-lg-11' placeholder="Password" value={checkPassword} />
                    </label> 

                    <button onClick={verify} className="btn">Enter</button>

                </form>
            </div>
        </>
    )
}

export default Login