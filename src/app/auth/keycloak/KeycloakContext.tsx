import React, { createContext, FunctionComponent } from "react";
import { KeycloakInstance, KeycloakProfile } from "keycloak-js";
import { getKeyCloakToken, getParsedKeyCloakToken, } from "@app/auth/keycloak/keycloakAuth";
import { Auth, AuthContext } from "@rhoas/app-services-ui-shared";
import { RegistryMtConfigType, useRegistryMtContext } from "@app/contexts/config";

// This is a context which can manage the keycloak
export interface IKeycloakContext {
    keycloak?: KeycloakInstance | undefined;
    profile?: KeycloakProfile | undefined;
}

export const KeycloakContext = createContext<IKeycloakContext>({
    keycloak: undefined,
});

export type KeycloakAuthProviderProps = {
    children?: React.ReactNode;
};

export const KeycloakAuthProvider: FunctionComponent<KeycloakAuthProviderProps> = (props) => {
    const config: RegistryMtConfigType | undefined = useRegistryMtContext();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const noAuth: Auth = {};

    // If authentication is not enabled, then the auth context will be empty `{}`.  Other
    // components can check for an empty auth context and react (pun intended) accordingly.
    if (!config?.auth.enabled) {
        return (
            <AuthContext.Provider value={noAuth}>
                {props.children}
            </AuthContext.Provider>
        );
    }

    const getUsername = () => {
        return getParsedKeyCloakToken().then(
            (token) => (token as Record<string, string>)["username"]
        );
    };
    const isOrgAdmin = () => {
        return getParsedKeyCloakToken().then(
            (token) => (token as Record<string, boolean>)["is_org_admin"]
        );
    };
    const authTokenContext = {
        srs: {
            getToken: getKeyCloakToken,
        },
        apicurio_registry: {
            getToken: getKeyCloakToken,
        },
        getUsername,
        isOrgAdmin,
    } as Auth;

    return (
        <AuthContext.Provider value={authTokenContext}>
            {props.children}
        </AuthContext.Provider>
    );
};
