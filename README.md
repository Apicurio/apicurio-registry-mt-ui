# Apicurio Registry Multi-Tenant UI
A React web application used when running the Apicurio Registry project in a
multi-tenant aware configuration.  This UI requires that the following Apicurio
Registry related components are all running together in a multi-tenant config:

* [Apicurio Registry (multi-tenant enabled)](https://github.com/Apicurio/apicurio-registry)
* [Service Registry Fleet Manager](https://github.com/bf2fc6cc711aee1a0c2a/srs-fleet-manager)
* [Apicurio Registry Tenant Manager](https://github.com/Apicurio/apicurio-registry/tree/master/multitenancy)

# Prerequisites

In order for this app to work, you need to also be running the Apicurio Registry
UI which provides a set of federated module components that this project uses.
The UI will fail to load if those are not available.  To run the Apicurio Registry
UI go here:

https://github.com/Apicurio/apicurio-registry/tree/master/ui

The Apicurio Registry UI UI should be available on port 8888 (which is the default port
configured for that project).

# Build and run (local)
To run the app locally, do the following:

```bash
$ yarn install
$ yarn start:dev
```

Then open your browser (if it doesn't automatically open) to:

http://localhost:7777/

By default, `apicurio-registry-mt-ui` will start on localhost with authentication 
enabled.  This is called the "local" profile and is the default.  However, there are multiple
profiles supported:

* `local` - the default mode with authentication enabled and local URLs for services (e.g. Fleet Manager)
* `operate-first` - authentication enabled (via Apicurio SSO) and using Operate First for services (e.g. Fleet Manager)

To run with an alternative profile, set the `REGISTRY_MT_CONFIG` environment
variable.  So for example:

```bash
$ export REGISTRY_MT_CONFIG=operate-first
$ yarn start:dev
```

# Build and Run Docker Image
To run a production build using docker:

```bash
$ yarn install
$ yarn build
$ docker build -t="apicurio/apicurio-registry-mt-ui" --rm .
```

## Run the Docker Image

```bash
$ docker run -it -p 7777:8080 apicurio/apicurio-registry-mt-ui
```
Then open your browser to http://localhost:7777/


## Customizing the container
When running the docker container you can customize it with the following environment
variables:

* `REGISTRY_UI_URL` - The URL to the `apicurio_registry` federated modules.  Defaults to `http://localhost:8888/apicurio_registry.js`
* `SRS_API_URL` - The URL to the Service Registry Fleet Manager API.  Defaults to `http://localhost:8081`
* `AUTH_ENABLED` - Whether to enable Keycloak authentication.  Defaults to `false`
* `KEYCLOAK_REALM` - The Keycloak realm to use for authentication.  Defaults to `operate-first-apicurio`
* `KEYCLOAK_URL` - The Keycloak auth URL to use for authentication.  Defaults to `https://auth.apicur.io/auth`
* `KEYCLOAK_SSL_REQUIRED` - The "SSL required" setting for Keycloak authentication.  Defaults to `external`
* `KEYCLOAK_RESOURCE` - The Keycloak resource to use for authentication.  Defaults to `sr-ui`
