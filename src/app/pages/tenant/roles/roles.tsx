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
import {Breadcrumb, BreadcrumbItem, PageSection, PageSectionVariants} from "@patternfly/react-core";
import {PageProps, PageState, TenantPageComponent} from "@app/pages";
import {Link} from "react-router-dom";
import {Services} from "../../../../services";

// @ts-ignore
const FederatedRolesPage = React.lazy(() => import("@apicurio/registry/FederatedRolesPage"));

/**
 * Properties
 */
// tslint:disable-next-line:no-empty-interface
export interface TenantRolesPageProps extends PageProps {

}

/**
 * State
 */
export interface TenantRolesPageState extends PageState {
}

/**
 * The tenant global rules page.  Embeds the apicurio registry global rules page.
 */
export class TenantRolesPage extends TenantPageComponent<TenantRolesPageProps, TenantRolesPageState> {

    // eslint-disable-next-line
    constructor(props: Readonly<TenantRolesPageProps>) {
        super(props);
    }

    public renderPage(): React.ReactElement {
        const tenantId: string = this.tenantId();
        Services.getLoggerService().info(`Rendering page for tenant ${tenantId}`);
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light} className="mt-breadcrumbs">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/" data-testid="breadcrumb-lnk-tenants">Registries</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`/t/${tenantId}`} data-testid="breadcrumb-lnk-tenant">{ tenantId }</Link></BreadcrumbItem>
                        <BreadcrumbItem isActive={true}>Permissions</BreadcrumbItem>
                    </Breadcrumb>
                </PageSection>
                <React.Suspense fallback="Loading Roles">
                    <FederatedRolesPage config={this.federatedConfig()} history={this.history()} />
                </React.Suspense>
            </React.Fragment>
        );
    }

    protected initializePageState(): TenantRolesPageState {
        return {};
    }

    // @ts-ignore
    protected createLoaders(): Promise | null {
        return null;
    }

}
