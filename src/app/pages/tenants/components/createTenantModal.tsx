/**
 * @license
 * Copyright 2020 JBoss Inc
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
import React from 'react';
import "./createTenantModal.css";
import {Button, Form, FormGroup, Modal, TextArea, TextInput} from "@patternfly/react-core";
import {PureComponent, PureComponentProps, PureComponentState} from "@app/components";
import {NewRegistryTenantRequest} from "../../../../models";


/**
 * Properties
 */
export interface CreateTenantModalProps extends PureComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateTenant: (request: NewRegistryTenantRequest) => void;
}

/**
 * State
 */
export interface CreateTenantModalState extends PureComponentState {
    request: NewRegistryTenantRequest;
}

/**
 * Models the Create Tenant modal dialog.
 */
export class CreateTenantModal extends PureComponent<CreateTenantModalProps, CreateTenantModalState> {

    constructor(props: Readonly<CreateTenantModalProps>) {
        super(props);
    }

    public render(): React.ReactElement {
        return (
            <Modal
                title="Create Registry"
                variant="large"
                isOpen={this.props.isOpen}
                onClose={this.props.onClose}
                className="create-tenant pf-m-redhat-font"
                actions={[
                    <Button key="create" variant="primary" data-testid="modal-btn-create" onClick={this.doCreate}>Create</Button>,
                    <Button key="cancel" variant="link" data-testid="modal-btn-cancel" onClick={this.props.onClose}>Cancel</Button>
                ]}
            >
                {/*<p>Use the form below to update the Name and Description of the registry.</p>*/}
                <Form>
                    <FormGroup
                        label="Unique ID"
                        fieldId="form-id"
                    >
                        <TextInput
                            isRequired={true}
                            type="text"
                            id="form-id"
                            data-testid="form-id"
                            name="form-id"
                            aria-describedby="form-id-helper"
                            value={this.state.request.tenantId}
                            placeholder="ID of the registry"
                            onChange={this.onIdChange}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Name"
                        fieldId="form-name"
                    >
                        <TextInput
                            isRequired={true}
                            type="text"
                            id="form-name"
                            data-testid="form-name"
                            name="form-name"
                            aria-describedby="form-name-helper"
                            value={this.state.request.name}
                            placeholder="Name of the registry"
                            onChange={this.onNameChange}
                        />
                    </FormGroup>

                    <FormGroup
                        label="Description"
                        fieldId="form-description"
                    >
                        <TextArea
                            isRequired={false}
                            id="form-description"
                            data-testid="form-description"
                            name="form-description"
                            aria-describedby="form-description-helper"
                            value={this.state.request.description}
                            placeholder="Description of the registry"
                            onChange={this.onDescriptionChange}
                        />
                    </FormGroup>

                    <FormGroup
                        label="Organization ID"
                        fieldId="form-org-id"
                    >
                        <TextInput
                            isRequired={true}
                            type="text"
                            id="form-org-id"
                            data-testid="form-org-id"
                            name="form-org-id"
                            aria-describedby="form-org-id-helper"
                            value={this.state.request.organizationId}
                            placeholder="Organization ID"
                            onChange={this.onOrgIdChange}
                        />
                    </FormGroup>

                </Form>
            </Modal>
        );
    }

    protected initializeState(): CreateTenantModalState {
        return {
            request: {
                description: "",
                name: "",
                organizationId: "my-organization",
                resources: [],
                tenantId: "registry-" + Math.floor(Math.random() * 10000)
            }
        };
    }

    private doCreate = (): void => {
        this.props.onCreateTenant(this.state.request);
    };

    private onIdChange = (value: string): void => {
        this.setSingleState("request", {
            ...this.state.request,
            tenantId: value
        });
    };

    private onNameChange = (value: string): void => {
        this.setSingleState("request", {
            ...this.state.request,
            name: value
        });
    };

    private onDescriptionChange = (value: string): void => {
        this.setSingleState("request", {
            ...this.state.request,
            description: value
        });
    };

    private onOrgIdChange = (value: string): void => {
        this.setSingleState("request", {
            ...this.state.request,
            orgId: value
        });
    };

}
