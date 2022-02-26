/// <reference types="cypress" />

describe("Registration and login", () => {
   const password = `${Date.now()}`;
   const email = `${password}@example.net`;

   before(() => {
      cy.visit("/");
      cy.location("pathname").should("equal", "/");
   });

   it("Fill in the registration data", () => {
      cy.get(".ico-register").click();
      cy.location("pathname").should("equal", "/register");
      cy.get("[for=\"gender-male\"]").click();
      cy.get("#FirstName").type("Joe" + Math.round(Math.random() * 10));
      cy.get("#LastName").type("Kohler" + Math.round(Math.random() * 10));
      cy.get('[name="DateOfBirthDay"]').select(Math.round(Math.random() * 30 + 1));
      cy.get('[name="DateOfBirthMonth"]').select(Math.round(Math.random() * 12));
      cy.get('[name="DateOfBirthYear"]').select(String(Math.round(Math.random() * 110 + 1912)));
      cy.get('#Email').type(email);
      cy.get('#Company').type('QuertyEbert');
      cy.get('div.inputs > #Newsletter').click();
      cy.get('#Password').type(password);
      cy.get('input[id="ConfirmPassword"]').type(password);
      cy.get('#register-button').click();
      cy.wait(3000);
      cy.get('.ico-logout').click();
   });

   it("login", () => {
      cy.get('.ico-login').click();
      cy.location("pathname").should("equal", "/login");
      cy.get('#Email').type(email);
      cy.get('#Password').type(password);
      cy.get('#RememberMe').click();
      cy.get('.button-1.login-button').click();
   });
});