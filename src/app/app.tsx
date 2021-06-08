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
import {
    TenantArtifactRedirectPage,
    TenantArtifactsPage,
    TenantArtifactVersionPage,
    TenantPage,
    TenantRulesPage,
    TenantsPage
} from "./pages";
import {Services} from "./services";


/**
 * The main application class.
 */
export default class App extends React.PureComponent<{}, {}> {

    public render() {
        Services.getLoggerService().info("[App] Rendering the main application.");

        // Function to force the Artifact Version Page to fully remount each time we navigate to it.  This
        // is needed because we want the page to fully rerender whenever the browser location changes, which
        // happens when switching between versions of the artifact content (e.g. switch from version 1 to version 3).
        const tenantArtifactVersionPage = (props: any): React.ReactElement => {
            const location: string = props.location.pathname;
            return (
                <TenantArtifactVersionPage key={location} {...props} />
            );
        };

        return (
            <Router basename="/">
                <Page
                    className="pf-m-redhat-font"
                    isManagedSidebar={false}
                    header={<AppHeader/>}
                >
                    <Switch>
                        <Route path='/' exact={true} component={TenantsPage}/>
                        <Route path='/t/:tenantId' exact={true} component={TenantPage}/>
                        <Route path='/t/:tenantId/rules' exact={true} component={TenantRulesPage}/>
                        <Route path='/t/:tenantId/artifacts' exact={true} component={TenantArtifactsPage}/>
                        <Route path='/t/:tenantId/artifacts/:groupId/:artifactId' exact={true} component={TenantArtifactRedirectPage}/>
                        <Route path='/t/:tenantId/artifacts/:groupId/:artifactId/versions/:version' exact={true} component={tenantArtifactVersionPage} />
                    </Switch>
                </Page>
            </Router>
        );
    }
}
