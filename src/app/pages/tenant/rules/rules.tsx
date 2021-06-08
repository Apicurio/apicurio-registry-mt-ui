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
import {Services} from "@app/services";
import {Breadcrumb, BreadcrumbItem, PageSection, PageSectionVariants} from "@patternfly/react-core";
import {PageComponent, PageProps, PageState, TenantPageComponent} from "@app/pages";
import {Link} from "react-router-dom";

// @ts-ignore
const FederatedRulesPage = React.lazy(() => import("@apicurio/registry/FederatedRulesPage"));

/**
 * Properties
 */
// tslint:disable-next-line:no-empty-interface
export interface TenantRulesPageProps extends PageProps {

}

/**
 * State
 */
export interface TenantRulesPageState extends PageState {
}

/**
 * The tenant global rules page.  Embeds the apicurio registry global rules page.
 */
export class TenantRulesPage extends TenantPageComponent<TenantRulesPageProps, TenantRulesPageState> {

    // eslint-disable-next-line
    constructor(props: Readonly<TenantRulesPageProps>) {
        super(props);
    }

    public renderPage(): React.ReactElement {
        const tenantId: string = this.tenantId();
        const navPath: string = this.navPath();
        Services.getLoggerService().info(`Rendering page for tenant ${tenantId}`);
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light} className="mt-breadcrumbs">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/" data-testid="breadcrumb-lnk-tenants">Tenants</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/t/${tenantId}`} data-testid="breadcrumb-lnk-tenant">{ tenantId }</Link></BreadcrumbItem>
                        <BreadcrumbItem isActive={true}>Global Rules</BreadcrumbItem>
                    </Breadcrumb>
                </PageSection>
                <React.Suspense fallback="Loading Rules">
                    <FederatedRulesPage tenantId={tenantId} navPrefixPath={navPath} history={this.history()} />
                </React.Suspense>
            </React.Fragment>
        );
    }

    protected initializePageState(): TenantRulesPageState {
        return {};
    }

    // @ts-ignore
    protected createLoaders(): Promise | null {
        return null;
    }

}
