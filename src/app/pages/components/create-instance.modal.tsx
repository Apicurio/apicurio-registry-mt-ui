import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Form, FormGroup, HelperText, HelperTextItem, Modal, ModalVariant, TextInput} from "@patternfly/react-core";
import {RegistryCreate} from "@rhoas/registry-management-sdk";

export type CreateInstanceModalProps = {
    isOpen: boolean|undefined;
    errorMsg: string|undefined;
    onCreate: (event: RegistryCreate) => void;
    onCancel: () => void;
}


export const CreateInstanceModal: FunctionComponent<CreateInstanceModalProps> = ({isOpen, errorMsg, onCreate, onCancel}: CreateInstanceModalProps) => {
    const [isValid, setValid] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const errorMessage = () => {
        if (errorMsg) {
            return <Alert variant="danger" title={errorMsg} />;
        } else {
            return null;
        }
     }

    // Called when the user clicks the Create button in the modal
    const doCreate = (): void => {
        const data: RegistryCreate = {
            name,
            description
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
        setDescription("");
    }, [isOpen]);

    return (
        <Modal
            variant={ModalVariant.medium}
            title="Create a Apicurio Registry instance"
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
            <Form>{errorMessage()}
                <FormGroup label="Name" isRequired={true} fieldId="create-instance-name">
                    <TextInput
                        isRequired
                        type="text"
                        id="create-instance-name"
                        name="create-instance-name"
                        aria-describedby="create-instance-name-helper"
                        value={name}
                        onChange={(value) => {setName(value)}}
                        autoFocus={true}
                    />
                    <HelperText id="create-instance-name-helper">
                        <HelperTextItem>Must start with a letter and end with a letter or number. Valid characters include lowercase letters from a to z, numbers from 0 to 9, and hyphens ( - ).</HelperTextItem>
                    </HelperText>
                </FormGroup>
                <FormGroup label="Description" isRequired={false} fieldId="create-instance-description">
                    <TextInput
                        type="text"
                        id="create-instance-description"
                        name="create-instance-description"
                        aria-describedby="create-instance-description-helper"
                        value={description}
                        onChange={(value) => {setDescription(value)}}
                    />
                </FormGroup>
            </Form>
        </Modal>
    );
};
