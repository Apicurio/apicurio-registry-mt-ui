var ApicurioRegistryMtUiConfig = {
    auth: {
        type: "keycloakjs",
        options: {
            url: "https://studio-auth.apicur.io/auth",
            realm: "apicurio-local",
            clientId:"apicurio-registry",
            onLoad: "login-required"
        }
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
                type: "gettoken",
                getToken: null
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
        }
    }
};
