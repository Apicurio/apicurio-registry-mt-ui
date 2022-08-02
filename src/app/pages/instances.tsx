import React, {FunctionComponent, useEffect, useRef, useState} from "react";
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
import {Registry, RegistryCreate} from '@rhoas/registry-management-sdk';
import {CreateInstanceModal, RegistryInstances} from "@app/pages/components";
import {RhosrService, useInterval, useRhosrService} from "@app/services";
import {AlertsService, useAlertsService} from "@app/services/alerts";

export type InstancesPageProps = {
};

export const InstancesPage: FunctionComponent<InstancesPageProps> = ({}: InstancesPageProps) => {
    const [ isLoading, setLoading ] = useState(false);
    const [ isDrawerExpanded, setDrawerExpanded ] = useState(false);
    const [ drawerInstance, setDrawerInstance ] = useState<Registry>();
    const [ instances, setInstances ] = useState<Registry[]>();
    const [ selectedInstance, setSelectedInstance ] = useState<Registry>();
    const [ isCreateModalOpen, setCreateModalOpen ] = useState(false);
    const [ createError, setCreateError ] = useState<string>();

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

    const refresh = (callback?: () => void): void => {
        rhosr.getRegistries().then(data => {
            setInstances(data);
            if (callback) {
                callback();
            }
        }).catch(error => {
            // TODO handle this error better
            console.error("[RegistryInstances] Error getting registries: ", error);
            setInstances([]);
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
        <DrawerPanelContent>
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
                            { drawerInstance?.name }
                        </div>
                    </Title>
                </TextContent>
                <DrawerActions>
                    <DrawerCloseButton onClick={() => setDrawerExpanded(false)} />
                </DrawerActions>
            </DrawerHead>
            <DrawerPanelBody>

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
                    >Registry API</Title>
                    <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                        {drawerInstance?.href}
                    </ClipboardCopy>

                    <Title
                        headingLevel="h4"
                        size={TitleSizes['s']}
                        className="pf-u-mt-0"
                    >Registry Url</Title>
                    <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                        {drawerInstance?.registryUrl}
                    </ClipboardCopy>

                    <Title
                        headingLevel="h4"
                        size={TitleSizes['s']}
                        className="pf-u-mt-0"
                    >Registry Browser Url</Title>
                    <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied">
                        {drawerInstance?.browserUrl}
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
                                               onConnectInstanceClick={(instance) => {
                                                    console.debug("[InstancesPage] Open connect drawer: ", instance);
                                                    setDrawerInstance(instance);
                                                    setDrawerExpanded(!isDrawerExpanded);
                                               }}
                                               onDeleteInstanceClick={(instance) => {
                                                   console.debug("[InstancesPage] TODO: Instance should be deleted: ", instance);
                                               }}
                                               onInstanceSelected={(instance) => {
                                                    console.debug("[InstancesPage] Instance selected: ", instance);
                                                    setSelectedInstance(instance)
                                               }} />
                        </PageSection>
                    </DrawerContentBody>
                </DrawerContent>
            </Drawer>
            <CreateInstanceModal isOpen={isCreateModalOpen} errorMsg={createError} onCreate={doCreateInstance} onCancel={() => {setCreateModalOpen(false)}}>

            </CreateInstanceModal>
        </React.Fragment>
    );
}
