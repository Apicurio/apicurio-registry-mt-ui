import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Form, FormGroup, Text, Modal, ModalVariant, TextContent, TextInput, Checkbox} from "@patternfly/react-core";
import {Registry, RegistryCreate} from "@rhoas/registry-management-sdk";

export type DeleteInstanceModalProps = {
    instance: Registry|undefined;
    onDelete: (instance: Registry) => void;
    onCancel: () => void;
}


export const DeleteInstanceModal: FunctionComponent<DeleteInstanceModalProps> = ({instance, onDelete, onCancel}: DeleteInstanceModalProps) => {
    const [isValid, setValid] = useState(false);
    const [nameVerify, setNameVerify] = useState("");

    // Called when the user clicks the Create button in the modal
    const doDelete = (): void => {
        if (!instance) return;
        onDelete(instance)
    };

    // Validate the form inputs.
    useEffect(() => {
        let valid: boolean = true;
        if (nameVerify !== instance?.name) {
            valid = false;
        }
        setValid(valid);
    }, [instance, nameVerify]);

    // Whenever the modal is opened, set default values for the form.
    useEffect(() => {
        setNameVerify("");
    }, [instance]);

    return (
        <Modal
            variant={ModalVariant.medium}
            title="Delete Apicurio Registry instance?"
            isOpen={instance !== undefined}
            onClose={onCancel}
            actions={[
                <Button key="create" variant="primary" isDisabled={!isValid} onClick={doDelete}>
                    Delete
                </Button>,
                <Button key="cancel" variant="link" onClick={onCancel}>
                    Cancel
                </Button>
            ]}
        >
            <Form>
                <TextContent>
                    <Text component="p">Type {instance?.name} to confirm:</Text>
                </TextContent>
                <TextInput
                        isRequired
                        type="text"
                        id="delete-instance-verify-name"
                        name="delete-instance-verify-name"
                        value={nameVerify}
                        onChange={(value) => {setNameVerify(value)}}
                    />
                  <Checkbox
                    id="description-check-1"
                    label="I understand that deleting "
                    description="Single-tenant cloud service hosted and managed by Red Hat that offers high-availability enterprise-grade clusters in a virtual private cloud on AWS or GCP."
  />
            </Form>
        </Modal>
    );
};
