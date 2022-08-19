import { AlertVariant, useAlert } from "@rhoas/app-services-ui-shared";
import React from "react";
import { Registry } from "@rhoas/registry-management-sdk";


export interface AlertsService {
    instanceCreated(instance: Registry): void;
    instanceDeleted(instance: Registry): void;
    instanceDeleteError(instance: Registry): void;
}


/**
 * React hook to get the Alerts service.
 */
export const useAlertsService: () => AlertsService = (): AlertsService => {
    const { addAlert } = useAlert() || {};

    return {
        instanceCreated(instance: Registry): void {
            addAlert({
                title: "Create successful",
                description: `Registry instance '${instance.name}' was created (it may take a few seconds to become available).`,
                variant: AlertVariant.success,
                dataTestId: "toast-instance-created"
            });
        },

        instanceDeleted(instance: Registry): void {
            addAlert({
                title: "Delete successful",
                description: `Registry instance '${instance.name}' was marked for deletion.`,
                variant: AlertVariant.success,
                dataTestId: "toast-instance-deleted"
            });
        },

        instanceDeleteError(instance) : void {
            addAlert({
                title: "Error while deleting the instance",
                description: `There was an error while marking the Registry instance '${instance.name} for deletion. Please try it again.'`,
                variant: AlertVariant.danger,
                dataTestId: "toast-instance-deleted" //TODO Whats that?
            });
        },
    };
};
