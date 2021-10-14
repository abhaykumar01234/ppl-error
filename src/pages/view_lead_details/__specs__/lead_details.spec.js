/* eslint-disable no-undef */
import leadDetailsJSON from '../../../../cypress/fixtures/leads/lead_details.json';

describe('View Lead Details Page', () => {
  beforeEach(() => {
    const basePath = '/vp/api/ppl';

    cy.intercept('GET', `${basePath}/leads?`, {
      fixture: 'leads/get_leads',
    }).as('getLeads');

    cy.intercept('GET', `${basePath}/leads/12345`, {
      fixture: 'leads/lead_details',
    }).as('leadDetails');

    cy.visit('/vp/ppl/leads/12345');
  });

  it('should navigate to correct url with correct heading', () => {
    cy.contains('.gdm-title', 'Lead Details');
    cy.url().should('include', '/vp/ppl/leads/12345');
  });

  it('link should take back to View All Leads Page', () => {
    cy.get("a[data-gtm='pplleads-leaddetail-viewallleads'").should('be.visible').click();
    cy.url().should('include', '/vp/ppl/leads');
    cy.contains('.gdm-title', 'View Leads');
  });

  context('Test Correct Lead Details', () => {
    const {
      company, website, city, notes,
    } = leadDetailsJSON;
    it('should show details on hovering info icon', () => {
      cy.get('.gdm-icon.gdm-icon-info').should('be.visible').trigger('mouseenter');
      cy.get('#leadDetailsTitle .gdm-paragraph-sm').contains(notes);
    });

    it('should display correct companyName', () => {
      cy.get("span:contains('Company Name') ~ span").contains(company);
    });

    it('should display correct website', () => {
      cy.get("span:contains('Website') ~ span").contains(website);
    });

    it('should display correct city', () => {
      cy.get("span:contains('City') ~ span").contains(city);
    });
  });
});
