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
            multiTenantUrl: "$MT_REGISTRY_API"
        },
        mode: "prod",
        ui: {
            contextPath: null
        }
    }
};
