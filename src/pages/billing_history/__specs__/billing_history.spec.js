import '../../../../cypress/support/commands';

describe('Billing History Page', () => {
  beforeEach(() => {
    cy.getBillingHistoryAs('getInvoices');
    cy.getVendorAs('getVendor');
    cy.intercept('get', 'https://capterra.s3.amazonaws.com/assets/images/logos/softwareadvice-logo-286x46.png', { statusCode: 200, body: null });

    cy.visit('/vp/ppl/billing-history');
    cy.get('.gdm-icon-loading-spinner').as('loader');
  });

  it("should show 'PPL Billing History' header", () => {
    cy.contains('PPL Billing History').should('be.visible');
  });

  it('should display invoice table', () => {
    const columns = ['Date', 'Activity', 'Invoice', 'Payments & Credits', 'Balance'];

    cy.get('[data-cy=loader]').should('be.visible');
    cy.get('table > thead > tr')
      .find('th')
      .should('have.length', 5)
      .each((tableHeader, i) => {
        cy.wrap(tableHeader).invoke('text').should('be.eq', columns[i]);
      });
  });

  context('when API is successful', () => {
    it('should display table data in required format', () => {
      const firstRow = ['07/23/21', 'Invoice - July 2021', '$4,467.45 CC', '-', '$4,467.45'];
      const secondRow = ['07/16/21', 'Payment - ACH #ASD123ASD', '-', '$10,225.15', '$4,467.45'];

      cy.get('[data-cy=loader]').should('be.visible');
      cy.get('table > tbody > tr')
        .should('have.length', 3)
        .first()
        .find('td')
        .each((tableColumn, i) => {
          cy.wrap(tableColumn).invoke('text').should('be.eq', firstRow[i]);
        });

      cy.get('table > tbody > tr')
        .eq(1)
        .find('td')
        .each((tableColumn, i) => {
          cy.wrap(tableColumn).invoke('text').should('be.eq', secondRow[i]);
        });
    });

    context('and response is empty', () => {
      it('should display no data available message', () => {
        cy.getBillingHistoryAs('getEmptyInvoice', 0, 200, () => []);
        cy.visit('/vp/ppl/billing-history');
        cy.get('[data-cy=loader]').should('be.visible');
        cy.wait('@getEmptyInvoice');

        cy.contains('There is no data available based on your selection').should('be.visible');
      });
    });
  });

  context('when API gets failed', () => {
    it('should display error message', () => {
      cy.getBillingHistoryAs('getInvoiceError', 0, 401, () => ({ error: ['Unauthorized'] }));
      cy.visit('/vp/ppl/billing-history');
      cy.get('[data-cy=loader]').should('be.visible');
      cy.wait('@getInvoiceError');

      cy.contains('We have experienced an error. Please try reloading.').should('be.visible');
    });
  });

  context('Export Buttons Test', () => {
    afterEach(() => {
      cy.clearDownloadsFolder();
    });

    it('Displays loader on Export CSV button click & Downloads the csv file', () => {
      cy.get("[data-cy='billingHistory-csv-export']").should('be.visible').click();

      const downloadsFolder = Cypress.config('downloadsFolder');
      cy.task('readdir', downloadsFolder).then((file) => {
        expect(file[0]).to.match(new RegExp('invoice_list.csv$'));
      });
    });

    it('Displays loader on Export PDF button click & Downloads the pdf file', () => {
      cy.get("[data-cy='billingHistory-pdf-export']").should('be.visible').click();

      cy.get('@loader').should('be.visible');
      cy.wait(2000);
      const downloadsFolder = Cypress.config('downloadsFolder');
      cy.task('readdir', downloadsFolder).then((file) => {
        expect(file[0]).to.match(new RegExp('invoice_list.pdf$'));
      });
    });
  });
});
