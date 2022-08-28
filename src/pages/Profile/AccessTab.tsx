import React from "react";
import {connect} from "react-redux";
import User from "../../classes/User";
import {Access} from "../../consts/user";
import Checkbox from "../../components/Input/checkbox";


type AccessProps = {
    user: UserStore
}

const AccessTab = (p: AccessProps) => {
    const u = new User(p.user)

    const accessNameList = Object.keys(Access.dispanser)
    const allowedAccess = (value) => (u.access & Access.dispanser[value]) > 0

    return <div>
        {
            accessNameList.map((v, i) => allowedAccess(v) &&
                <Checkbox key={i} defaultChecked={allowedAccess(v)} title={v}/>)
        }
    </div>
}

export default connect((state: RootStore) => ({
    user: state.user
}))(AccessTab)
