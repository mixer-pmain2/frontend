import React, { useEffect } from 'react'
import {connect} from "react-redux";

import * as userActions from "store/actions/user";
import * as appActions from "store/actions/application"


// Не добавлять состояния иначе будет часто вызываться
const Initialisation = ({dispatch, user}: {dispatch, user: UserStore}) => {

    useEffect(() => {
        if (user?.id) {
            dispatch(userActions.getPrava({id: user?.id}))
            dispatch(userActions.getUch({id: user?.id}))
        }
    }, [user?.id])

    useEffect(() => {
        (async () => {
            await dispatch(appActions.loadingAdd("initialization"))
            await dispatch(appActions.getSprPodr())
            await dispatch(appActions.getSprPrava())
            await dispatch(appActions.getSprVisit())
            await dispatch(appActions.getParams())
            await dispatch(appActions.getSprReason())
            await dispatch(appActions.getSprInvalidKind())
            await dispatch(appActions.getSprInvalidChildAnomaly())
            await dispatch(appActions.getSprInvalidChildLimit())
            await dispatch(appActions.getSprInvalidReason())
            await dispatch(appActions.loadingReset())
            await dispatch(appActions.loadingRemove("initialization"))
        })()
        console.log("Initialization")
    }, [])

    return null
}

export default connect(((state: RootStore) => ({
    user: state.user
})))(Initialisation)
