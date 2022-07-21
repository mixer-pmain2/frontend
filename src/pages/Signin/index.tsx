import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import * as userAction from "store/actions/user"
import {useNavigate} from "react-router-dom";
import {linkDict} from "routes";
import {PageTitle} from "components/Title";
import {logout} from "store/actions/user";


const SignInPage = ({dispatch}) => {
    const refUsername = useRef<HTMLInputElement>(null)
    const refPassword = useRef<HTMLInputElement>(null)
    const refSubmit = useRef<HTMLInputElement>(null)
    const [error, setError] = useState("")
    const [state, setState] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()

    const onChange = (e) => setState(s => ({
        ...s,
        [e.target.name]: e.target.value
    }))

    const handleSubmit = () => {
        const {username, password} = state
        dispatch(userAction.login({username, password}))
            .then(res => {
                if (res?.success) {
                    navigate(linkDict.start)
                } else {
                    setError(res?.message)
                    dispatch(logout())
                }
            })
    }

    const onKeyDown = (e) => {
        if (e.target.name === 'username' && ["NumpadEnter", "Enter"].indexOf(e.code) + 1) {
            if (refPassword && refPassword.current)
                refPassword.current.focus()
        }
        if (e.target.name === 'password' && ["NumpadEnter", "Enter"].indexOf(e.code) + 1) {
            if (refSubmit && refSubmit.current)
                refSubmit.current.focus()
        }
        if (e.code === 'Escape') {
            if (refUsername && refUsername.current)
                refUsername.current.focus()
        }
    }

    useEffect(() => {
        let action = false
        const usernameI = document.querySelector("[name='username']")
        const passwordI = document.querySelector("[name='password']")

        if (!action) {
            usernameI.addEventListener("keydown", onKeyDown);
            passwordI.addEventListener("keydown", onKeyDown);
            document.addEventListener("keydown", onKeyDown);
        }

        return () => {
            action = true
            usernameI.removeEventListener("keydown", onKeyDown);
            passwordI.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keydown", onKeyDown);
        }
    }, [])

    return <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh"}}>
        <div style={{width: "100%", maxWidth: 400}}>
            <PageTitle title={"Авторизация"}/>
            {/*<form onSubmit={handleSubmit}  autoComplete="off">*/}
            <div className="input-group mb-3">
                <span className="input-group-text" style={{width: 100}}>Логин</span>
                <input
                    ref={refUsername}
                    onChange={onChange}
                    type="text" className="form-control" placeholder="Username" aria-label="Username"
                    aria-describedby="username" name="username" id="username" autoComplete={"off"}
                    value={state.username}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" style={{width: 100}}>Пароль</span>
                <input
                    ref={refPassword}
                    onChange={onChange}
                    type="password" className="form-control" placeholder="Password" aria-label="Password"
                    aria-describedby="password" name="password" id="password" autoComplete={"off"}
                    value={state.password}
                />
            </div>
            <div className="text-danger">
                {error}
            </div>
            <input
                ref={refSubmit}
                type="submit" onClick={handleSubmit} className="form-control btn btn-outline-primary"
                value="Вход"
            />
            {/*</form>*/}
        </div>
    </div>
}

export default connect((state) => ({}))(SignInPage)
