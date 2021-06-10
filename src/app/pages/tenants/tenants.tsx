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
    InputGroup, Modal,
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
import {Link} from "react-router-dom";
import {CreateTenantModal} from "@app/pages";
import "./tenants.css";


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
    search: string;
    isCreateTenantModalOpen: boolean;
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
        const columns = [
            "ID", "Name", "Description"
        ];
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
                            <Button variant="primary" onClick={this.createTenant}>Create Registry</Button>
                        </EmptyState>
                    </PageSection>
                </If>
                <If condition={() => this.state.tenants.length > 0}>
                    <PageSection variant={PageSectionVariants.default} isFilled={true}>
                        <Toolbar id="toolbar">
                            <ToolbarContent>
                                <ToolbarItem>
                                    <InputGroup>
                                        <TextInput name="textInput1" id="textInput1" type="search"
                                                   aria-label="Search for registries"
                                                   onChange={this.onSearchChange}
                                        />
                                        <Button variant={ButtonVariant.control} aria-label="search button for search input">
                                            <SearchIcon />
                                        </Button>
                                    </InputGroup>
                                </ToolbarItem>
                                <ToolbarItem>
                                    <Button variant="primary" onClick={this.createTenant}>Create Registry</Button>
                                </ToolbarItem>
                            </ToolbarContent>
                        </Toolbar>
                        <TableComposable aria-label="Registries table" className="tenant-table">
                            <Thead>
                                <Tr>
                                    {columns.map((column, columnIndex) => (
                                        <Th key={columnIndex}>{column}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.visibleTenants().map((tenant, rowIndex) => (
                                    <Tr key={rowIndex}>
                                        <Td className="tenantId" key={rowIndex + '_id'} dataLabel={columns[0]}>
                                            <Link className="name"
                                                  to={`/t/${ encodeURIComponent(tenant.tenantId)}`}>{tenant.tenantId}</Link>
                                        </Td>
                                        <Td className="name" key={rowIndex + '_name'} dataLabel={columns[1]}>{ tenant.name }</Td>
                                        <Td className="description" key={rowIndex + '_desc'} dataLabel={columns[2]}>
                                            <span>{ tenant.description }</span>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </TableComposable>
                    </PageSection>
                </If>
                <CreateTenantModal
                    onCreateTenant={this.doCreateTenant}
                    isOpen={this.state.isCreateTenantModalOpen}
                    onClose={this.onCreateTenantModalClose}></CreateTenantModal>

            </React.Fragment>
        );
    }

    protected initializePageState(): TenantsPageState {
        return {
            isCreateTenantModalOpen: false,
            search: "",
            tenants: []
        };
    }

    // @ts-ignore
    protected createLoaders(): Promise | null {
        return Services.getTenantsService().getTenants().then(tenants => {
            this.setSingleState("tenants", tenants);
        });
    }

    private createTenant = (): void => {
        this.setSingleState("isCreateTenantModalOpen", true);
    };

    private onCreateTenantModalClose = (): void => {
        this.setSingleState("isCreateTenantModalOpen", false);
    };

    private doCreateTenant = (request: NewRegistryTenantRequest): void => {
        this.onCreateTenantModalClose();
        Services.getTenantsService().createTenant(request).then(tenant => {
            const tenantLocation: string = `/t/${ encodeURIComponent(tenant.tenantId)}`
            this.navigateTo(tenantLocation)();
        }).catch(error => {
            this.handleServerError(error, "Error creating registry.");
        });
    };

    private onSearchChange = (value: string): void => {
        this.setSingleState("search", value, () => {
        });
    };

    private visibleTenants(): RegistryTenant[] {
        return this.state.tenants.filter(t => this.acceptTenant(t));
    }

    private acceptTenant = (tenant: RegistryTenant): boolean => {
        if (!this.state.search || this.state.search.trim() === "") {
            return true;
        }
        const srch: string = this.state.search.toLowerCase();
        if (tenant.name && tenant.name.toLowerCase().indexOf(srch) !== -1) {
            return true;
        }
        if (tenant.description && tenant.description.toLowerCase().indexOf(srch) !== -1) {
            return true;
        }
        if (tenant.tenantId && tenant.tenantId.toLowerCase().indexOf(srch) !== -1) {
            return true;
        }
        return false;
    };

}
