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

import {BaseService} from "../baseService";
import {NewRegistryTenantRequest} from "../../models";
import {RegistryTenant} from "../../models/registryTenant.model";

/**
 * The tenants service.  Used to query the backend API to manage tenants.
 */
export class TenantsService extends BaseService {

    public createTenant(data: NewRegistryTenantRequest): Promise<RegistryTenant> {
        const endpoint: string = this.endpoint("/tenants");
        const headers: any = {};
        headers["Content-Type"] = "application/json";
        return this.httpPostWithReturn<any, RegistryTenant>(endpoint, data, this.options(headers));
    }

    public getTenants(): Promise<RegistryTenant[]> {
        this.logger.debug("[TenantsService] Getting tenants");
        const endpoint: string = this.endpoint("/tenants");
        return this.httpGet<RegistryTenant[]>(endpoint);
    }

    public getTenant(tenantId: string): Promise<RegistryTenant> {
        this.logger.debug("[TenantsService] Getting single tenant with ID %s", tenantId);
        const endpoint: string = this.endpoint("/tenants/:tenantId", { tenantId });
        return this.httpGet<RegistryTenant>(endpoint);
    }

}
