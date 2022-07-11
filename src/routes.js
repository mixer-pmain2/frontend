import React from 'react'
import StartPage from './pages/Start'

import GetPatient from './pages/Patient'
import ProfilePage from './pages/Profile'
import middlewareAuthRequire from './middleware/authRequier'
import NewMiddleWare from './middleware'
import middlewareAccessRequire from './middleware/accessRequier'
import SignInPageState from './pages/Signin'
import AdminPage from './pages/Admin'

import * as access from './configs/access'
import Page404 from './pages/ErrorPage/404'
import FindPatient from './pages/Patient/Find'
import Report from 'pages/Report'
import NewPatient from 'pages/Patient/New'
import Administration from 'pages/Administration'

export const linkDict = {
    start: '/',

    profile: '/profile',
    signin: '/signin',

    patient: '/patient/:id',
    newPatient: '/patient/new',
    findPatient: '/patient/find',

    administration: '/administration',
    report: '/report',
    admin: '/admin',
}

const main = NewMiddleWare()
main.add(middlewareAuthRequire)

const disp = NewMiddleWare()
disp.add(middlewareAccessRequire, { access: access.accessPage.dispanser })
disp.add(middlewareAuthRequire)

const admin = NewMiddleWare()
admin.add(middlewareAuthRequire)
admin.add(middlewareAccessRequire, { access: access.accessPage.adminAsu })

const page = (access) => {
    const p = NewMiddleWare()
    p.add(middlewareAccessRequire, { access })
    p.add(middlewareAuthRequire)
    return p.middleware
}

const routes = [
    {
        path: linkDict.signin,
        element: <SignInPageState/>
    },
    {
        path: linkDict.start,
        element: main.middleware(<StartPage/>)
    },
    {
        path: linkDict.profile,
        element: page(access.accessPage.profile)(<ProfilePage/>)
    },
    {
        path: linkDict.findPatient,
        element: page(access.accessPage.findPatient)(<FindPatient/>)
    },
    {
        path: linkDict.newPatient,
        element: page(access.accessPage.newPatient)(<NewPatient/>)
    },
    {
        path: linkDict.patient,
        element: disp.middleware(<GetPatient/>)
    },
    {
        path: linkDict.administration,
        element: page(access.accessPage.administration)(<Administration/>)
    },
    {
        path: linkDict.report,
        element: page(access.accessPage.report)(<Report/>)
    },

    {
        path: linkDict.admin,
        element: admin.middleware(<AdminPage/>)
    },
    {
        path: '*',
        element: <Page404/>
    }
]
export default routes
