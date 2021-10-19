import '../../../../cypress/support/commands';

describe('Edit Bids Page', function () {
  beforeEach(function () {
    cy.fixture('bids/get_vendor.json').as('vendorFixtureData');
    cy.fixture('changed_bids/size_all_bids.json').as('auctionBidsData');

    cy.getProductSizesAs('getSizes', 500);
    cy.getSegmentsAs('getSegments', 100);
    cy.getVendorAs('getVendor');
    cy.getProductsAs('getProducts');
    cy.getMarketsAs('getMarkets');
    cy.getSizeAllBidsAs('getSizeAllBids', 500);

    cy.visit('/vp/ppl/bids/edit/12345');
  });

  context('Edit Bids Table', function () {
    context('when advanced bidding is not available', function () {
      beforeEach(function () {
        cy.getProductsAs('getProducts', 500, true, products => {
          const currentProduct = products.find(p => Number(p.productId) === 12345);
          currentProduct.advancedBiddingAvailable = false;
        });
      });
      it('should not show toggle button', () => {
        cy.get('[data-cy=bid-row]').each($BidRow => {
          cy.get($BidRow).children('td:nth(1)').find('button').should('not.exist');
        });
      });
    });
  });

  context('Auction Bids Table', function () {
    it('should display initial content', function () {
      cy.wait(['@getVendor', '@getProducts', '@getMarkets', '@getSizes']);

      const placeholderText =
        'Need help? Use this tool to find and set optimal bids. Select any bid to view the estimated position and cost per lead at that bid amount. Questions?';
      cy.get('[class*=auction-bids-placeholder-wrapper]')
        .should('be.visible')
        .contains(placeholderText);
      cy.get('[data-cy=contact-link]').contains('Get in touch').and('be.visible');
    });

    context('when representative email is not available', function () {
      it("should not display 'Get in Touch' link", function () {
        cy.getVendorAs('getVendor', 500, true, vendorFixtureData => {
          vendorFixtureData.representative.email = null;
        });
        cy.wait(['@getVendor', '@getProducts', '@getMarkets', '@getSizes']);

        cy.get('[class*=auction-bids-placeholder-wrapper]').should('be.visible');
        cy.get('[data-cy=contact-link]').should('not.exist');
      });
    });

    context('when representative email is available', function () {
      it('should display contact modal with representative email', function () {
        cy.wait(['@getVendor', '@getProducts', '@getMarkets', '@getSizes']);

        cy.get('[data-cy=contact-link]')
          .should('be.visible')
          .then($link => {
            $link.trigger('click');
            cy.get('[data-cy=advisor-modal]').contains('Contact Your Advisor').should('be.visible');
            cy.get('[data-cy=advisor-modal]').and(
              'contain',
              this.vendorFixtureData.representative.email
            );
            cy.get('[data-cy=advisor-modal-ok-btn]').contains('OK').click();
            cy.get('[data-cy=advisor-modal]').should('not.exist');
          });
      });
    });

    it('should show vendor position', function () {
      cy.wait(['@getVendor', '@getProducts', '@getMarkets', '@getSizes']);

      cy.get('[data-cy="bid-row"]:nth(1) [data-cy="bid-input"]').as('bidRowInput');
      cy.get('@bidRowInput').focus();
      cy.get('[data-cy=loader]').should('be.visible');
      cy.wait('@getSizeAllBids');
      cy.get('[data-cy=auction-bids-table]')
        .children()
        .then($BidRows => {
          const vendorCurrentBidRowIndex = this.auctionBidsData.findIndex(bid =>
            Boolean(bid.isUserPosition)
          );

          cy.get($BidRows[vendorCurrentBidRowIndex])
            .children(vendorCurrentBidRowIndex)
            .last()
            .then(lastColumn => {
              cy.get(lastColumn)
                .find('div')
                .should('be.visible')
                .and('have.attr', 'class')
                .and('contain', 'icon-filled-circle');
            });
        });
    });

    it('should fill the default bid value when auction bid value is selected', function () {
      cy.wait(['@getVendor', '@getProducts', '@getMarkets', '@getSizes']);

      let oldBidValue = null;

      cy.get('[data-cy="bid-row"]:nth(0) [data-cy="bid-input"]').as('bidRowInput');
      cy.get('@bidRowInput')
        .invoke('val')
        .then(value => {
          oldBidValue = value;
        });

      cy.get('@bidRowInput').focus();
      cy.wait('@getSizeAllBids');

      cy.get('[data-cy=auction-bids-table]').find('tr:nth(0)>td:nth(0)').as('firstAuctionBidRow');
      cy.get('@firstAuctionBidRow')
        .realHover()
        .find('button')
        .contains('Select')
        .click()
        .then(() => {
          cy.get('@bidRowInput').invoke('val').should('not.eq', oldBidValue);
          cy.get('[data-cy="bid-row"]:nth(0)')
            .find('div')
            .should('be.visible')
            .and('have.attr', 'class')
            .and('contain', 'icon-filled-circle');
          cy.get('[data-cy=drawer]').should('be.visible');
        });
    });
  });
});
