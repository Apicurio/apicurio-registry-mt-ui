import { createContext, useContext } from "react";

export type AppsType = {
    showNav: boolean;
    designer: string;
}

export type FederatedModulesType = {
    registry: string;
}

export type ApiUrlsType = {
    srs: string;
}

export type AuthType = {
    enabled: boolean;
}

export type RegistryMtConfigType = {
    apis: ApiUrlsType;
    federatedModules: FederatedModulesType;
    auth: AuthType;
    apps?: AppsType;
}

export const RegistryMtConfigContext = createContext<RegistryMtConfigType | undefined>(
    undefined
);
export const useRegistryMtContext = (): RegistryMtConfigType | undefined =>
    useContext(RegistryMtConfigContext);
