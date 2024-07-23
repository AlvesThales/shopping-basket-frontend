// cypress/cypress.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Custom command to set JWT token in local storage
       * @example cy.setJwtToken('fake-jwt-token')
       */
      setJwtToken(token: string): Chainable<void>;
    }
  }
  