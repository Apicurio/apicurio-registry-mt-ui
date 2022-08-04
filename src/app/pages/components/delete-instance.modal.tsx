import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Text, Modal, ModalVariant, TextContent, TextInput, Checkbox, TextVariants, Alert, AlertActionLink } from "@patternfly/react-core";
import { Registry, RegistryCreate } from "@rhoas/registry-management-sdk";
import { BrowserRouter } from "react-router-dom";

export type DeleteInstanceModalProps = {
    instance: Registry | undefined;
    renderDownloadArtifacts: (instance: Registry, downloadLabel: string) => React.ReactNode;
    onDelete: (instance: Registry) => void;
    onCancel: () => void;
}

export const DeleteInstanceModal: FunctionComponent<DeleteInstanceModalProps> = ({ instance, renderDownloadArtifacts, onDelete, onCancel }: DeleteInstanceModalProps) => {
    const [isValid, setValid] = useState(false);
    const [nameVerify, setNameVerify] = useState("");
    const [understand, setUnderstand] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    // Called when the user clicks the Create button in the modal
    const doDelete = (): void => {
        if (!instance) return;
        onDelete(instance)
    };

    const onDownload = (): void => {
        setDownloaded(true);
    }

    // Validate the form inputs.
    useEffect(() => {
        let valid: boolean = true;
        if (nameVerify !== instance?.name || !understand) {
            valid = false;
        }
        setValid(valid);
    }, [instance, nameVerify, understand]);

    // Whenever the modal is opened, set default values for the form.
    useEffect(() => {
        setNameVerify("");
        setDownloaded(false);
        setUnderstand(false);
    }, [instance]);

    const checkboxText = !downloaded ? "I don't need to download artifacts from this instance, and I understand they will be permanently deleted." : "I understand that the artifacts zip file might not download successfully if I permanently delete the instance before the download is complete."

    return (
        <Modal
            variant={ModalVariant.small}
            titleIconVariant="warning"
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
                    <Text>
                        The <strong>{instance?.name}</strong> Apicurio Registry instance and all artifacts will be deleted. Applications will no longer have access to the artifacts in this instance.
                    </Text>
                </TextContent>
                <Alert isInline variant="info"
                    title="To save your data for future use, download a zip file of all the artifacts."
                    actionLinks={
                        <AlertActionLink onClick={() => onDownload()}>
                            {renderDownloadArtifacts && instance && renderDownloadArtifacts(instance, "Download artifacts (.zip)") as string}
                        </AlertActionLink>
                    }>
                    <Text component={TextVariants.p}>
                        To ensure your download is successful, wait for the download to complete before deleting the instance.
                    </Text>
                </Alert>
                <FormGroup fieldId="delete-instance-verify-name">
                    <Text component={TextVariants.p}>Type <strong>{instance?.name}</strong> to confirm:</Text>
                    <TextInput
                        isRequired
                        type="text"
                        id="delete-instance-verify-name"
                        name="delete-instance-verify-name"
                        value={nameVerify}
                        onChange={(value) => { setNameVerify(value) }}
                    />
                </FormGroup>

                <Checkbox
                    id="delete-instance-verify-check"
                    label={checkboxText}
                    onChange={setUnderstand}
                    isChecked={understand}
                />
            </Form>
        </Modal>
    );
};
