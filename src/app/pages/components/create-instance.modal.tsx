import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Button, Form, FormGroup, Modal, ModalVariant, TextArea, TextInput } from "@patternfly/react-core";
import { RegistryCreate } from "@rhoas/registry-management-sdk";

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
    const [nameValidated, setNameValidated] = useState<'success' | 'warning' | 'error' | 'default'>("default");
    const [nameInvalidText, setNameInvalidText] = useState("");
    const [descriptionValidated, setDescriptionValidated] = useState<'success' | 'warning' | 'error' | 'default'>("default");
    const [descriptionInvalidText, setDescriptionInvalidText] = useState("");

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
        setNameValidated("success");
        setDescriptionValidated("success");

        let valid: boolean = true;
        if (!name) {
            valid = false;
            setNameValidated("error");
            setNameInvalidText("Name is required.");
        } else {
            const nameRegexp: RegExp = /^[a-z]([a-z0-9\-]*[a-z0-9])?$/;
            if (!nameRegexp.test(name)) {
                setNameValidated("error");
                setNameInvalidText("Must start with a letter and end with a letter or number. Valid characters include lowercase letters from a to z, numbers from 0 to 9, and hyphens ( - ).");
                valid = false;
            } else if (name.length > 32) {
                setNameValidated("error");
                setNameInvalidText("Must be at most 32 characters.");
                valid = false;
            }
        }

        if (description && description.length > 255) {
            setDescriptionValidated("error");
            setDescriptionInvalidText("Must be at most 255 characters.");
            valid = false;
        }

        setValid(valid);
    }, [name, description]);

    // Whenever the modal is opened, set default values for the form.
    useEffect(() => {
        if (isOpen) {
            setName("");
            setDescription("");
            setNameValidated("default");
            setDescriptionValidated("default");
        }
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
                <FormGroup label="Name"
                           isRequired={true}
                           helperText="Must start with a letter and end with a letter or number. Valid characters include lowercase letters from a to z, numbers from 0 to 9, and hyphens ( - )."
                           helperTextInvalid={nameInvalidText}
                           fieldId="create-instance-name"
                           validated={nameValidated}>
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
                </FormGroup>
                <FormGroup label="Description"
                           helperTextInvalid={descriptionInvalidText}
                           isRequired={false}
                           fieldId="create-instance-description"
                           validated={descriptionValidated}>
                    <TextArea
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
