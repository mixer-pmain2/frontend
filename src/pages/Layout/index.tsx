import React, {useEffect} from "react"
import {connect} from "react-redux";

import SignInPage from "../Signin";

import {checkUser, logout} from "../../store/actions/user";

import NotificationContainer from "react-notifications/lib/NotificationContainer";
import Loading, {SideLoading, typeLoading} from "../../components/Loading";

import NavMenu from "./NavMenu";
import Progress from "../../components/Progress";

type LayoutProps = {
    children
    user: UserStore
    application: ApplicationStore
    dispatch
    patient: PatientStore
}

function Layout({children, user, application, dispatch, patient}: LayoutProps) {
    useEffect(() => {
        let action = false
        if (!action) {
            if (user?.token) {
                dispatch(checkUser())
            }
        }
        return () => {
            action = true
        }
    }, [dispatch, user?.token])

    const handleLogout = () => dispatch(logout())

    const navMenu = (user, application, patient) =>
        <NavMenu onLogout={handleLogout} user={user} app={application} patient={patient}/>

    return <div className={`container-xxl`}>
        {
            user?.isAuth ? <div>
                <div className="mb-5">
                    {navMenu(user, application, patient)}
                </div>
                {children}
            </div> : <SignInPage/>
        }
        <NotificationContainer/>
        <SideLoading isLoading={application.loading}/>
        <div style={{position: "fixed", bottom: 35, right: 35}}>
            <Loading type={typeLoading.PRIMARY} isLoading={application?.loadingList?.length > 0}/>
        </div>
        {application?.loadingList?.length > 0 && <Progress style={{position: "fixed", top: 0, left: 0, width: "100%"}}/>}
        <footer style={{height: 150}}>

        </footer>
    </div>
}

export default connect((state: RootStore) => ({
    user: state.user,
    application: state.application,
    patient: state.patient
}))(Layout)
