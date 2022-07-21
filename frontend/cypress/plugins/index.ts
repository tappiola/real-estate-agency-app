// @ts-nocheck
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    if (config.testingType === 'component') {
        // eslint-disable-next-line global-require,import/no-extraneous-dependencies
        require('@cypress/react/plugins/react-scripts')(on, config);
    }

    return config;
};
