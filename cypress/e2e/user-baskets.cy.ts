// cypress/e2e/user-baskets.cy.ts

describe('User Baskets Integration Test', () => {
  beforeEach(() => {
    // Set the JWT token in local storage
    cy.setJwtToken('fake-jwt-token');

    // Navigate to the user baskets page
    cy.visit('/user-baskets');
  });

  it('should display the user baskets page', () => {
    // Check if the page contains the header
    cy.contains('Your Baskets').should('be.visible');
  });

  it('should display no baskets message when there are no baskets', () => {
    // Mock the API response to return no baskets
    cy.intercept('GET', 'http://localhost:8080/baskets', {
      statusCode: 200,
      body: { success: true, data: [] }
    }).as('getUserBaskets');

    // Reload the page to trigger the API call
    cy.reload();

    // Check if the no baskets message is displayed
    cy.contains('No baskets found.').should('be.visible');
  });

  it('should display baskets when there are baskets', () => {
    // Mock the API response to return some baskets
    cy.intercept('GET', 'http://localhost:8080/baskets', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            id: '1',
            customerId: '123',
            basketItems: [{ ProductId: '1', ProductName: 'Product 1', UnitPrice: 10, OriginalPrice: 15, TotalDiscount: 5, Amount: 1 }],
            totalBasketOriginalPrice: 15,
            totalBasketDiscountedPrice: 10,
            isPaid: false,
            isDeleted: false
          }
        ]
      }
    }).as('getUserBaskets');

    // Reload the page to trigger the API call
    cy.reload();

    // Check if the basket is displayed
    cy.contains('Basket').should('be.visible');
    cy.contains('Total Items: 1').should('be.visible');
    cy.contains('Total Cost: €10.00').should('be.visible');
  });

  it('should navigate to receipt on view receipt button click', () => {
    // Mock the API response to return some baskets
    cy.intercept('GET', 'http://localhost:8080/baskets', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            id: '1',
            customerId: '123',
            basketItems: [{ ProductId: '1', ProductName: 'Product 1', UnitPrice: 10, OriginalPrice: 15, TotalDiscount: 5, Amount: 1 }],
            totalBasketOriginalPrice: 15,
            totalBasketDiscountedPrice: 10,
            isPaid: false,
            isDeleted: false
          }
        ]
      }
    }).as('getUserBaskets');

    // Reload the page to trigger the API call
    cy.reload();

    // Click the view receipt button
    cy.contains('View Receipt').click();

    // Check if the URL contains /receipt
    cy.url().should('include', '/receipt');
  });
});
