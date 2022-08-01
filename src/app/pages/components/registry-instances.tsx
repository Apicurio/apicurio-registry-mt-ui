import React, {FunctionComponent} from "react";
import "./registry-instances.css";
import {ListWithToolbar, NavLink} from "@app/components";
import {Registry} from "@rhoas/registry-management-sdk";
import {AddCircleOIcon} from "@patternfly/react-icons";
import {Button, Card, CardBody, EmptyState, EmptyStateBody, EmptyStateIcon, Title} from "@patternfly/react-core";


export type RegistryInstancesProps = {
    isLoadingInstances: boolean;
    instances: Registry[] | undefined;
    selectedInstance: Registry | undefined;
    onInstanceSelected: (instance: Registry | undefined) => void;
    onCreateInstanceClick: () => void;
}


export const RegistryInstances: FunctionComponent<RegistryInstancesProps> = (
            {isLoadingInstances, instances, selectedInstance, onInstanceSelected, onCreateInstanceClick}: RegistryInstancesProps) => {
    const emptyState: React.ReactNode = (
        <EmptyState>
            <EmptyStateIcon icon={AddCircleOIcon} />
            <Title headingLevel="h4" size="lg">
                No instances
            </Title>
            <EmptyStateBody>
                To get started, create a new registry instance.
            </EmptyStateBody>
            <Button variant="primary" onClick={onCreateInstanceClick}>Create registry instance</Button>
        </EmptyState>
    );

    const toolbar: React.ReactNode = (
        <h2>TOOLBAR HERE</h2>
    );

    return (
        <div className="instances">
            <ListWithToolbar toolbar={toolbar}
                             emptyState={emptyState}
                             isLoading={isLoadingInstances}
                             isFiltered={false}
                             isEmpty={!instances || instances.length === 0}>
                <Card isSelectable={false}>
                    <CardBody className="panel-body">
                        <div className="instance-list">
                            {
                                instances?.map((instance, index) => (
                                    <div className="instance" style={{"padding": "20px"}} onClick={() => { onInstanceSelected(instance) }}>
                                        <NavLink location={`/instances/${instance.id}`}>{instance.name}</NavLink>
                                    </div>
                                ))
                            }
                        </div>
                    </CardBody>
                </Card>
            </ListWithToolbar>
        </div>
    );
};
