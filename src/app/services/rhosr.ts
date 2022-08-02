import {Configuration, RegistriesApi, Registry, RegistryCreate, RegistryList} from '@rhoas/registry-management-sdk';
import {Auth, useAuth} from "@rhoas/app-services-ui-shared";
import {RegistryMtConfigType, useRegistryMtContext} from "@app/contexts/config";
import {LocalStorageService, useLocalStorageService} from "@app/services/local-storage";


/**
 * Async function to get the RHOSR instances.  Uses a provided auth token and API
 * base path to create a RHOSR SDK instance.
 * @param auth the application auth
 * @param basePath base path of the fleet manager API
 */
async function getRegistries(auth: Auth, basePath: string): Promise<Registry[]> {
    console.debug("[RhosrService] Getting a list of registries from: ", basePath);
    const token: string | undefined = auth?.srs ? await auth?.srs.getToken() : "";
    const api: RegistriesApi = new RegistriesApi(
        new Configuration({
            accessToken: token,
            basePath,
        })
    );
    return api.getRegistries().then(res => {
        const registries: RegistryList = res?.data;
        return registries.items?.sort((r1, r2) => {return r1.name!.localeCompare(r2.name!)});
    });
}

/**
 * Gets information about a single registry instances by its unique ID.
 * @param auth the application auth
 * @param local the local storage service
 * @param id the registry instance ID
 * @param basePath base path of the fleet manager API
 */
async function getRegistry(auth: Auth, local: LocalStorageService, id: string, basePath: string): Promise<Registry> {
    console.debug("[RhosrService] Getting a single registry from: ", basePath);
    const cacheKey: string = `services.rhosr.getRegistry.${id}`;
    const cachedRegistry: Registry | undefined = local.getConfigProperty(cacheKey, undefined) as Registry | undefined;

    if (cachedRegistry) {
        // TODO limit the TTL of the cache entry somehow
        console.debug("[RhosrService] Cache hit for registry with ID: ", id);
        return Promise.resolve(cachedRegistry);
    }

    const token: string | undefined = auth?.srs ? await auth?.srs.getToken() : "";
    const api: RegistriesApi = new RegistriesApi(
        new Configuration({
            accessToken: token,
            basePath,
        })
    );
    return api.getRegistry(id).then(res => {
        const registry: Registry = res?.data as Registry;
        local.setConfigProperty(cacheKey, registry);
        return registry;
    });
}

/**
 * Creates a registry.
 * @param auth
 * @param basePath
 * @param data
 */
async function createRegistry(auth: Auth, basePath: string, data: RegistryCreate): Promise<Registry> {
    console.debug("[RhosrService] Creating a new registry instance: ", name);
    const token: string | undefined = auth?.srs ? await auth?.srs.getToken() : "";
    const api: RegistriesApi = new RegistriesApi(
        new Configuration({
            accessToken: token,
            basePath,
        })
    );
    return api.createRegistry(data).then(res => {
        return res?.data as Registry;
    });
}


/**
 * The RHOSR Service interface.
 */
export interface RhosrService {
    getRegistries(): Promise<Registry[]>;
    getRegistry(id: string): Promise<Registry>;
    createRegistry(data: RegistryCreate): Promise<Registry>;
}

/**
 * React hook to get the RHOSR service.
 */
export const useRhosrService: () => RhosrService = (): RhosrService => {
    const auth: Auth = useAuth();
    const config: RegistryMtConfigType | undefined = useRegistryMtContext();
    const local: any = useLocalStorageService();

    return {
        getRegistries: () => getRegistries(auth, config?.apis.srs || ""),
        getRegistry: (id) => getRegistry(auth, local, id, config?.apis.srs || ""),
        createRegistry: (data: RegistryCreate) => createRegistry(auth, config?.apis.srs || "", data)
    };
};
