import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Form, FormGroup, Modal, ModalVariant, TextInput} from "@patternfly/react-core";
import {RegistryCreate} from "@rhoas/registry-management-sdk";

export type CreateInstanceModalProps = {
    isOpen: boolean|undefined;
    onCreate: (event: RegistryCreate) => void;
    onCancel: () => void;
}


export const CreateInstanceModal: FunctionComponent<CreateInstanceModalProps> = ({isOpen, onCreate, onCancel}: CreateInstanceModalProps) => {
    const [isValid, setValid] = useState(false);
    const [name, setName] = useState("");

    // Called when the user clicks the Create button in the modal
    const doCreate = (): void => {
        const data: RegistryCreate = {
            name
        };
        onCreate(data);
    };

    // Validate the form inputs.
    useEffect(() => {
        let valid: boolean = true;
        if (!name) {
            valid = false;
        }
        setValid(valid);
    }, [name]);

    // Whenever the modal is opened, set default values for the form.
    useEffect(() => {
        setName("");
    }, [isOpen]);

    return (
        <Modal
            variant={ModalVariant.medium}
            title="Create a registry instance"
            isOpen={isOpen}
            onClose={onCancel}
            actions={[
                <Button key="create" variant="primary" isDisabled={!isValid} onClick={doCreate}>
                    Create
                </Button>,
                <Button key="cancel" variant="link" onClick={onCancel}>
                    Cancel
                </Button>
            ]}
        >
            <Form>
                <FormGroup label="Name" isRequired={true} fieldId="create-instance-name">
                    <TextInput
                        isRequired
                        type="text"
                        id="create-instance-name"
                        name="create-instance-name"
                        aria-describedby="create-instance-name-helper"
                        value={name}
                        onChange={(value) => {setName(value)}}
                    />
                </FormGroup>
            </Form>
        </Modal>
    );
};
