import React, { ReactElement } from "react";
import {Route, Switch, useParams} from "react-router-dom";
import {InstancesPage} from "@app/pages/instances";


// @ts-ignore
//const FederatedHomePage = React.lazy(() => import("@apicurio/registry/FederatedHomePage"));
// @ts-ignore
//const FederatedEditorPage = React.lazy(() => import("@apicurio/registry/FederatedEditorPage"));


// const HomePage: React.FunctionComponent = () => {
//     const params: any = useParams();
//     console.info("[HomePage] Params: ", params);
//     return (<FederatedHomePage params={params} />);
// };
//
// const EditorPage: React.FunctionComponent = () => {
//     const params: any = useParams();
//     console.info("[EditorPage] Params: ", params);
//     return (<FederatedEditorPage params={params} />);
// };


export const AppRoutes = (): ReactElement => {
    return (
        <Switch>
            <Route path='/' exact={true} component={InstancesPage}/>
        </Switch>
    );
};
