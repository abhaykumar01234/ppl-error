import '../../../../cypress/support/commands';
import paymentDetailsJSON from '../../../../cypress/fixtures/billing/payment_details.json';
import vendorDetailsJSON from '../../../../cypress/fixtures/bids/get_vendor.json';

describe('Payment Details page', () => {
  beforeEach(() => {
    cy.getVendorAs('getVendor');
    cy.getBillingHistoryAs('getInvoices');
    cy.getPaymentACHAs('getPaymentACH');
    cy.visit('/vp/ppl/billing-history/payment/1234567');
    cy.get('.gdm-icon-loading-spinner').as('loader');
  });

  context('Test Page Details', () => {
    it("should show 'PPL Billing History' header", () => {
      cy.contains('PPL Billing History').should('be.visible');
    });

    it('should have a link to navigate back to Invoices page', () => {
      cy.get("a[data-cy='invoices-link'").should('be.visible').click();
      cy.url().should('include', '/vp/ppl/billing-history');
    });

    context('when API gets successful', () => {
      it('should display correct header', () => {
        cy.contains('.gdm-heading-lg', 'Receipt for Payment');
      });

      const { creationDay, vendorId, name: pname, contact } = paymentDetailsJSON;
      const { name } = vendorDetailsJSON;

      it('should display correct details', () => {
        cy.wait('@getPaymentACH').then(() => {
          const paymentType = pname.split('Payment - ')[1];
          cy.get('p:contains("Payment Method")').contains(paymentType).should('be.visible');
          cy.get('h3.gdm-heading-lg').contains(`Receipt for Payment(${creationDay})`).should('be.visible');
          cy.get('p:contains("Date")').contains(creationDay).should('be.visible');
          cy.get('p:contains("Customer #")').contains(vendorId).should('be.visible');
          cy.get('p:contains("Received From")').contains(name).should('be.visible');
          cy.get('p:contains("Business Contact")').contains(contact.fullName).should('be.visible');
        });
      });
    });
  });

  context('Test API call loader', () => {
    it('should display a loader while page loads details and then hide the loader', () => {
      cy.get('@loader').should('be.visible');
      cy.wait('@getPaymentACH').then(() => {
        cy.get('@loader').should('not.exist');
      });
    });
  });

  context('when API gets unsuccessful', () => {
    beforeEach(() => {
      cy.getPaymentACHAs('getPaymentACH', 0, 401, () => ({ error: ['Unauthorized'] }));
      cy.visit('/vp/ppl/billing-history/payment/1234567');
    });

    it('should display error message', () => {
      cy.url().should('contain', '/vp/ppl/billing-history');
      cy.url().should('not.contain', '1234567');
    });
  });

  context('Download Button Test', () => {
    afterEach(() => {
      cy.clearDownloadsFolder();
    });

    it('Displays loader on Export PDF button click & Downloads the pdf file', () => {
      cy.get("[data-cy='payment-pdf-export']").should('be.visible').click();
      cy.get('@loader').should('be.visible');
      cy.wait(2000);
      const downloadsFolder = Cypress.config('downloadsFolder');
      cy.task('readdir', downloadsFolder).then((file) => {
        expect(file[0]).to.match(new RegExp('payment_receipt.pdf$'));
      });
    });
  });
});
