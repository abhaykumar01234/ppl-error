const basePath = '/vp/api/ppl';

const apiConfig = {
  getBillingHistoryAs: {
    method: 'GET',
    url: `${basePath}/invoices`,
    success: 'billing/get_invoices',
    failure: 'common/empty_array',
  },
  getPaymentACHAs: {
    method: 'GET',
    url: `${basePath}/invoices/1234567/payment`,
    success: 'billing/payment_details',
    failure: 'common/empty_object',
  },
};

const getCallbackFromConfig =
  (c) =>
  (alias, delay = 0, status = 200, alterFixture = (d) => d) => {
    const fixturePath = status === 200 ? c.success : c.failure;
    cy.fixture(fixturePath).then((data) => {
      const alteredData = alterFixture(data);
      cy.intercept(c.method, c.url, (req) => {
        req.reply({
          statusCode: status,
          body: alteredData,
          delay,
        });
      }).as(alias);
    });
  };

Cypress.Commands.add('getBillingHistoryAs', getCallbackFromConfig(apiConfig.getBillingHistoryAs));
Cypress.Commands.add('getPaymentACHAs', getCallbackFromConfig(apiConfig.getPaymentACHAs));
