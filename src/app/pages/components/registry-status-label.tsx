import React, { FunctionComponent } from "react";
import { Registry, RegistryStatusValue } from "@rhoas/registry-management-sdk";
import { Label } from "@patternfly/react-core";

export type RegistryStatusLabelProps = {
    registry: Registry|undefined;
};


export const RegistryStatusLabel: FunctionComponent<RegistryStatusLabelProps> = ({registry}: RegistryStatusLabelProps) => {

    const label = (): string => {
        if (registry) {
            return registry.status;
        }
        return "n/a";
    };

    const color = (): "blue" | "cyan" | "green" | "orange" | "purple" | "red" | "grey" => {
        if (registry) {
            if (registry.status === RegistryStatusValue.Accepted) {
                return "blue";
            } else if (registry.status === RegistryStatusValue.Provisioning) {
                return "cyan";
            } else if (registry.status === RegistryStatusValue.Ready) {
                return "green";
            } else if (registry.status === RegistryStatusValue.Failed) {
                return "red";
            } else if (registry.status === RegistryStatusValue.Deprovision) {
                return "orange";
            } else if (registry.status === RegistryStatusValue.Deleting) {
                return "purple";
            } else {
                return "grey";
            }
        }
        return "grey";
    };

    return (
        <Label color={color()}>{label()}</Label>
    );
};
