import * as React from "react";
import {connect} from "react-redux";

import Layout from "pages/Layout";
import {PageTitle} from "components/Title";

type AdministrationProps = {
    dispatch: () => any
    user: UserStore
}

const Administration = (p: AdministrationProps) => {

    return <Layout>
        <PageTitle title={"Администрирование"}/>
    </Layout>
}

export default connect((state: RootStore) => ({
    user: state.user
}))(Administration)
