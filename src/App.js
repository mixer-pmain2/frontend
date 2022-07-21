import React, { useEffect } from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import "./App.css"


import {store} from "store/store";

import routes from "./routes";
import Initialisation from "./initialisation";

function App() {

    const updStorage = (e) => {
        if (e.key === 'user') {
            document.location.href = e.url
        }
        if (e.key === 'patient') {
            document.location.href = e.url
        }
    }

    useEffect(() => {
        let action = false
        if (!action) {
            window.addEventListener('storage', updStorage)
        }

        return () => {
            action = true
            window.removeEventListener('storage', updStorage)
        }
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {routes.map((v, i) =>
                        <Route key={i} path={v.path} element={v.element}/>)
                    }
                </Routes>
            </Router>

            <Initialisation/>
        </Provider>
    );
}

export default App;
