import React from "react";
import {connect} from "react-redux";

import * as userAction from "../../store/actions/user"
import {useNavigate} from "react-router-dom";
import {linkDict} from "../../routes";
import {PageTitle} from "../../components/Title";

const SignInPage = ({dispatch}) => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const [username, password] = e.target
        dispatch(userAction.signIn({
            username: username.value,
            password: password.value
        }))
            .then(res => {
                if (res?.id) {
                    navigate(linkDict.start)
                }
            })
    }

    return <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh"}}>
        <div style={{width: "100%", maxWidth: 400}}>
            <PageTitle title={"Авторизация"}/>
            <form onSubmit={handleSubmit}  autoComplete="off">
                <div className="input-group mb-3">
                    <span className="input-group-text" style={{width: 100}}>Логин</span>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="username" name="username" id="username" autoComplete={"off"}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" style={{width: 100}}>Пароль</span>
                    <input type="password" className="form-control" placeholder="Password" aria-label="Password"
                           aria-describedby="password" name="password" id="password" autoComplete={"off"}/>
                </div>
                <input type="submit" className="form-control btn btn-outline-primary" value="Вход"/>
            </form>
        </div>
    </div>
}

export default connect((state) => ({}))(SignInPage)
