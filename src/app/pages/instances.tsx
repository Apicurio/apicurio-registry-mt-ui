import React, {FunctionComponent, useRef, useState} from "react";
import "./instances.css";
import {
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

export type InstancesPageProps = {
};

export const InstancesPage: FunctionComponent<InstancesPageProps> = ({}: InstancesPageProps) => {
    const [ isDrawerExpanded, setDrawerExpanded ] = useState(true);

    const drawerRef: any = useRef<HTMLSpanElement>();

    const onDrawerExpand = (): void => {
        drawerRef.current && drawerRef.current.focus();
    };

    // The content of the side panel.  This should be a details panel with metadata and history (for example).
    const panelContent: React.ReactNode = (
        <DrawerPanelContent>
            <DrawerHead>
                <TextContent>
                    <Text component={TextVariants.small} className="pf-u-mb-0">
                        Name
                    </Text>
                    <Title
                        headingLevel="h2"
                        size={TitleSizes['xl']}
                        className="pf-u-mt-0"
                    >
                        <div className="instance-details-header">
                            Instance Name Goes Here
                        </div>
                    </Title>
                </TextContent>
                <DrawerActions>
                    <DrawerCloseButton onClick={() => setDrawerExpanded(false)} />
                </DrawerActions>
            </DrawerHead>
            <DrawerPanelBody>
                <h1>PANEL BODY</h1>
            </DrawerPanelBody>
        </DrawerPanelContent>
    );

    return (
        <React.Fragment>
            <Drawer isStatic={false} position="right" isInline={false} isExpanded={isDrawerExpanded} onExpand={onDrawerExpand}>
                <DrawerContent panelContent={panelContent}>
                    <DrawerContentBody className="home-panel-body">
                        <PageSection variant={PageSectionVariants.light} className="summary pf-m-padding-on-xl">
                            <TextContent>
                                <Text component="h1" className="title">Apicurio Registry Instances</Text>
                                <Text component="p" className="description">
                                    Aliquam sit amet molestie leo, ut dapibus odio. Morbi tempor ac justo a sagittis.
                                    Quisque ipsum sapien, finibus at viverra eget, scelerisque nec erat. Morbi tempus
                                    euismod est eu interdum.
                                </Text>
                            </TextContent>
                        </PageSection>
                        <PageSection variant={PageSectionVariants.default} isFilled={true}>
                            <h1>INSTANCES GO HERE</h1>
                        </PageSection>
                    </DrawerContentBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    );
}
