import React, {memo} from "react";
import {useSelector} from "react-redux"


export const useLoading = (loadComponent) => {
    const {application} = useSelector((state: RootStore) => ({application: state.application}))

    return Boolean(application.loadingList.indexOf(loadComponent) + 1)
}

const Progress = ({style}) => {


    return <div className="progress" style={{height: 5, ...style}}>
        <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" style={{width: "100%"}}/>
    </div>
}

export default memo(Progress)
