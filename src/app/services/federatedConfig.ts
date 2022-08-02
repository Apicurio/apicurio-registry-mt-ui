import {useParams} from "react-router-dom";
import {useAlert, useBasename} from "@rhoas/app-services-ui-shared";
import {Basename} from "@rhoas/app-services-ui-shared/dist/esm/contexts/basename/Basename";
import {Alert} from "@rhoas/app-services-ui-shared/dist/esm/contexts/alert/Alert";
import {Registry} from "@rhoas/registry-management-sdk";

export enum AlertVariant {
    success = "success",
    danger = "danger",
    warning = "warning",
    info = "info",
    default = "default"
}

export type AlertProps = {
    /**
     * Unique key
     */
    id?: string;
    /**
     * Flag to automatically call `onDismiss` after `dismissDelay` runs out.
     */
    autoDismiss?: boolean;
    /**
     * Flag to show/hide notification close button.
     */
    dismissable?: boolean;
    /**
     * Alert variant
     */
    variant: AlertVariant;
    /**
     * Alert title
     */
    title: string;
    /**
     * Alert description
     */
    description?: string;
    /**
     * Time period after which `onDismiss` is called.
     */
    dismissDelay?: number;
    /**
     * Unique request ID.
     */
    requestId?: string;
    /**
     * Unique sentry error ID.
     */
    sentryId?: string;
    /**
     * data-testid attribute
     */
    dataTestId?: string;
};

export declare type Alerts = {
    addAlert: ({ id, title, variant, description, dataTestId, autoDismiss, dismissable, dismissDelay, requestId, sentryId }: AlertProps) => void;
};


export interface FeaturesConfig {
    readOnly?: boolean;
    breadcrumbs?: boolean;
    multiTenant?: boolean;
    roleManagement?: boolean;
    settings?: boolean;
    alerts?: Alerts;
}

export interface ArtifactsConfig {
    url: string;
}

export interface UiConfig {
    contextPath?: string;
    navPrefixPath?: string;
}

export interface AuthConfig {
    type: string;
    rbacEnabled: boolean;
    obacEnabled: boolean;
}

// Used when `type=keycloakjs`
export interface OidcJsAuthConfig extends AuthConfig {
    options?: any;
}

// Used when `type=none`
export interface NoneAuthConfig extends AuthConfig {

}

// Used when `type=gettoken`
export interface GetTokenAuthConfig extends AuthConfig {
    getToken: () => Promise<string>;
}

export interface Principal {
    principalType: "USER_ACCOUNT" | "SERVICE_ACCOUNT";
    id: string;
    displayName?: string;
    emailAddress?: string;
}

export interface ApicurioRegistryFederatedConfig {
    artifacts: ArtifactsConfig;
    auth: OidcJsAuthConfig | NoneAuthConfig | GetTokenAuthConfig;
    principals?: Principal[];
    features?: FeaturesConfig;
    ui: UiConfig;
}


export interface FederatedConfigFactory {
    create: (registry: Registry) => ApicurioRegistryFederatedConfig;
}

/**
 * React hook to get the LocalStorage service.
 */
export const useFederatedConfig: () => FederatedConfigFactory = (): FederatedConfigFactory => {
    const params: any = useParams();
    const basename: Basename = useBasename();
    const alerts: Alert = useAlert() || {};

    const instanceId: string = params["instanceId"];
    const navPrefixPath: string = `${basename.getBasename()}/instances/${instanceId}/`;

    const createConfig = (registry: Registry): ApicurioRegistryFederatedConfig => {
        const artifactsUrl: string = (registry.registryUrl || "") + "/apis/registry";
        const config: ApicurioRegistryFederatedConfig = {
            artifacts: {
                url: artifactsUrl
            },
            auth: {
                type: "none",
                rbacEnabled: false,
                obacEnabled: false
            },
            ui: {
                navPrefixPath
            },
            features: {
                alerts,
                multiTenant: true,
                roleManagement: false,
                breadcrumbs: false,
                readOnly: false,
                settings: true
            }
        };
        console.debug("Using federated config: ", config);
        return config;
    };

    return {
        create: createConfig
    };

};
