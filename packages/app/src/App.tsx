import React from 'react';
import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import searchPlugin from '@backstage/plugin-search/alpha';
import scaffolderPlugin from '@backstage/plugin-scaffolder/alpha';
import userSettingsPlugin from '@backstage/plugin-user-settings/alpha';
import techdocsPlugin from '@backstage/plugin-techdocs/alpha';
import orgPlugin from '@backstage/plugin-org/alpha';
import kubernetesPlugin from '@backstage/plugin-kubernetes/alpha';
import { navModule } from './modules/nav';
import { SignInPageBlueprint } from '@backstage/plugin-app-react';
import { SignInPage } from '@backstage/core-components';

import { createFrontendModule, createApiExtension } from '@backstage/frontend-plugin-api';
import {
  configApiRef,
  createApiFactory,
  createApiRef,
  discoveryApiRef,
  oauthRequestApiRef,
} from '@backstage/core-plugin-api';
import { OAuth2 } from '@backstage/core-app-api';

// 1. Create the Custom API Ref for Keycloak
export const oidcAuthApiRef = createApiRef<any>({
  id: 'auth.oidc',
});

// 2. Register the API extension so the modern frontend knows how to handle the connection
const oidcApiExtension = createApiExtension({
  factory: createApiFactory({
    api: oidcAuthApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      oauthRequestApi: oauthRequestApiRef,
      configApi: configApiRef,
    },
    factory: ({ discoveryApi, oauthRequestApi, configApi }) =>
      OAuth2.create({
        discoveryApi,
        oauthRequestApi,
        provider: {
          id: 'oidc',
          title: 'DevPortal SSO',
          icon: () => null,
        },
        environment: configApi.getOptionalString('auth.environment'),
        defaultScopes: ['openid', 'profile', 'email'],
      }),
  }),
});

// 3. Create the Custom Sign-In Page
const signInPage = SignInPageBlueprint.make({
  params: {
    loader: async () => props => (
      <SignInPage 
        {...props} 
        providers={[
          'guest',
          {
            id: 'oidc',
            title: 'DevPortal SSO',
            message: 'Sign in with your DevPortal account',
            apiRef: oidcAuthApiRef,
          },
        ]} 
      />
    ),
  },
});

// 4. Bundle into a Frontend Module
const customAuthModule = createFrontendModule({
  pluginId: 'app',
  extensions: [signInPage, oidcApiExtension],
});

// 5. Boot the app natively
export default createApp({
  features: [
    catalogPlugin,
    searchPlugin,
    scaffolderPlugin,
    userSettingsPlugin,
    techdocsPlugin,
    orgPlugin,
    kubernetesPlugin,
    navModule,
    customAuthModule,
  ].filter(Boolean),
});
