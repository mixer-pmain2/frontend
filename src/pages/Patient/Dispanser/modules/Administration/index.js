import React from "react";
import {connect} from "react-redux";

import Layout from "pages/Layout";
import {PageTitle} from "components/Title";


const Administration = ({dispatch, user}) => {

    return <Layout>
        <PageTitle title={"Администрирование"}/>
    </Layout>
}

export default connect(state => ({
    user: state.user
}))(Administration)
