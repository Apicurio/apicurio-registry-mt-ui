var ApicurioRegistryMtUiConfig = {
    auth: {
        type: "none"
    },
    tenants: {
        api: "http://localhost:8585/api/v1"
    },
    registry: {
        apis: "http://localhost:8080/t/:tenantId/apis",
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
                multiTenant: true,
                roleManagement: false
            },
            ui: {
                navPrefixPath: ""
            }
        }
    }
};
