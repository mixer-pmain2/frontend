import React from 'react'
import StartPage from './pages/Start'
import VisitPage from './pages/Patient/Dispanser/modules/Visit/index'

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
import Administration from 'pages/Patient/Dispanser/modules/Administration'

export const linkDict = {
    start: '/',

    profile: '/profile',
    signin: '/signin',

    patient: '/patient/:id',
    newPatient: '/patient/new',
    findPatient: '/patient/find',

    dispAdministration: '/disp/administration',
    report: '/report',
    admin: '/admin',
}

const main = NewMiddleWare()
main.add(middlewareAuthRequire)

const disp = NewMiddleWare()
disp.add(middlewareAccessRequire, { access: access.accessPage.dispanser })
disp.add(middlewareAuthRequire)

const dispAdministration = NewMiddleWare()
dispAdministration.add(middlewareAccessRequire, { access: access.accessPage.administration })
dispAdministration.add(middlewareAuthRequire)

const admin = NewMiddleWare()
admin.add(middlewareAuthRequire)
admin.add(middlewareAccessRequire, { access: access.accessPage.adminAsu })

const page = (access) => {
    const p = NewMiddleWare()
    p.add(middlewareAuthRequire)
    p.add(middlewareAccessRequire, { access })
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
        element: disp.middleware(<ProfilePage/>)
    },
    {
        path: linkDict.findPatient,
        element: disp.middleware(<FindPatient/>)
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
        path: linkDict.dispAdministration,
        element: dispAdministration.middleware(<Administration/>)
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
