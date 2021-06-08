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
import {
    Breadcrumb, BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    PageSection,
    PageSectionVariants
} from "@patternfly/react-core";
import {PageComponent, PageProps, PageState, TenantPageComponent} from "@app/pages";
import {Link} from "react-router-dom";

/**
 * Properties
 */
// tslint:disable-next-line:no-empty-interface
export interface TenantPageProps extends PageProps {

}

/**
 * State
 */
export interface TenantPageState extends PageState {
}

/**
 * The tenants page.
 */
export class TenantPage extends TenantPageComponent<TenantPageProps, TenantPageState> {

    // eslint-disable-next-line
    constructor(props: Readonly<TenantPageProps>) {
        super(props);
    }

    public renderPage(): React.ReactElement {
        const tenantId: string = this.tenantId();
        Services.getLoggerService().info(`Rendering page for tenant ${tenantId}`);
        return (
            <React.Fragment>
                <PageSection variant={PageSectionVariants.light} className="mt-breadcrumbs">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/" data-testid="breadcrumb-lnk-tenants">Tenants</Link></BreadcrumbItem>
                        <BreadcrumbItem isActive={true}>{ tenantId }</BreadcrumbItem>
                    </Breadcrumb>
                </PageSection>
                <PageSection variant={PageSectionVariants.default}>
                    <Card>
                        <CardTitle>Tenant Details</CardTitle>
                        <CardBody>TBD - content goes here!!</CardBody>
                        <CardFooter>
                            <Link className="name"
                                  to={`/t/${ encodeURIComponent(tenantId)}/artifacts`}>
                                <Button variant="primary">View Artifacts</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </PageSection>
            </React.Fragment>
        );
    }

    protected initializePageState(): TenantPageState {
        return {};
    }

    // @ts-ignore
    protected createLoaders(): Promise | null {
        return null;
    }

}
