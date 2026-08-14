import React from 'react';
import { createApp } from '@backstage/frontend-defaults';
import { convertLegacyAppOptions } from '@backstage/core-compat-api';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import searchPlugin from '@backstage/plugin-search/alpha';
import scaffolderPlugin from '@backstage/plugin-scaffolder/alpha';
import userSettingsPlugin from '@backstage/plugin-user-settings/alpha';
import techdocsPlugin from '@backstage/plugin-techdocs/alpha';
import orgPlugin from '@backstage/plugin-org/alpha';
import kubernetesPlugin from '@backstage/plugin-kubernetes/alpha';
import catalogImportPlugin from '@backstage/plugin-catalog-import/alpha';
import { SignInPage } from '@backstage/core-components';
import { oidcAuthApiRef } from '@backstage/core-plugin-api';

const legacyModule = convertLegacyAppOptions({
  components: {
    SignInPage: props => (
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
    legacyModule,
  ].filter(Boolean),
});
