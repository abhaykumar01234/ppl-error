import '../../../../cypress/support/commands';

describe('Manage Bids Page', () => {
  context('Basic URL and UI checks', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should have a valid URL', () => {
      cy.url().should('include', '/vp/ppl/bids');
    });

    it('should have a footer with valid icons', () => {
      cy.get('[data-cy="footer"] .gdm-icon-footnote-dollar').should('exist');
      cy.get('[data-cy="footer"] .gdm-icon-footnote-equals').should('exist');
      cy.get('[data-cy="footer"] .gdm-icon-footnote-estimate').should('exist');
    });
  });

  context('API Success', () => {
    beforeEach(() => {
      cy.getVendorAs('vendor', 500);
      cy.getProductsAs('products', 500);
      cy.getMarketsAs('markets', 500);
      cy.getMetricsAs('metrics', 500);
      cy.getProductSizesAs('sizes', 500);
      cy.visit('/');
    });

    it('should check the visibility of loader when requests are made', () => {
      cy.get('.gdm-icon-loading-spinner').should('be.visible');
      cy.wait(['@vendor', '@products', '@markets', '@metrics', '@sizes']);
      cy.get('.gdm-icon-loading-spinner').should('not.exist');
    });

    it('should have a vendor name and market name on the page', () => {
      cy.get('[data-cy="vendor-name"]').should('have.text', 'vendor 1');
      cy.get('[data-cy="market-name"]').should('have.text', 'Distribution');
    });

    it('should switch to different market', () => {
      cy.get('[data-cy="markets-dropdown"]').should('exist').trigger('mouseover');
      cy.get('[data-cy="dropdown-list-item-Manufacturing"]').should('exist').click();
      cy.get('[data-cy="bids-body-label"]').should('exist');
      cy.get('[data-cy="show-all-size-bids-btn"]')
        .should('have.text', 'NetSuite Professional Services Automation - Project Management');
    });

    it('bids table should have valid headers', () => {
      cy.get('table.gdm-table').should('exist');
      cy.get('[data-cy="bids-header-label"]').should('have.length', 9);
      const bidTableHeaders = [
        'Product',
        'Size Band',
        'Base CPL',
        'Max. Market Bid',
        'Default Bid',
        'Custom Bids',
        'Max. Cost',
        'Avg. Pos',
        'Rec. Rate',
      ];
      cy.get('[data-cy="bids-header-label"]').each(([$header], index) => {
        expect($header.textContent).to.eq(bidTableHeaders[index]);
      });
    });

    it('should have a valid number of bids row with content', () => {
      cy.get('table.gdm-table > tbody > tr').should('have.length', 5);
      cy.get('[data-cy="bids-body-label"]').each(($td) => {
        cy.wrap($td).should('not.be.empty');
      });
    });

    it('expands the table row to show all size bids', () => {
      cy.get('[data-cy="show-all-size-bids-btn"]').click();
      cy.get('table.gdm-table > tbody').then(([$tbody]) => {
        expect($tbody.className.includes('table-row-accordion__open__')).to.be.true;
      });
    });
  });

  context('API Failure', () => {
    beforeEach(() => {
      cy.getVendorAs('vendor', 500, false);
      cy.getProductsAs('products', 500, false);
      cy.getMarketsAs('markets', 500, false);
      cy.getMetricsAs('metrics', 500, false);
      cy.getProductSizesAs('sizes', 500, false);
      cy.visit('/');
    });

    it('doesn\'t displays vendor and market name', () => {
      cy.get('[data-cy="vendor-name"]').should('be.empty');
      cy.get('[data-cy="market-name"]').should('not.exist');
    });

    it('doesn\'t hides the bids table', () => {
      cy.get('table.gdm-table').should('exist');
    });
  });
});
