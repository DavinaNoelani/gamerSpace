import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { createUser } from "../features/user/userSlice";

const UserInfo = ({ userInfo, setUserInfo, setOpenSave }) => {

    const dispatch = useDispatch();



    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [birthday, setBirthday] = useState('')
    const [role, setRole] = useState(false)

    const addUser = (e) => {
        e.preventDefault()
        const newUser = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
            birthday: birthday,
            role: role

        }
        dispatch(createUser(newUser))

        setFirstname("")
        setLastname("")
        setUsername("")
        setPassword("")
        setOpenSave(false)
    }

    useEffect(() => {
        let myInput = document.getElementById("psw");
        let letter = document.getElementById("letter");
        let capital = document.getElementById("capital");
        let number = document.getElementById("number");
        let length = document.getElementById("length");

        // When the user clicks on the password field, show the message box
        myInput.onfocus = function () {
            document.getElementById("message").style.display = "block";
        }

        // When the user clicks outside of the password field, hide the message box
        myInput.onblur = function () {
            document.getElementById("message").style.display = "none";
        }

        // When the user starts to type something inside the password field
        myInput.onkeyup = function () {
            // Validate lowercase letters
            let lowerCaseLetters = /[a-z]/g;
            if (myInput.value.match(lowerCaseLetters)) {
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
            }

            // Validate capital letters
            let upperCaseLetters = /[A-Z]/g;
            if (myInput.value.match(upperCaseLetters)) {
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
            }

            // Validate numbers
            let numbers = /[0-9]/g;
            if (myInput.value.match(numbers)) {
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
            }

            // Validate length
            if (myInput.value.length >= 8) {
                length.classList.remove("invalid");
                length.classList.add("valid");
            } else {
                length.classList.remove("valid");
                length.classList.add("invalid");
            }
        }
    })

    return (
        <>
            <div className="register-container">
                <span className="close-register" onClick={() => setOpenSave(false)}>&times;</span>

                <form className="form-wrapper" action="/new-user" method="post">
                    <h1 className="form-header display-4">Register</h1>

                    <label className="form-row row">
                        <span className='col-lg-1'>&#10168;</span>
                        <input id="firstname" onChange={(e) => setFirstname(e.target.value)} type='text' className='form-input col-lg-11' placeholder="First Name" value={firstname} />
                    </label>


                    <label htmlFor="lastname" className="form-row row">
                        <span className='col-lg-1'>&#10168;</span>
                        <input id="lastname" onChange={(e) => setLastname(e.target.value)} type='text' className='form-input col-lg-11' placeholder="Last Name" value={lastname} />
                    </label>


                    <label htmlFor="username" className="form-row">
                        <span className='col-lg-1'>&#10168;</span>
                        <input id="username" onChange={(e) => setUsername(e.target.value)} type='text' className='form-input col-lg-11' placeholder="Username" value={username} />
                    </label>

                    <label htmlFor="psw" className="form-row">
                        <span className='col-lg-1'>&#10168;</span>
                        <input id="psw"
                            onChange={(e) => setPassword(e.target.value)} type='password'
                            className='form-input col-lg-11'
                            placeholder="Password"
                            value={password}
                            name='psw'
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            required
                        />
                    </label>

                    <div id="message" className='container'>
                        <h3 className="psw-validation">Password must contain the following:</h3>
                        <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
                        <p id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
                        <p id="number" className="invalid">A <b>number</b></p>
                        <p id="length" className="invalid">Minimum <b>8 characters</b></p>
                    </div>

                    <label htmlFor="date" className="form-row row">
                        <span className='col-lg-1'>&#10168;</span>
                        <input id="date" onChange={(e) => setBirthday(e.target.value)} type='date' className="form-input col-lg-11" value={birthday} />
                    </label>

                    <div className="button-wrap center">
                        <button type="button" onClick={(e) => addUser(e)} className="btn ">Save</button>
                    </div>
                </form>



            </div>


        </>
    )
}

export default UserInfo