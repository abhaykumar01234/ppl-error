/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import './leads.command';
import './bids.command';
import './billing.command';
import 'cypress-real-events/support';

//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })

Cypress.Commands.add('clearDownloadsFolder', (options = {}) => {
  cy.log('Clear downloads folder');
  cy.exec('rm cypress/downloads/*', {
    log: options.log || true,
    failOnNonZeroExit: options.failOnNonZeroExit || false,
  });
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
