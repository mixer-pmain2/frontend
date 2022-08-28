import React, {useState} from 'react'
import {connect} from "react-redux";
import Layout from 'pages/Layout'
import {PageTitle} from 'components/Title'
import {capitalizeFirstLetter} from 'utility/string'
import Button from 'components/Button'
import ChangePassword from "./ChangePassword";
import {iota} from "../../utility/app";
import AccessTab from "./AccessTab";

type MenuItemProps = {
    children
    index?
    onClick?
    className?
}

const MenuItem = ({children, onClick, className}: MenuItemProps) => {
    const [isHover, setHover] = useState(false)
    return <Button
        className={`${isHover ? "btn-menu-primary" : ""} ${className}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
    >
        <div className="d-flex justify-content-start">{children}</div>
    </Button>
}

const subPages = [
    {
        id: iota(),
        title: "Изменить пароль",
        component: ChangePassword,
    },
    {
        id: iota(),
        title: "Права",
        component: AccessTab,
    },
]

export type ProfilePageProps = {
    dispatch
    user: UserStore
}

const ProfilePage = (p: ProfilePageProps) => {
    const {user} = p
    const [curTab, setCurTab] = useState(subPages[0].id)
    const username = capitalizeFirstLetter(user?.lname?.toLowerCase()) + " "
        + capitalizeFirstLetter(user?.fname?.toLowerCase()) + " "
        + capitalizeFirstLetter(user?.sname?.toLowerCase()) + " "

    const onChangeTab = (index) => setCurTab(index)

    return <Layout>
        <PageTitle title={username}/>
        <div className="d-flex flex-row">
            <div className="d-flex flex-column" style={{marginRight: 15, width: 220}}>
                {
                    subPages.map((v, i) => <MenuItem
                        key={i}
                        onClick={() => onChangeTab(v.id)}
                        className={`${v.id === curTab ? "btn-menu-primary" : ""}`}
                    >
                        {v.title}
                    </MenuItem>)
                }
            </div>
            <div className="p-3">
                {
                    subPages.filter(v => v.id === curTab)
                        .map((v, i) => <v.component key={i} {...p}/>)
                }
            </div>
        </div>
    </Layout>
}

export default connect((state: RootStore) => ({
    user: state.user
}))(ProfilePage)
