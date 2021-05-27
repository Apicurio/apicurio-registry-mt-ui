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
    Button,
    ButtonVariant,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    InputGroup,
    PageSection,
    PageSectionVariants,
    TextInput,
    Title,
    Toolbar,
    ToolbarContent,
    ToolbarItem
} from '@patternfly/react-core';
import {PageComponent, PageProps, PageState} from "../basePage";
import {SearchIcon, CubesIcon} from "@patternfly/react-icons";
import {If} from "../../components";
import {Services} from "../../services";
import {RegistryTenant} from "../../models/registryTenant.model";
import {NewRegistryTenantRequest} from "../../models";
import {TableComposable, Tbody, Td, Th, Thead, Tr} from '@patternfly/react-table';


/**
 * Properties
 */
// tslint:disable-next-line:no-empty-interface
export interface TenantsPageProps extends PageProps {

}

/**
 * State
 */
export interface TenantsPageState extends PageState {
    tenants: RegistryTenant[];
}

/**
 * The tenants page.
 */
export class TenantsPage extends PageComponent<TenantsPageProps, TenantsPageState> {

    // eslint-disable-next-line
    constructor(props: Readonly<TenantsPageProps>) {
        super(props);
    }

    public renderPage(): React.ReactElement {
        const columns = ["Tenant ID", "Organization", "Created On"];
        return (
            <React.Fragment>
                <If condition={() => this.state.tenants.length === 0}>
                    <PageSection variant={PageSectionVariants.default} isFilled={true}>
                        <EmptyState>
                            <EmptyStateIcon icon={CubesIcon} />
                            <Title headingLevel="h4" size="lg" id="title">
                                No Registries Found
                            </Title>
                            <EmptyStateBody>
                                We could not find any registries that you have access to.  Create a new registry instance
                                by clicking the Create Registry button below.
                            </EmptyStateBody>
                            <Button variant="primary" onClick={this.createRegistry}>Create Registry</Button>
                        </EmptyState>
                    </PageSection>
                </If>
                <If condition={() => this.state.tenants.length > 0}>
                    <PageSection variant={PageSectionVariants.default} isFilled={true}>
                        <Toolbar id="toolbar">
                            <ToolbarContent>
                                <ToolbarItem>
                                    <InputGroup>
                                        <TextInput name="textInput1" id="textInput1" type="search" aria-label="search input example" />
                                        <Button variant={ButtonVariant.control} aria-label="search button for search input">
                                            <SearchIcon />
                                        </Button>
                                    </InputGroup>
                                </ToolbarItem>
                                <ToolbarItem>
                                    <Button variant="primary" onClick={this.createRegistry}>Create Registry</Button>
                                </ToolbarItem>
                            </ToolbarContent>
                        </Toolbar>
                        <TableComposable  aria-label="Tenants table">
                            <Thead>
                                <Tr>
                                    {columns.map((column, columnIndex) => (
                                        <Th key={columnIndex}>{column}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.state.tenants.map((tenant, rowIndex) => (
                                    <Tr key={rowIndex}>
                                        <Td key={rowIndex + '_id'} dataLabel={columns[0]}>{ tenant.tenantId }</Td>
                                        <Td key={rowIndex + '_orgId'} dataLabel={columns[1]}>{ tenant.organizationId }</Td>
                                        <Td key={rowIndex + '_createdOn'} dataLabel={columns[2]}>{ tenant.createdOn }</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </TableComposable>
                    </PageSection>
                </If>
            </React.Fragment>
        );
    }

    protected doInitializeState(): TenantsPageState {
        return {
            tenants: []
        };
    }

    // @ts-ignore
    protected createLoaders(): Promise | null {
        return Services.getTenantsService().getTenants().then(tenants => {
            this.setSingleState("tenants", tenants);
        });
    }

    private createRegistry = (): void => {
        const request: NewRegistryTenantRequest = {
            organizationId: "my-organization",
            resources: [],
            tenantId: "tenant-" + Math.floor(Math.random() * 100)
        };
        Services.getTenantsService().createTenant(request).then(tenant => {
            this.setSingleState("tenants", [ ...this.state.tenants, tenant ]);
        });
    };

    private tenantRows = (): string[] => {
        return [];
    };
}
