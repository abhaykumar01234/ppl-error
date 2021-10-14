import '../../../../cypress/support/commands';

describe('View Leads Page', () => {
  it('checks if the loader is displayed', () => {
    cy.getVendorAs('getVendor');
    cy.getLeadParamsAs('getLeadParams', 1000);

    cy.visit('/vp/ppl/leads');
    cy.get('.gdm-icon-loading-spinner').should('be.visible');
    cy.wait(['@getLeadParams', '@getVendor']);
    cy.get('.gdm-icon-loading-spinner').should('not.exist');
  });

  context('Lead Page Components for API success', () => {
    beforeEach(() => {
      cy.getLeadsAs('getLeads', 1000);
      cy.getVendorAs('getVendor');
      cy.getLeadParamsAs('getLeadParams', 1000);
      cy.getLeadReportParamsAs('getLeadReportParams', 1000);
      cy.visit('/vp/ppl/leads');
      cy.get('.gdm-icon-loading-spinner').as('loader');
    });

    it('displays correct page title', () => {
      cy.contains('.gdm-title', 'View Leads');
    });

    context('Testing Table Content', () => {
      beforeEach(() => {
        cy.get('table tr').as('tableRows');
        cy.intercept('GET', '/vp/api/ppl/leads/12346', { fixture: 'leads/lead_details' }).as('leadDetails');
      });

      it('should render correct no of rows', () => {
        cy.get('table tr').should('have.length', 4);
      });

      it.only('empty cells not allowed, must have fallback', () => {
        cy.get('table tr')
          .get('tr:nth-child(3)')
          .each(($td) => {
            cy.wrap($td).should('not.be.empty');
          });
      });

      it('links should point to Lead Details page', () => {
        const LEAD_ID = 12346;
        cy.get('@tableRows').get('tr:nth-child(2) td:nth-child(2) > a')
          .should('have.attr', 'href')
          .and('eq', `/vp/ppl/leads/${LEAD_ID}`);
        cy.get('@tableRows').get('tr:nth-child(2) td:nth-child(2) a[data-gtm="pplbidding-leads-viewleaddetails"]').click();
        cy.wait('@leadDetails');
        cy.url().should('include', `/vp/ppl/leads/${LEAD_ID}`);
      });

      it('should render correct no of rows on button submit', () => {
        cy.get("button[data-gtm='pplleads-viewleads-getreportbutton']")
          .should('be.visible')
          .click();
        cy.get('@tableRows').should('have.length', 4);
      });
    });

    context('Testing date inputs', () => {
      const getFormattedLastMonthdate = (DATE) => {
        const d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        year = month === 0 ? year - 1 : year;
        month = month === 0 ? 11 : String(month).padStart(2, '0');
        const date = String(DATE).padStart(2, '0');
        return `${month}/${date}/${year}`;
      };

      const START_DATE = 10;
      const END_DATE = 25;

      it('should pass correct queryParam date values on button Submit and checks the loader visibility', () => {
        cy.get('input[name="startDate"]').clear().type(getFormattedLastMonthdate(START_DATE));
        cy.get('input[name="endDate"]').clear().type(getFormattedLastMonthdate(END_DATE));

        cy.get("button[data-gtm='pplleads-viewleads-getreportbutton']").click();
        cy.get('@loader').should('be.visible');
        cy.wait('@getLeadParams').then((interception) => {
          cy.get('@loader').should('not.exist');
          const URL = interception.request.url;
          const searchParams = new URLSearchParams(URL.slice(URL.indexOf('?')));
          expect(searchParams.get('startDate')).to.include(`-${START_DATE}`);
          expect(searchParams.get('endDate')).to.include(`-${END_DATE}`);
        });
      });
    });

    context('Testing Search Text Input', () => {
      beforeEach(() => {
        cy.get("input[name='searchLead']").as('searchInput');
      });

      const SEARCH_TEXT = 'Choco';
      it('should test search Lead input filter', () => {
        cy.get('@searchInput').type(SEARCH_TEXT);
        cy.get('@searchInput').should('have.value', SEARCH_TEXT);
      });

      it('should pass correct queryParam search lead value on button Submit and checks the loader visibility', () => {
        cy.get('@searchInput').type(SEARCH_TEXT);
        cy.get("button[data-gtm='pplleads-viewleads-getreportbutton']").click();
        cy.get('@loader').should('be.visible');
        cy.wait('@getLeadParams').then((interception) => {
          cy.get('@loader').should('not.exist');
          const URL = interception.request.url;
          const searchParams = new URLSearchParams(URL.slice(URL.indexOf('?')));
          expect(searchParams.get('leadName')).eq(SEARCH_TEXT);
        });
      });
    });

    context('Export Buttons Test', () => {
      afterEach(() => {
        cy.clearDownloadsFolder();
      });

      it('Displays loader on Export CSV button click & Downloads the csv file', () => {
        cy.get("button[data-gtm='pplleads-viewleads-exportcsv']")
          .should('be.visible')
          .click();

        cy.get('@loader').should('be.visible');
        cy.wait('@getLeadReportParams').then(() => {
          cy.get('@loader').should('not.exist');
          cy.wait(2000);
          const downloadsFolder = Cypress.config('downloadsFolder');
          cy.task('readdir', downloadsFolder).then((file) => {
            expect(file[0]).to.match(new RegExp('.csv$'));
          });
        });
      });

      it('Displays loader on Export PDF button click & Downloads the pdf file', () => {
        cy.get("button[data-gtm='pplleads-viewleads-exportpdf']")
          .should('be.visible')
          .click();

        cy.get('@loader').should('be.visible');
        cy.wait('@getLeadParams').then(() => {
          cy.get('@loader').should('not.exist');
          cy.wait(2000);
          const downloadsFolder = Cypress.config('downloadsFolder');
          cy.task('readdir', downloadsFolder).then((file) => {
            expect(file[0]).to.match(new RegExp('.pdf$'));
          });
        });
      });
    });
  });

  context('Lead Page Components for API fail', () => {
    beforeEach(() => {
      cy.getLeadsAs('getLeads');
      cy.getVendorAs('getVendor');
      cy.getLeadParamsAs('getLeadParams', 1000, false);
      cy.getLeadReportParamsAs('getLeadReportParams', 1000, false);

      cy.visit('/vp/ppl/leads');
      cy.get('.gdm-icon-loading-spinner').as('loader');
    });

    const d = new Date().getDate();
    const TODAY = d !== 1 ? d - 1 : d;

    const getFormattedCurrMonthdate = (DATE) => {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth();
      month = String(month).padStart(2, '0');
      const date = String(DATE).padStart(2, '0');
      return `${month}/${date}/${year}`;
    };

    it("should select today's date as Start & End Date "
    + 'and display error message in table on GET Report button click', () => {
      cy.get('input[name="startDate"]').clear().type(getFormattedCurrMonthdate(TODAY));
      cy.get('input[name="endDate"]').clear().type(getFormattedCurrMonthdate(TODAY));

      cy.get("button[data-gtm='pplleads-viewleads-getreportbutton']").click();
      cy.get('@loader').should('be.visible');
      cy.wait('@getLeadParams').then(() => {
        cy.get('@loader').should('not.exist');
        cy.get('tbody').contains('There are no leads for the selected search criteria.');
      });
    });

    context('Export buttons test', () => {
      afterEach(() => {
        cy.clearDownloadsFolder();
      });

      it('should select filters for empty output and click on Export CSV button', () => {
        cy.get('input[name="startDate"]').clear().type(getFormattedCurrMonthdate(TODAY));
        cy.get('input[name="endDate"]').clear().type(getFormattedCurrMonthdate(TODAY));

        cy.get("button[data-gtm='pplleads-viewleads-exportcsv']")
          .should('be.visible')
          .click();

        cy.get('@loader').should('be.visible');
        cy.wait('@getLeadReportParams').then(() => {
          cy.get('@loader').should('not.exist');
          const downloadsFolder = Cypress.config('downloadsFolder');
          cy.task('readdir', downloadsFolder).then((file) => {
            expect(file).to.be.empty;
            cy.get('.gdm-alert.gdm-align-top.gdm-m-left-xxs')
              .should('be.visible')
              .contains("CSV/PDF can't be exported as there are no leads for the selected date range.");
          });
        });
      });

      it('should select filters for empty output and click on Export PDF button', () => {
        cy.get('input[name="startDate"]').clear().type(getFormattedCurrMonthdate(TODAY));
        cy.get('input[name="endDate"]').clear().type(getFormattedCurrMonthdate(TODAY));

        cy.get("button[data-gtm='pplleads-viewleads-exportpdf']")
          .should('be.visible')
          .click();

        cy.get('@loader').should('be.visible');
        cy.wait('@getLeadParams').then(() => {
          cy.get('@loader').should('not.exist');
          const downloadsFolder = Cypress.config('downloadsFolder');
          cy.task('readdir', downloadsFolder).then((file) => {
            expect(file).to.be.empty;
            cy.get('.gdm-alert.gdm-align-top.gdm-m-left-xxs')
              .should('be.visible')
              .contains("CSV/PDF can't be exported as there are no leads for the selected date range.");
          });
        });
      });
    });
  });
});
