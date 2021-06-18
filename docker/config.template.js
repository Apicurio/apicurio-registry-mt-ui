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
                url: ""
            },
            auth: {
                type: "none"
            },
            features: {
                readOnly: false,
                breadcrumbs: false,
                multiTenant: true
            },
            ui: {
                navPrefixPath: ""
            }
        }
    }
};
