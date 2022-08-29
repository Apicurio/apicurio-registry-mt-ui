import React, { FunctionComponent, useEffect, useState } from "react";
import { IsLoading } from "@app/components";
import { useHistory, useParams } from "react-router-dom";
import { FederatedConfigFactory, RhosrService, useFederatedConfig, useRhosrService } from "@app/services";
import { Registry } from "@rhoas/registry-management-sdk";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const FederatedArtifactRedirectPage = React.lazy(() => import("@apicurio/registry/FederatedArtifactRedirectPage"));

export type InstanceArtifactRedirectPageProps = Record<string, unknown>;

export const InstanceArtifactRedirectPage: FunctionComponent<InstanceArtifactRedirectPageProps> = () => {
    const [ isLoading, setLoading ] = useState<boolean>(true);
    const [ registry, setRegistry ] = useState<Registry>();

    const federatedConfig: FederatedConfigFactory = useFederatedConfig();
    const params: any = useParams();
    const history: any = useHistory();
    const rhosr: RhosrService = useRhosrService();

    const instanceId: string = params["instanceId"];
    const groupId: string = params["groupId"];
    const artifactId: string = params["artifactId"];

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
            <IsLoading condition={isLoading}>
                <React.Suspense fallback="Loading Artifact">
                    <FederatedArtifactRedirectPage config={() => { return federatedConfig.create(registry as Registry); }} history={history}
                        groupId={groupId} artifactId={artifactId} />
                </React.Suspense>
            </IsLoading>
        </React.Fragment>
    );
};
