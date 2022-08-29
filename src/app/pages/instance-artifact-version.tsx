import React, { FunctionComponent, useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, PageSection, PageSectionVariants } from "@patternfly/react-core";
import { IsLoading, NavLink } from "@app/components";
import { useHistory, useParams } from "react-router-dom";
import { FederatedConfigFactory, RhosrService, useFederatedConfig, useRhosrService } from "@app/services";
import { Registry } from "@rhoas/registry-management-sdk";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const FederatedArtifactVersionPage = React.lazy(() => import("@apicurio/registry/FederatedArtifactVersionPage"));

export type InstanceArtifactVersionPageProps = Record<string, unknown>;

export const InstanceArtifactVersionPage: FunctionComponent<InstanceArtifactVersionPageProps> = () => {
    const [ isLoading, setLoading ] = useState<boolean>(true);
    const [ registry, setRegistry ] = useState<Registry>();

    const federatedConfig: FederatedConfigFactory = useFederatedConfig();
    const params: any = useParams();
    const history: any = useHistory();
    const rhosr: RhosrService = useRhosrService();

    const instanceId: string = params["instanceId"];
    const groupId: string = params["groupId"];
    const artifactId: string = params["artifactId"];
    const version: string = params["version"];

    useEffect(() => {
        rhosr.getRegistry(instanceId).then((reg) => {
            console.debug("Loaded registry: ", reg);
            setRegistry(reg);
            setLoading(false);
        }).catch(error => {
            // TODO handle errors here
            console.error(`Error loading registry with id ${instanceId}: `, error);
        });
    }, []);

    return (
        <React.Fragment>
            <PageSection variant={PageSectionVariants.light} className="mt-breadcrumbs">
                <Breadcrumb>
                    <BreadcrumbItem><NavLink location="/" data-testid="breadcrumb-lnk-instances">Registry Instances</NavLink></BreadcrumbItem>
                    <BreadcrumbItem><NavLink location={`/instances/${instanceId}`} data-testid="breadcrumb-lnk-instance">{registry?.name || instanceId}</NavLink></BreadcrumbItem>
                    <BreadcrumbItem isActive={true}>{artifactId}</BreadcrumbItem>
                </Breadcrumb>
            </PageSection>
            <IsLoading condition={isLoading}>
                <React.Suspense fallback="Loading ArtifactVersion">
                    <FederatedArtifactVersionPage config={() => { return federatedConfig.create(registry as Registry); }} history={history}
                        groupId={groupId} artifactId={artifactId} version={version} />
                </React.Suspense>
            </IsLoading>
        </React.Fragment>
    );
};
