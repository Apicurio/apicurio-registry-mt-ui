import React, {useState, useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {AppLayout} from "@app/app-layout";
import {AppRoutes} from "@app/routes";
import {EmptyState, EmptyStateIcon, Spinner, Title} from "@patternfly/react-core";
import {RegistryMtConfigContext, RegistryMtConfigType} from "@app/contexts/config";
import {getKeycloakInstance} from "./auth/keycloak/keycloakAuth";
import {AlertProvider} from "@app/alerts";
import {
    KeycloakAuthProvider,
    KeycloakContext,
} from "@app/auth/keycloak/KeycloakContext";

import "@app/app.css";

import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/patternfly/utilities/Sizing/sizing.css";
import "@patternfly/patternfly/utilities/Spacing/spacing.css";
import "@patternfly/patternfly/utilities/Display/display.css";
import "@patternfly/patternfly/utilities/Flex/flex.css";
import {BasenameContext} from "@rhoas/app-services-ui-shared";


let keycloak: Keycloak.KeycloakInstance | undefined;
// @ts-ignore
const apiDesignerConfig: RegistryMtConfigType = RegistryMtConfig || window["RegistryMtConfig"];


const App: React.FunctionComponent = () => {
    const [initialized, setInitialized] = useState(false);

    const loadingState: React.ReactNode = (
        <EmptyState>
            <EmptyStateIcon variant="container" component={Spinner} />
            <Title size="lg" headingLevel="h4">
                Loading
            </Title>
        </EmptyState>
    )

    // Initialize Keycloak
    useEffect(() => {
        if (apiDesignerConfig.auth.enabled) {
            const init = async () => {
                keycloak = await getKeycloakInstance();
                setInitialized(true);
            };
            init();
        } else {
            setInitialized(true);
        }
    }, []);

    if (!initialized) return loadingState;

    return (
        <BasenameContext.Provider value={{getBasename: () => ""}}>
            <AlertProvider>
                <RegistryMtConfigContext.Provider value={apiDesignerConfig}>
                    <KeycloakContext.Provider value={{keycloak, profile: keycloak?.profile}}>
                        <KeycloakAuthProvider>
                            <Router>
                                <React.Suspense fallback={<Spinner/>}>
                                    <AppLayout>
                                        <AppRoutes/>
                                    </AppLayout>
                                </React.Suspense>
                            </Router>
                        </KeycloakAuthProvider>
                    </KeycloakContext.Provider>
                </RegistryMtConfigContext.Provider>
            </AlertProvider>
        </BasenameContext.Provider>
    );
}

export default App;
