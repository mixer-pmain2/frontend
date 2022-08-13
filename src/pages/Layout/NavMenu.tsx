import React, {memo} from "react";
import {Link} from "react-router-dom";

import {linkDict} from "../../routes";

import {capitalizeFirstLetter} from "utility/string";
import {accessPage, isAccessed, isAccessedPage} from "configs/access";
import {UnitName} from "consts/user";


type NavMenuProps = {
    onLogout?
    user: UserStore,
    app: ApplicationStore,
    patient: PatientStore
}

const NavMenu = ({onLogout, user, app, patient}: NavMenuProps) => {
    const uUnit = user?.unit
    const uAccess = user?.access ? user?.access[user?.unit] : 0

    const urlPatient = () =>
        linkDict.patient.replace(/:id/g, patient.id.toString())

    const fio = capitalizeFirstLetter(user?.lname?.toLowerCase()) + " "
        + capitalizeFirstLetter(user?.fname?.toLowerCase())[0] + "."
        + capitalizeFirstLetter(user?.sname?.toLowerCase())[0] + "."

    return <nav className="navbar navbar-expand-lg navbar-light app-navbar">
        <div className="container-fluid">
            <Link to={linkDict.start} className="navbar-brand">PMain2 Web</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {user.unit && <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            {UnitName[user?.unit]}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <Link to={linkDict.findPatient} className="dropdown-item">Поиск пациента</Link>
                            </li>
                            <li>
                                <Link to={linkDict.findPatientByAddress} className="dropdown-item">Поиск по адресу</Link>
                            </li>
                            {isAccessedPage(accessPage.newPatient, user) && <li>
                                <Link to={linkDict.newPatient} className="dropdown-item">Новый пациент</Link>
                            </li>}
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            {
                                patient?.id && <>
                                    <li className="nav-item">
                                        <Link to={urlPatient()}
                                              className="dropdown-item">{`${patient.lname} ${patient.fname} ${patient.sname}`}</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </li>}

                    {isAccessedPage(accessPage.report, user) && <li className="nav-item">
                        <Link to={linkDict.report} className="nav-link">Отчеты</Link>
                    </li>}
                    {isAccessedPage(accessPage.administration, user) && <li className="nav-item" aria-disabled={true}>
                        <Link to={linkDict.administration} className="nav-link">Администрирование</Link>
                    </li>}
                </ul>
            </div>
            <div>
                {isAccessed(accessPage.adminAsu, uUnit, uAccess) && <button className="btn btn-outline-danger">
                    <Link to={linkDict.admin} className="nav-link link-dark" style={{padding: 0}}>admin</Link>
                </button>}
                Пользователь: {isAccessed(accessPage.profile, uUnit, uAccess) && <span className="m-2 navbar-text">
                    <Link to={linkDict.profile} style={{padding: 0}}>
                         {fio}
                    </Link>
                </span>}

                <button className="btn btn-outline-primary" onClick={onLogout}>Выход</button>
            </div>
        </div>
    </nav>
}
export default memo(NavMenu)
