Cypress.on('window:before:load', (win) => {
  delete win.fetch;
});
