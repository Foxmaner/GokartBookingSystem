import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MenuPage from './components/menuPage/menuPage.js'
import AnalyticsPage from './components/analyticsPage/analyticsPage.js'
import CashPage from './components/cashPage/cashPage.js'
import DepotPage from './components/depotPage/depotPage.js'
import SettingsPage from './components/settingsPage/settingsPage.js'


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <Router>
            <div className="App">
                <div className="Content">
                    <Switch>
                        <Route path="/analytics">
                            <AnalyticsPage />
                        </Route>
                        <Route path="/cashier">
                            <CashPage />
                        </Route>
                        <Route path="/depot">
                            <DepotPage />
                        </Route>
                        <Route path="/settings">
                            <SettingsPage />
                        </Route>
                        <Route path="/">
                            <MenuPage />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>

    )
}





ReactDOM.render(<App />, document.getElementById('root'));