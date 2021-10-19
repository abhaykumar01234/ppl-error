const basePath = '/vp/api/ppl';

const apiConfig = {
  getProductsAs: {
    method: 'GET',
    url: `${basePath}/products`,
    success: 'bids/get_products',
    failure: 'common/empty_array',
  },
  getVendorAs: {
    method: 'GET',
    url: `${basePath}/vendors`,
    success: 'bids/get_vendor',
    failure: 'common/empty_object',
  },
  getMarketsAs: {
    method: 'GET',
    url: `${basePath}/markets`,
    success: 'bids/get_markets',
    failure: 'common/empty_array',
  },
  getMetricsAs: {
    method: 'GET',
    url: `${basePath}/metrics`,
    success: 'bids/get_metrics',
    failure: 'common/empty_object',
  },
  getProductSizesAs: {
    method: 'GET',
    url: `${basePath}/products/**/sizes`,
    success: 'bids/get_product_sizes',
    failure: 'common/empty_array',
  },
  getSizesAs: {
    method: 'GET',
    url: `${basePath}/products/12345/sizes`,
    success: 'bids/get_sizes',
    failure: 'common/empty_array',
  },
  getSegmentsAs: {
    method: 'GET',
    url: `${basePath}/products/12345/sizes/**/segments`,
    success: 'bids/get_segments',
    failure: 'common/empty_array',
  },
  getSizeAllBidsAs: {
    method: 'GET',
    url: `${basePath}/products/12345/sizes/**/all-bids`,
    success: 'changed_bids/size_all_bids',
    failure: 'common/empty_array',
  },
};

const getCallbackFromConfig = c => (alias, delay = 0, success = true, alterFixture = d => d) => {
  const fixturePath = success ? c.success : c.failure;
  cy.fixture(fixturePath).then((data) => {
    alterFixture(data);
    cy.intercept(c.method, c.url, (req) => {
      req.reply({
        body: data,
        delay,
      });
    }).as(alias);
  });
};

Cypress.Commands.add('getProductsAs', getCallbackFromConfig(apiConfig.getProductsAs));
Cypress.Commands.add('getVendorAs', getCallbackFromConfig(apiConfig.getVendorAs));
Cypress.Commands.add('getMarketsAs', getCallbackFromConfig(apiConfig.getMarketsAs));
Cypress.Commands.add('getMetricsAs', getCallbackFromConfig(apiConfig.getMetricsAs));
Cypress.Commands.add('getProductSizesAs', getCallbackFromConfig(apiConfig.getProductSizesAs));
Cypress.Commands.add('getSizesAs', getCallbackFromConfig(apiConfig.getSizesAs));
Cypress.Commands.add('getSegmentsAs', getCallbackFromConfig(apiConfig.getSegmentsAs));
Cypress.Commands.add('getSizeAllBidsAs', getCallbackFromConfig(apiConfig.getSizeAllBidsAs));

Cypress.Commands.add('updateSizeBidsAs', (alias, delay = 0, success = true) => {
  cy.intercept('PATCH', `${basePath}/products/**/sizes`, (req) => {
    const responseBody = req.body.bids.map(({ sizeId }) => ({ sizeId, success }));

    req.reply({
      body: responseBody,
      statusCode: success ? 200 : 500,
      delay,
    });
  }).as(alias);
});

Cypress.Commands.add('updateSegmentBidsAs', (alias, delay = 0, success = true) => {
  cy.intercept('PATCH', `${basePath}/products/**/sizes/**/segments`, (req) => {
    const responseBody = req.body.bids.map(({ segmentId }) => ({ segmentId, success }));

    req.reply({
      body: responseBody,
      statusCode: success ? 200 : 500,
      delay,
    });
  }).as(alias);
});
