/**
 * @license
 * Copyright 2021 Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ConfigType} from './config.type';
import {Service} from "../baseService";


const DEFAULT_REGISTRY_CONFIG: any = {
    artifacts: {
        url: ""
    },
    auth: {
        type: "none"
    },
    features: {
        readOnly: false,
        breadcrumbs: false,
        multiTenant: true,
        roleManagement: true
    },
    ui: {
        navPrefixPath: ""
    }
};

const DEFAULT_CONFIG: ConfigType = {
    auth: {
        options: {
        },
        type: "none"
    },
    tenants: {
        api: "http://localhost:8585/api/v1"
    },
    registry: {
        apis: "http://localhost:8080/t/:tenantId/apis",
        config: DEFAULT_REGISTRY_CONFIG
    }
};

/**
 * A simple configuration service.  Reads information from a global "ApicurioRegistryTsUiConfig" variable
 * that is typically included via JSONP.
 */
export class ConfigService implements Service {
    private config: ConfigType;

    constructor() {
        const w: any = window;
        if (w.ApicurioRegistryMtUiConfig) {
            this.config = w.ApicurioRegistryMtUiConfig;
            console.info("[ConfigService] Found app config.");
        } else {
            console.warn("[ConfigService] App config not found! (using default)");
            this.config = DEFAULT_CONFIG;
        }
    }

    public init(): void {
        // Nothing to init (done in c'tor)
    }

    public authType(): string {
        if (!this.config.auth || !this.config.auth.type) {
            return "";
        }
        return this.config.auth.type;
    }

    public authOptions(): any {
        if (!this.config.auth || !this.config.auth.options) {
            return "";
        }
        return this.config.auth.options;
    }

    public tenantsApi(): string {
        if (!this.config.tenants || !this.config.tenants.api) {
            return "";
        }
        return this.config.tenants.api;
    }

    public registryApisUrl(): string {
        return this.config.registry.apis || "";
    }

    public registryConfig(): any {
        return this.config.registry.config || DEFAULT_CONFIG;
    }
}
