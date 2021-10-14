import '../../../../cypress/support/commands';

const DEBOUNCED_TIME = 251;

describe('Change Bids Page', () => {
  beforeEach(() => {
    cy.getSizesAs('getSizes');
    cy.getSegmentsAs('getSegments', 500);
    cy.getVendorAs('getVendor');
    cy.getProductsAs('getProducts');
    cy.getMarketsAs('getMarkets');
    cy.getSizeAllBidsAs('getSizeAllBids');
  });

  it('navigates to the change bids page', () => {
    cy.visit('/vp/ppl/bids/edit/12345');
  });

  it('fetches the segments for advance bidding flag', () => {
    cy.visit('/vp/ppl/bids/edit/12345');
    cy.get('button.gdm-paragraph-sm:first').click();
  });

  context('Visit Page and mock APIs', () => {
    beforeEach(() => {
      cy.visit('/vp/ppl/bids/edit/12345');
      cy.wait(['@getVendor', '@getProducts', '@getMarkets', '@getSizes']);
      cy.get('[data-cy="bid-row"]:nth(1) [data-cy="bid-input"]').as('bidRowInput');
      cy.get('[data-gtm="pplbidding-editbid-drawertoggle"]').as('drawerToggler');
    });

    it('unsuccessful change in default bid does not show the drawer', () => {
      cy.get('@bidRowInput').focus().wait(DEBOUNCED_TIME).type('{selectall}332');
      cy.get('@drawerToggler').should('not.be.visible');
    });

    context('Single bid successful change', () => {
      beforeEach(() => {
        cy.get('@bidRowInput').focus().wait(DEBOUNCED_TIME).type('{selectall}330');
      });

      it('successful change in default bid shows the drawer', () => {
        cy.get('@drawerToggler').should('be.visible');
      });

      it('click on arrow toggle expands the drawer', () => {
        cy.get('@drawerToggler').click();
        cy.get('[data-cy="drawer"]').should('be.visible');
      });

      it('successful bid placed should be reflected in the changed bid table', () => {
        cy.get('@drawerToggler').click();
        cy.get('[data-cy="changed-bid-table"] tbody tr:first').as('changedBidRow');
        cy.get('@changedBidRow').children('th').should('contain', '51 to 800 users');
        cy.get('@changedBidRow').children('td:nth(0)').should('contain', '320');
        cy.get('@changedBidRow').children('td:nth(1)').should('contain', '325');
        cy.get('@changedBidRow').children('td:nth(2)').should('contain', '330');
        cy.get('@changedBidRow').children('td:nth(3)').should('contain', '330');
      });

      it('Remove button should delete the placed bid', () => {
        cy.get('@drawerToggler').click();
        cy.get('[data-cy="changed-bid-table"] tbody tr:first').as('changedBidRow');
        cy.get('[data-cy="changed-bid-table"] tbody tr:first button').as('deleteBtn');
        cy.get('@changedBidRow').children('th').realHover();
        cy.get('@deleteBtn').click();
        cy.get('[data-cy="drawer"]').should('be.visible');
      });

      context('when API failed', function () {
        beforeEach(() => {
          cy.updateSizeBidsAs('updateSizeBids', 500, false);
          cy.get('@drawerToggler').should('be.visible');
          cy.get('[data-cy=apply-bids]').click();
          cy.wait('@updateSizeBids');
        });

        it('should show error modal', () => {
          cy.contains('Unsaved Bids').should('be.visible');
        });

        it('should remove error modal on clicking of edit bids button', () => {
          cy.get('[class*=error_bid_modal]').find('button').contains('Edit Bids').click();
          cy.contains('Unsaved Bids').should('not.exist');
          cy.get('@drawerToggler').should('be.visible');
          cy.get('@bidRowInput').invoke('val').should('be.eq', '$330');
          cy.get('[data-cy="bid-row"]:nth(1)').find('div')
            .should('be.visible')
            .and('have.attr', 'class')
            .and('contain', 'icon-filled-circle');
        });

        it('should remove error modal on clicking of cancel changes button', () => {
          cy.get('[class*=error_bid_modal]').find('div').contains('Cancel changes').click();
          cy.contains('Unsaved Bids').should('not.exist');
          cy.get('@drawerToggler').should('be.visible');
          cy.get('@bidRowInput').invoke('val').should('not.be.eq', '$330');
          cy.get('[data-cy="bid-row"]:nth(1)').find('div')
            .should('be.visible')
            .and('have.attr', 'class')
            .and('not.contain', 'icon-filled-circle');
        });
      });

      it('successful change in default bid shows the drawer', () => {
        cy.updateSizeBidsAs('updateSizeBids', 500);
        cy.get('@drawerToggler').should('be.visible');
        cy.get('[data-cy=apply-bids]').click();
        cy.contains('Great! We\'ve saved your bids.').should('be.visible');
      });
    });

    context('multiple bid change', () => {
      beforeEach(() => {
        cy.get('[data-cy="bid-row"]:nth(0) [data-cy="bid-input"]').as('bidRowInput1');
        cy.get('[data-cy="bid-row"]:nth(1) [data-cy="bid-input"]').as('bidRowInput2');
        cy.get('[data-cy="bid-row"]:nth(2) [data-cy="bid-input"]').as('bidRowInput3');
      });

      it('any one wrong value should not display the drawer', () => {
        cy.get('@bidRowInput1').focus().wait(DEBOUNCED_TIME).type('{selectall}110');
        cy.get('@bidRowInput2').focus().wait(DEBOUNCED_TIME).type('{selectall}332');
        cy.get('@drawerToggler').should('not.be.visible');
      });

      it('should update size and segments successfully', () => {
        cy.updateSizeBidsAs('updateSizeBids', 500);
        cy.updateSegmentBidsAs('updateSegmentBids', 500);
        cy.get('@bidRowInput2').focus().wait(DEBOUNCED_TIME).type('{selectall}330');
        cy.wait(DEBOUNCED_TIME);
        cy.get('[data-cy=bid-row]:nth(0)').as('firstSizeRow');
        cy.get('[data-cy=bid-row]:nth(0) td:nth(1)').as('firstSizeRowAccordion');

        cy.get('@firstSizeRowAccordion').find('button').click().then(() => {
          cy.get('[data-cy=loader]').should('be.visible');
          cy.wait('@getSegments');

          cy.contains('Accounting').siblings('td:nth(2)').find('input').as('segmentBidInput');
          cy.get('@segmentBidInput').focus().wait(DEBOUNCED_TIME).type('{selectall}350');

          cy.get('@firstSizeRow').find('div')
            .should('be.visible')
            .and('have.attr', 'class')
            .and('contain', 'icon-hollow-circle');

          cy.contains('Accounting').siblings('td:nth(1)').find('div')
            .should('be.visible')
            .and('have.attr', 'class')
            .and('contain', 'icon-filled-circle');

          cy.get('@drawerToggler').should('be.visible');
          // cy.get('[data-cy=apply-bids]').click();
          // cy.wait(['@updateSizeBids', '@updateSegmentBids']);
          // cy.contains('Great! We\'ve saved your bids.').should('be.visible');
        });
      });

      context('multiple bids successful change', () => {
        beforeEach(() => {
          cy.get('@bidRowInput2').focus().wait(DEBOUNCED_TIME).type('{selectall}330');
          cy.wait(DEBOUNCED_TIME);
          cy.get('@bidRowInput3').focus().wait(DEBOUNCED_TIME).type('{selectall}580');
          cy.wait(DEBOUNCED_TIME);
        });

        it('successfully apply size bids change', () => {
          cy.updateSizeBidsAs('updateSizeBids', 500);
          cy.get('@drawerToggler').should('be.visible');
          cy.get('[data-cy=apply-bids]').click();
          cy.wait('@updateSizeBids');
          cy.contains('Great! We\'ve saved your bids.').should('be.visible');
          cy.get('@drawerToggler').should('not.be.visible');
        });

        context('multiple changed bids placed', () => {
          beforeEach(() => {
            cy.get('@bidRowInput1').focus().wait(DEBOUNCED_TIME).type('{selectall}110');
            cy.wait(DEBOUNCED_TIME);
            cy.get('@drawerToggler').click();
            cy.get('[data-cy="changed-bid-table"] tbody tr:nth(0)').as('changedBidRow1');
            cy.get('[data-cy="changed-bid-table"] tbody tr:nth(1)').as('changedBidRow2');
            cy.get('[data-cy="changed-bid-table"] tbody tr:nth(2)').as('changedBidRow3');
          });

          it('all bids should reflect in table', () => {
            cy.get('@changedBidRow1').children('th').should('contain', '1 to 50 users');
            cy.get('@changedBidRow1').children('td:nth(0)').should('contain', '-');
            cy.get('@changedBidRow1').children('td:nth(1)').should('contain', '100');
            cy.get('@changedBidRow1').children('td:nth(2)').should('contain', '110');
            cy.get('@changedBidRow1').children('td:nth(3)').should('contain', '110');

            cy.get('@changedBidRow2').children('th').should('contain', '51 to 800 users');
            cy.get('@changedBidRow2').children('td:nth(0)').should('contain', '320');
            cy.get('@changedBidRow2').children('td:nth(1)').should('contain', '325');
            cy.get('@changedBidRow2').children('td:nth(2)').should('contain', '330');
            cy.get('@changedBidRow2').children('td:nth(3)').should('contain', '330');

            cy.get('@changedBidRow3').children('th').should('contain', '801 to 50k users');
            cy.get('@changedBidRow3').children('td:nth(0)').should('contain', '570');
            cy.get('@changedBidRow3').children('td:nth(1)').should('contain', '555');
            cy.get('@changedBidRow3').children('td:nth(2)').should('contain', '580');
            cy.get('@changedBidRow3').children('td:nth(3)').should('contain', '580');
          });

          it('delete all bids', () => {
            cy.get('@changedBidRow1').children('th').children('button').as('deleteBtn1');
            cy.get('@changedBidRow1').children('th').realHover();
            cy.get('@deleteBtn1').click();

            cy.get('@changedBidRow2').children('th').children('button').as('deleteBtn2');
            cy.get('@changedBidRow2').children('th').realHover();
            cy.get('@deleteBtn2').click();

            cy.get('@changedBidRow3').children('th').children('button').as('deleteBtn3');
            cy.get('@changedBidRow3').children('th').realHover();
            cy.get('@deleteBtn3').click();

            cy.get('[data-cy="drawer"]').should('be.visible');
          });
        });

        it('cancel, discard changes and go back', () => {
          cy.get('@drawerToggler').click();
          cy.get('[data-cy="drawer"] [data-gtm="pplbidding-editbid-cancelbidsbutton"]').click();
          cy.get('[data-cy="cancel-edit-bid"] [data-gtm="pplbidding-unsavedmodal-cancelbutton"]').click();
          cy.url().should('include', '/vp/ppl/bids');
        });

        it('cancel but stay on same page with drawer open', () => {
          cy.get('@drawerToggler').click();
          cy.get('[data-cy="drawer"] [data-gtm="pplbidding-editbid-cancelbidsbutton"]').click();
          cy.get('[data-cy="cancel-edit-bid"] [data-gtm="pplbidding-unsavedmodal-returnbutton"]').click();
          cy.get('[data-cy="drawer"]').should('be.visible');
          cy.url().should('include', '/vp/ppl/bids/edit/12345');
        });
      });
    });

    context('edit segment bid', () => {
      beforeEach(() => {
        cy.get('[data-cy="bid-row"]:nth(1)').find('button.gdm-paragraph-sm:first').click();
        cy.get('tbody:nth(1) input[name="Accounting"]').should('exist');
        cy.get('tbody:nth(1) input[name="Accounting"]').focus().wait(DEBOUNCED_TIME).type('{selectall}325');
      });

      it('checks if segment name gets appended in placed bid table', () => {
        cy.get('@drawerToggler').click();
        cy.get('[data-cy="changed-bid-table"] tbody tr:first').as('changedBidRow');
        cy.get('@changedBidRow').children('th').contains('51 to 800 users - Accounting');
      });

      it('checks multiple segment change for same band reflects in table', () => {
        cy.wait(DEBOUNCED_TIME);
        cy.get('tbody:nth(1) input[name="Architecture"]').should('exist');
        cy.get('tbody:nth(1) input[name="Architecture"]').focus().wait(DEBOUNCED_TIME).type('{selectall}325');
        cy.get('@drawerToggler').click();
        cy.get('[data-cy="changed-bid-table"] tbody tr:nth(0)').as('changedBidRow1');
        cy.get('[data-cy="changed-bid-table"] tbody tr:nth(1)').as('changedBidRow2');
        cy.get('@changedBidRow1').children('th').contains('51 to 800 users - Accounting');
        cy.get('@changedBidRow2').children('th').contains('51 to 800 users - Architecture');
      });

      context('edit segment of different size band', () => {
        beforeEach(() => {
          cy.get('[data-cy="bid-row"]:nth(0) button.gdm-paragraph-sm:first').click();
          cy.get('tbody:nth(0) input[name="Advertising & PR"]').should('exist');
          cy.get('tbody:nth(0) input[name="Advertising & PR"]').focus().wait(DEBOUNCED_TIME).type('{selectall}340');
        });

        it('both segment names gets appended with different bands', () => {
          cy.wait(DEBOUNCED_TIME);
          cy.get('@drawerToggler').click();
          cy.get('[data-cy="changed-bid-table"] tbody tr:nth(0)').as('changedBidRow1');
          cy.get('[data-cy="changed-bid-table"] tbody tr:nth(1)').as('changedBidRow2');
          cy.get('@changedBidRow1').children('th').contains('1 to 50 users - Advertising & PR');
          cy.get('@changedBidRow2').children('th').contains('51 to 800 users - Accounting');
        });
      });
    });
  });
});
