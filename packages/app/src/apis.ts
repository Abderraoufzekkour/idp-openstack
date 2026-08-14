import {
  configApiRef,
  createApiFactory,
  discoveryApiRef,
  oidcAuthApiRef,
  AnyApiFactory,
} from '@backstage/core-plugin-api';
import { OidcAuth } from '@backstage/core-app-api';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: oidcAuthApiRef,
    deps: { discoveryApi: discoveryApiRef, configApi: configApiRef },
    factory: ({ discoveryApi, configApi }) =>
      OidcAuth.create({
        discoveryApi,
        configApi,
        provider: 'oidc',
      }),
  }),
];
