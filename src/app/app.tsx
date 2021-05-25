/**
 * @license
 * Copyright 2021 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import {Page} from "@patternfly/react-core";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppHeader} from "./components/header";
import {DashboardPage} from "./pages";
import {Services} from "./services";


/**
 * The main application class.
 */
export default class App extends React.PureComponent<{}, {}> {

    public render() {
        Services.getLoggerService().info("[App] Rendering the main application.");
        return (
            <Router basename="/">
                <Page
                    className="pf-m-redhat-font"
                    isManagedSidebar={false}
                    header={<AppHeader/>}
                >
                    <Switch>
                        <Route path='/' exact={true} component={DashboardPage}/>
                    </Switch>
                </Page>
            </Router>
        );
    }
}
