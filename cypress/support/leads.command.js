const basePath = '/vp/api/ppl';

const apiConfig = {
  getLeadParamsAs:
  {
    method: 'GET',
    url: `${basePath}/leads`,
    query: {
      startDate: '*',
      endDate: '*',
    },
    success: 'leads/get_leads_filtered',
    failure: 'common/empty_array',
  },
  getLeadReportParamsAs:
  {
    method: 'GET',
    url: `${basePath}/leads/report`,
    query: {
      startDate: '*',
      endDate: '*',
    },
    success: 'leads/get_leads_filtered',
    failure: 'common/empty_array',
  },
};

const getCallbackFromConfig = c => (alias, delay = 0, success = true) => {
  cy.intercept(
    {
      method: c.method,
      pathname: c.url,
      query: c.query || {},
    },
    (req) => {
      req.reply({
        fixture: success ? c.success : c.failure,
        delay,
      });
    },
  ).as(alias);
};

Cypress.Commands.add('getLeadParamsAs', getCallbackFromConfig(apiConfig.getLeadParamsAs));
Cypress.Commands.add('getLeadReportParamsAs', getCallbackFromConfig(apiConfig.getLeadReportParamsAs));

Cypress.Commands.add('getLeadsAs', (alias, delay = 0) => {
  cy.intercept('GET', `${basePath}/leads?`, (req) => {
    req.reply({
      fixture: 'leads/get_leads',
      delay,
    });
  }).as(alias);
});
