var ApicurioRegistryMtUiConfig = {
    auth: {
        options: {
        },
        type: "none"
    },
    tenants: {
        api: "$TENANT_MANAGER_API"
    },
    registry: {
        apis: "$MT_REGISTRY_APIS",
        config: {
            artifacts: {
                type: "rest",
                url: ""
            },
            auth: {
                type: "none"
            },
            features: {
                readOnly: false,
                breadcrumbs: false,
                multiTenant: true,
                multiTenantUrl: "$MT_REGISTRY_APIS/registry"
            },
            mode: "prod",
            ui: {
                contextPath: null,
                navPrefixPath: null
            }
        }
    }
};
