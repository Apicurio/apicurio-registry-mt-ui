import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import { InstancesPage } from "@app/pages/instances";
import { InstanceArtifactsPage } from "@app/pages/instance-artifacts";
import { InstanceGlobalRulesPage } from "@app/pages/instance-global-rules";
import { InstanceRolesPage } from "@app/pages/instance-roles";
import { InstanceSettingsPage } from "@app/pages/instance-settings";
import { InstanceArtifactVersionPage } from "@app/pages/instance-artifact-version";
import { InstanceArtifactRedirectPage } from "@app/pages/instance-artifact";


export const AppRoutes = (): ReactElement => {
    // Function to force the Artifact Version Page to fully remount each time we navigate to it.  This
    // is needed because we want the page to fully rerender whenever the browser location changes, which
    // happens when switching between versions of the artifact content (e.g. switch from version 1 to version 3).
    const instanceArtifactVersionPage = (props: any): React.ReactElement => {
        const location: string = props.location.pathname;
        return (
            <InstanceArtifactVersionPage key={location} {...props} />
        );
    };

    return (
        <Switch>
            <Route path='/' exact={true} component={InstancesPage}/>
            <Route path='/instances/:instanceId' exact={true} component={InstanceArtifactsPage}/>
            <Route path='/instances/:instanceId/artifacts' exact={true} component={InstanceArtifactsPage}/>
            <Route path='/instances/:instanceId/rules' exact={true} component={InstanceGlobalRulesPage}/>
            <Route path='/instances/:instanceId/roles' exact={true} component={InstanceRolesPage}/>
            <Route path='/instances/:instanceId/settings' exact={true} component={InstanceSettingsPage}/>
            <Route path='/instances/:instanceId/artifacts/:groupId/:artifactId' exact={true} component={InstanceArtifactRedirectPage}/>
            <Route path='/instances/:instanceId/artifacts/:groupId/:artifactId/versions/:version' exact={true} component={instanceArtifactVersionPage} />
        </Switch>
    );
};
