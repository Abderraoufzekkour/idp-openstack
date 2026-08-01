import React from 'react';
import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import searchPlugin from '@backstage/plugin-search/alpha';
import scaffolderPlugin from '@backstage/plugin-scaffolder/alpha';
import userSettingsPlugin from '@backstage/plugin-user-settings/alpha';
import techdocsPlugin from '@backstage/plugin-techdocs/alpha';
import orgPlugin from '@backstage/plugin-org/alpha';
import kubernetesPlugin from '@backstage/plugin-kubernetes/alpha';
import catalogImportPlugin from '@backstage/plugin-catalog-import/alpha';
import { navModule } from './modules/nav';

import { SignInPageBlueprint } from '@backstage/plugin-app-react';
import { SignInPage } from '@backstage/core-components';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { oidcAuthApiRef } from '@backstage/core-plugin-api';

const signInPage = SignInPageBlueprint.make({
  params: {
    loader: async () => props => (
      <SignInPage
        {...props}
        auto
        providers={[
          'guest',
          {
            id: 'oidc',
            title: 'Keycloak',
            message: 'Sign in using Keycloak',
            apiRef: oidcAuthApiRef,
          },
        ]}
      />
    ),
  },
});

export default createApp({
  features: [
    catalogPlugin,
    searchPlugin,
    scaffolderPlugin,
    userSettingsPlugin,
    techdocsPlugin,
    orgPlugin,
    kubernetesPlugin,
    catalogImportPlugin,
    navModule,
    createFrontendModule({
      pluginId: 'app',
      extensions: [signInPage],
    }),
  ],
});
