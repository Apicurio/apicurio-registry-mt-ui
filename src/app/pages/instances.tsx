import React, {FunctionComponent, ReactNode, useEffect, useRef, useState} from "react";
import "./instances.css";
import {
    ClipboardCopy,
    Drawer,
    DrawerActions,
    DrawerCloseButton,
    DrawerContent,
    DrawerContentBody,
    DrawerHead,
    DrawerPanelBody,
    DrawerPanelContent,
    PageSection,
    PageSectionVariants,
    Text,
    TextContent,
    TextVariants,
    Title,
    TitleSizes
} from "@patternfly/react-core";
import {Registry, RegistryCreate, RegistryStatusValue} from '@rhoas/registry-management-sdk';
import {CreateInstanceModal, RegistryInstances} from "@app/pages/components";
import {RhosrService, useInterval, useRhosrService} from "@app/services";
import {AlertsService, useAlertsService} from "@app/services/alerts";
import { DeleteInstanceModal } from "./components/delete-instance.modal";
import { DownloadArtifactsLink } from "./components/download-artifacts-link";

export type InstancesPageProps = {
};

export const InstancesPage: FunctionComponent<InstancesPageProps> = ({}: InstancesPageProps) => {
    const [ isLoading, setLoading ] = useState(false);
    const [ isDrawerExpanded, setDrawerExpanded ] = useState(false);
    const [ instances, setInstances ] = useState<Registry[]>();
    const [ selectedInstance, setSelectedInstance ] = useState<Registry>();
    const [ isCreateModalOpen, setCreateModalOpen ] = useState(false);
    const [ createError, setCreateError ] = useState<string>();
    const [ instanceToDelete, setInstanceToDelete ] = useState<Registry>();

    const drawerRef: any = useRef<HTMLSpanElement>();

    const rhosr: RhosrService = useRhosrService();
    const alerts: AlertsService = useAlertsService();

    const onDrawerExpand = (): void => {
        drawerRef.current && drawerRef.current.focus();
    };

    const doCreateInstance = (data: RegistryCreate): void => {
        rhosr.createRegistry(data).then(registry => {
            console.debug("Registry created: ", registry);
            alerts.instanceCreated(registry);
            setCreateModalOpen(false);
            // TODO add the registry to the list of registries and sort the result (instead of calling refresh())
            refresh();
        }).catch(error => {
            console.error("Error creating registry: ", error);
            setCreateError(`Error creating registry: ${error}`);
        });
    };

    const doDeleteInstance = (): void => {
        if (!instanceToDelete) return;

        const instance = instanceToDelete
        setInstanceToDelete(undefined);

        rhosr.deleteRegistry(instance.id).then(() => {
            alerts.instanceDeleted(instance)
            refresh();
        }).catch(error => {
            alerts.instanceDeleteError(instance)
            console.error("Error deleting registry: ", error);
        });
    }

    const renderDownloadArtifacts = (instance: Registry, label: string) : React.ReactNode => {
        return <DownloadArtifactsLink label={label} instance={instance} getExportDownloadUrlForRegistry={rhosr.getExportDownloadUrlForRegistry}/>
    }

    const refresh = (callback?: () => void): void => {
        rhosr.getRegistries().then(data => {
            setInstances(data);
            if (callback) {
                callback();
            }
        }).catch(error => { 
            console.error("[RegistryInstances] Error getting registries: ", error);
            setInstances(undefined);
            if (callback) {
                callback();
            }
        });
    };
    useInterval(refresh, 5000);

    useEffect(() => {
        setLoading(true);
        setSelectedInstance(undefined);
        refresh(() => {
            setLoading(false);
        });
    }, []);

    // The content of the side panel.  This should be a details panel with metadata and history (for example).
    const panelContent: React.ReactNode = (
        <DrawerPanelContent isResizable={true} defaultSize="40%">
            <DrawerHead>
                <TextContent>
                    <Text component={TextVariants.small} className="pf-u-mb-0">
                        Service Registry instance name
                    </Text>
                    <Title
                        headingLevel="h2"
                        size={TitleSizes['xl']}
                        className="pf-u-mt-0"
                    >
                        <div className="instance-details-header">
                            { selectedInstance?.name }
                        </div>
                    </Title>
                </TextContent>
                <DrawerActions>
                    <DrawerCloseButton onClick={() => {
                        setSelectedInstance(undefined);
                        setDrawerExpanded(false);
                    }} />
                </DrawerActions>
            </DrawerHead>
            <DrawerPanelBody className="instance-drawer-panel-body">
                <Title
                    headingLevel="h3"
                    size={TitleSizes['l']}
                    className="pf-u-mt-0"
                ><div>Connection</div></Title>
                <Text component={TextVariants.small} className="pf-u-mb-0">
                    Use this information to connect an application or tool to this Service Registry.
                </Text>

                <Title
                    headingLevel="h4"
                    size={TitleSizes['s']}
                    className="pf-u-mt-0"
                >Core Registry API</Title>
                <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                    {`${selectedInstance?.registryUrl}/apis/registry/v2`}
                </ClipboardCopy>

                <Title
                    headingLevel="h4"
                    size={TitleSizes['s']}
                    className="pf-u-mt-0"
                >Schema Registry compatibility API</Title>
                <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                    {`${selectedInstance?.registryUrl}/apis/ccompat/v6`}
                </ClipboardCopy>

                <Title
                    headingLevel="h4"
                    size={TitleSizes['s']}
                    className="pf-u-mt-0"
                >CNCF Schema Registry API</Title>
                <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                    {`${selectedInstance?.registryUrl}/apis/cncf/v0`}
                </ClipboardCopy>
            </DrawerPanelBody>
        </DrawerPanelContent>
    );

    return (
        <React.Fragment>
            <Drawer isStatic={false} position="right" isInline={false} isExpanded={isDrawerExpanded} onExpand={onDrawerExpand}>
                <DrawerContent panelContent={panelContent}>
                    <DrawerContentBody className="instances-panel-body">
                        <PageSection variant={PageSectionVariants.light} className="summary pf-m-padding-on-xl">
                            <TextContent>
                                <Text component="h1" className="title">Apicurio Registry Instances</Text>
                                <Text component="p" className="description">
                                    Manage your list of registry instances below.  Drill into an instance to manage
                                    its configuration settings and collection of registered artifacts.
                                </Text>
                            </TextContent>
                        </PageSection>
                        <PageSection variant={PageSectionVariants.default} isFilled={true}>
                            <RegistryInstances instances={instances}
                                               isLoadingInstances={isLoading}
                                               selectedInstance={selectedInstance}
                                               onCreateInstanceClick={() => {
                                                   setCreateError(undefined);
                                                   setCreateModalOpen(true);
                                               }}
                                               onDeleteInstanceClick={(instance) => {
                                                    setInstanceToDelete(instance);
                                                    console.debug("[InstancesPage] TODO: Instance should be deleted: ", instance);
                                               }}
                                               onInstanceSelected={(instance) => {
                                                    console.debug("[InstancesPage] Instance selected: ", instance, selectedInstance);
                                                    if (!instance) {
                                                        setDrawerExpanded(false);
                                                        setSelectedInstance(undefined);
                                                    } else if (instance.status === RegistryStatusValue.Ready) {
                                                        setSelectedInstance(instance);
                                                        setDrawerExpanded(true);
                                                    }
                                               }} />
                        </PageSection>
                    </DrawerContentBody>
                </DrawerContent>
            </Drawer>
            <CreateInstanceModal isOpen={isCreateModalOpen} errorMsg={createError} onCreate={doCreateInstance} onCancel={() => {setCreateModalOpen(false)}}/>
            <DeleteInstanceModal instance={instanceToDelete} renderDownloadArtifacts={renderDownloadArtifacts} onDelete={doDeleteInstance} onCancel={() => {setInstanceToDelete(undefined)}}/>
        </React.Fragment>
    );
}

