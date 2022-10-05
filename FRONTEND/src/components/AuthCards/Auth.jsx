import React, { useState } from "react";
import Logo from "../../media/logo.png";
import axios from 'axios';
import { useCookies } from 'react-cookie'
import "./auth.css";
import "@fontsource/mulish";
import "@fontsource/inter";

const authUrl = 'https://api.insights-club-vitb.ml/auth'

function SignInCard({ changeCard, handleClick, closeModal }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [InvalidInput, setInvalid] = useState(false)
    const [DNE, setDNE] = useState(false) // user does not exist
    const [_, setCookies] = useCookies()

    return (
        <div className="auth-card" onClick={handleClick}>
            <h2 className="auth-card-heading">
                Hey ! Welcome back
            </h2>
            <div className="auth-card-content">
                <img src={Logo} alt="Insights club" className="auth-card-brand" />
                <div className="auth-card-form">
                    <label htmlFor="username" className="auth-field-heading">Username</label>
                    <input id="username" type="text" className={"auth-input-field " +
                        (InvalidInput ? 'invalid-input' : '') + (DNE ? 'invalid-input' : '')}
                        autoComplete="false" value={username}
                        onChange={(e) => { setUsername(e.target.value) }} />

                    <label htmlFor="password" className="auth-field-heading">Enter Password</label>
                    <input id="password" type="password" className={"auth-input-field " +
                        (InvalidInput ? 'invalid-input' : '')} value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />

                    <button className="auth-card-muted-button"
                        onClick={() => {
                            changeCard('ForgotPassword')
                        }}>
                        Forgot Password?
                    </button>
                    <div className="auth-card-button-group">
                        <button className="auth-card-primary-button"
                            onClick={() => {
                                if (/^[a-zA-Z0-9]+$/.test(username))
                                    axios.post(`${authUrl}/signin`, { username, password },
                                        { withCredentials: true })
                                        .then((data) => {
                                            // logged in close the modal
                                            console.log(data.data)
                                            // THIS SIMPLY UPDATES COOKIES VARIBALE FOR THE OTHER COMPONENTS
                                            setCookies('TO_REFRESH_COOKIES', `This simply updates the cookies variable !! ${Math.random()}`, {sameSite: 'none', secure: 'true'})
                                            closeModal()
                                        })
                                        .catch((err) => {
                                            console.error(err.response)
                                            if (err.response.status === 404) {
                                                setDNE(true)
                                            }
                                            if (err.response.status === 400) {
                                                setDNE(false)
                                                setInvalid(true)
                                            }
                                        })
                                else {
                                    // such a user cant even sign up ! hence it does not exist
                                    setDNE(true)
                                }
                            }}>Log in</button>
                        <button className="auth-card-secondary-button"
                            onClick={
                                () => {
                                    changeCard('SignUp')
                                }}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SignUpCard({ changeCard, handleClick }) {
    const [name, setName] = useState('')
    const [deptID, setDeptID] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confpassword, setConfPassword] = useState('')

    const [errUsername, setErrUsrnm] = useState(false)
    const [errPassword, setErrPsswd] = useState(false)
    const [errEmail, setErrMail] = useState(false)

    return (
        <div className="auth-card" onClick={handleClick}>
            <h2 className="auth-card-heading">
                Sign up for news and updates
            </h2>
            <div className="auth-card-content">
                <img src={Logo} alt="Insights club" className="auth-card-brand" />
                <div className="auth-card-form">
                    <label htmlFor="fullname" className="auth-field-heading">Full name</label>
                    <input id="fullname" type="text" className="auth-input-field" autoComplete="off"
                        value={name} onChange={(e) => { setName(e.target.value) }} />

                    <label htmlFor="username" className="auth-field-heading">Username</label>
                    <input id="username" type="text" className={"auth-input-field " +
                        (errUsername ? 'invalid-input' : '')} autoComplete="off"
                        value={username} onChange={(e) => { setUsername(e.target.value) }} />

                    <label htmlFor="email" className="auth-field-heading">Email</label>
                    <input id="email" type="email" className={"auth-input-field " +
                        (errEmail ? 'invalid-input' : '')} autoComplete="false"
                        value={email} onChange={(e) => { setEmail(e.target.value) }} />

                    <label htmlFor="password" className="auth-field-heading">Enter Password</label>
                    <input id="password" type="password" className={"auth-input-field " +
                        (errPassword ? 'invalid-input' : '')}
                        value={password} onChange={(e) => { setPassword(e.target.value) }} />

                    <label htmlFor="confpassword" className="auth-field-heading">Confirm Password</label>
                    <input id="confpassword" type="password" className={"auth-input-field " +
                        (errPassword ? 'invalid-input' : '')}
                        value={confpassword} onChange={(e) => { setConfPassword(e.target.value) }} />

                    <label htmlFor="deptID" className="auth-field-heading">
                        Dept. for core members
                    </label>
                    <input id="deptID" type="text" className="auth-input-field"
                        placeholder="optional" autoComplete="false"
                        value={deptID} onChange={(e) => { setDeptID(e.target.value) }} />

                    <div className="auth-card-button-group">
                        <button className="auth-card-primary-button"
                            onClick={() => {
                                let pass = true
                                if (!(/^[a-zA-Z0-9]+$/.test(username))) {
                                    pass = false
                                    setErrUsrnm(true)
                                }
                                if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
                                    pass = false
                                    setErrMail(true)
                                }
                                if (password !== confpassword || password.trim() === '') {
                                    pass = false
                                    setErrPsswd(true)
                                }
                                if (pass) {
                                    axios.post(`${authUrl}/signup`,
                                        { name, username, email, password, department: deptID },
                                        { withCredentials: true })
                                        .then((data) => {
                                            console.log(data.data)
                                            changeCard('SignIn')
                                        })
                                        .catch((err) => {
                                            console.error(err.response)
                                            if (err.response.status === 409) {
                                                if (err.response.data.message.includes('email')) {
                                                    setErrMail(true)
                                                    setErrPsswd(false)
                                                    setErrUsrnm(false)
                                                } else if (err.response.data.message.includes('username')) {
                                                    setErrUsrnm(true)
                                                    setErrPsswd(false)
                                                    setErrMail(false)
                                                }
                                            }
                                        })
                                }
                            }}>Sign Up</button>
                        <button className="auth-card-secondary-button"
                            onClick={
                                () => {
                                    changeCard('SignIn')
                                }}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ForgotPasswordCard({ changeCard, handleClick, closeModal }) {
    const [email, setEmail] = useState('')
    const [errEmail, setErrMail] = useState(false)
    return (
        <div className="auth-card" onClick={handleClick}>
            <h2 className="auth-card-heading">
                Password reset link will be emailed
            </h2>
            <div className="auth-card-content">
                <img src={Logo} alt="Insights club" className="auth-card-brand" />
                <div className="auth-card-form">
                    <label htmlFor="email" className="auth-field-heading">Registered Email</label>
                    <input id="email" type="email" className={"auth-input-field " + (errEmail ? 'invalid-input' : '')}
                        value={email} onChange={(e) => { setEmail(e.target.value) }} />

                    <button className="auth-card-muted-button"
                        onClick={() => {
                            changeCard('SignUp')
                        }}>
                        Haven't signed up?
                    </button>
                    <div className="auth-card-button-group">
                        <button className="auth-card-primary-button"
                            onClick={() => {
                                if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
                                    console.error('Invalid email address')
                                    setErrMail(true)
                                } else axios.post(`${authUrl}/resetPassword`, { email },
                                    { withCredentials: true })
                                    .then((data) => {
                                        console.log(data.data)
                                        closeModal()
                                    })
                                    .catch((err) => {
                                        setErrMail(true)
                                        if (err.response.status === 400) {
                                            console.error('Email not verified !!')
                                        } else if (err.response.status === 404) {
                                            console.error('This email id is not registered !!')
                                        }
                                    })

                            }}>Send</button>
                        <button className="auth-card-secondary-button"
                            onClick={
                                () => {
                                    changeCard('SignIn')
                                }}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AuthModal({ displayModal, authPage }) {
    if (authPage == undefined || authPage == null)
        authPage = 'SignIn'
    const [authCard, setAuthCard] = useState(authPage)

    const insideClick = (e) => {
        // prevents the modal from closing when user has clicked somewhere inside it
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return false;
    }

    if (authCard === 'SignUp')
        return (
            <div className="modal-root" onClick={() => { displayModal(false) }}>
                <SignUpCard changeCard={setAuthCard}
                    handleClick={insideClick} closeModal={() => { displayModal(false) }} />
            </div>
        )
    else if (authCard === 'ForgotPassword')
        return (
            <div className="modal-root" onClick={() => { displayModal(false) }}>
                <ForgotPasswordCard changeCard={setAuthCard}
                    handleClick={insideClick} closeModal={() => { displayModal(false) }} />
            </div>
        )
    else
        // if (authCard === 'SignIn')
        return (
            <div className="modal-root" onClick={() => { displayModal(false) }}>
                <SignInCard changeCard={setAuthCard}
                    handleClick={insideClick} closeModal={() => { displayModal(false) }} />
            </div>
        )
}

export default AuthModal