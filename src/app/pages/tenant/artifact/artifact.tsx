/**
 * @license
 * Copyright 2021 Red Hat
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
import {PageProps, PageState, TenantPageComponent} from "@app/pages";
import {PureComponent} from "@app/components";

// @ts-ignore
const FederatedArtifactRedirectPage = React.lazy(() => import("@apicurio/registry/FederatedArtifactRedirectPage"));

/**
 * Properties
 */
// tslint:disable-next-line:no-empty-interface
export interface TenantArtifactRedirectPageProps extends PageProps {

}

/**
 * State
 */
export interface TenantArtifactRedirectPageState extends PageState {
}

/**
 * The tenant artifacts page.  Embeds the apicurio registry Artifacts page.
 */
export class TenantArtifactRedirectPage extends TenantPageComponent<TenantArtifactRedirectPageProps, TenantArtifactRedirectPageState> {

    // eslint-disable-next-line
    constructor(props: Readonly<TenantArtifactRedirectPageProps>) {
        super(props);
    }

    public renderPage(): React.ReactElement {
        const tenantId: string = this.tenantId();
        const navPath: string = this.navPath();
        let groupId: string = this.getPathParam("groupId");
        let artifactId: string = this.getPathParam("artifactId");
        return (
            <React.Fragment>
                <React.Suspense fallback="Loading Artifact">
                    <FederatedArtifactRedirectPage tenantId={tenantId} navPrefixPath={navPath} history={this.history()}
                                                   groupId={groupId} artifactId={artifactId} />
                </React.Suspense>
            </React.Fragment>
        );
    }

    protected initializePageState(): TenantArtifactRedirectPageState {
        return {};
    }

    // @ts-ignore
    protected createLoaders(): Promise | null {
        return null;
    }

}
