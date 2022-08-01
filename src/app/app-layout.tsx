import React, {useContext} from "react";
import {Page, PageHeader} from "@patternfly/react-core";
import {KeycloakContext} from "@app/auth/keycloak/KeycloakContext";
import {RegistryMtConfigType, useRegistryMtContext} from "@app/contexts/config";

export type AppLayoutProps = {
    children?: React.ReactNode;
};

export const AppLayout: React.FunctionComponent<AppLayoutProps> = ({ children }) => {
    const keycloakContext = useContext(KeycloakContext);
    const config: RegistryMtConfigType | undefined = useRegistryMtContext();

    // Force the user to login if auth is enabled.
    if (config?.auth.enabled) {
        if (!keycloakContext.keycloak) {
            return (<div>403 Unauthorized</div>);
        }
        if (!keycloakContext.keycloak.authenticated) {
            keycloakContext.keycloak?.login();
            return <></>;
        }
    }

    const logoProps = {
        href: "https://github.com/Apicurio/apicurio-registry-mt-ui",
        target: "_blank"
    };

    const Header = (
        <PageHeader
            logo="Apicurio Registry (MT)"
            logoProps={logoProps}
            showNavToggle={false}
        />
    );

    return (
        <Page header={Header}>
            {children}
        </Page>
    );
}

