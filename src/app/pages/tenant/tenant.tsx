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
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle, ClipboardCopy,
    Flex,
    FlexItem,
    PageSection,
    PageSectionVariants
} from "@patternfly/react-core";
import {PageProps, PageState, TenantPageComponent} from "@app/pages";
import {Link} from "react-router-dom";
import "./tenant.css";
import {Services} from "../../../services";
import {RegistryTenant} from "../../../models";

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
    tenant: RegistryTenant|null;
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
                        <BreadcrumbItem><Link to="/" data-testid="breadcrumb-lnk-tenants">Registries</Link></BreadcrumbItem>
                        <BreadcrumbItem isActive={true}>{ tenantId }</BreadcrumbItem>
                    </Breadcrumb>
                </PageSection>
                <PageSection variant={PageSectionVariants.default}>
                    <Flex>
                        <FlexItem flex={{ default: "flex_1" }}>
                            <Card className="tenant-card">
                                <CardTitle className="card-title">{ this.tenantDisplayName() }</CardTitle>
                                <CardBody className="tenant-md">
                                    <div className="md-section tenant-id">
                                        <div className="label">ID:</div>
                                        <div className="value">{ this.state.tenant?.tenantId }</div>
                                    </div>
                                    <div className="md-section organization-id">
                                        <div className="label">Organization:</div>
                                        <div className="value">{ this.state.tenant?.organizationId }</div>
                                    </div>
                                    <div className="md-section created-on">
                                        <div className="label">Created:</div>
                                        <div className="value">{ this.state.tenant?.createdOn }</div>
                                    </div>
                                    <div className="md-section description">
                                        <div className="label">Description:</div>
                                        <div className="value">{ this.state.tenant?.description }</div>
                                    </div>
                                </CardBody>
                            </Card>
                        </FlexItem>
                        <FlexItem flex={{ default: "flex_1" }}>
                            <Card className="tenant-card">
                                <CardTitle className="card-title">Connection Info</CardTitle>
                                <CardBody className="tenant-connections">
                                    <div className="preamble">Use the connection strings below to connect to an API provided by this registry.</div>
                                    <div className="connect-section">
                                        <div className="label">Core Registry API</div>
                                        <div className="connection">
                                            <ClipboardCopy isReadOnly={true}>{ this.coreConnectionUrl() }</ClipboardCopy>
                                        </div>
                                    </div>
                                    <div className="connect-section">
                                        <div className="label">Confluent Schema Registry Compatibility API</div>
                                        <div className="connection">
                                            <ClipboardCopy isReadOnly={true}>{ this.ccompatConnectionUrl() }</ClipboardCopy>
                                        </div>
                                    </div>
                                    <div className="connect-section">
                                        <div className="label">CNCF Schema Registry API</div>
                                        <div className="connection">
                                            <ClipboardCopy isReadOnly={true}>{ this.cncfConnectionUrl() }</ClipboardCopy>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <Link className="name"
                                          to={`/t/${ encodeURIComponent(tenantId)}/artifacts`}>
                                        <Button variant="primary">View Artifacts</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </FlexItem>
                    </Flex>
                </PageSection>
            </React.Fragment>
        );
    }

    protected initializePageState(): TenantPageState {
        return {
            tenant: null
        };
    }

    // @ts-ignore
    protected createLoaders(): Promise | null {
        return Services.getTenantsService().getTenant(this.tenantId()).then(tenant => {
            this.setSingleState("tenant", tenant);
        });
    }

    private tenantDisplayName(): string {
        return this.state.tenant?.name || this.state.tenant?.tenantId || "Tenant Details";
    }

    private coreConnectionUrl(): string {
        return Services.getConfigService().registryApisUrl().replace(":tenantId", this.state.tenant?.tenantId || "") + "/registry/v2"
    }

    private ccompatConnectionUrl(): string {
        return Services.getConfigService().registryApisUrl().replace(":tenantId", this.state.tenant?.tenantId || "") + "/ccompat/v6"
    }

    private cncfConnectionUrl(): string {
        return Services.getConfigService().registryApisUrl().replace(":tenantId", this.state.tenant?.tenantId || "") + "/cncf/v0"
    }

}
