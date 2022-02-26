/// <reference types="cypress" />

describe("Registration and login with invalid data", () => {
   let password = `${Date.now()}`;
   let email = `${password}example.net`; // @ is't type

   before(() => {
      cy.visit("/");
      cy.location("pathname").should("equal", "/");
   });

   it("Registration with invalid email", () => {
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
      cy.wait(1000);
      cy.get("#Email-error").contains("Wrong email");
   });

   it("login with invalid password", () => {
      cy.get('.ico-login').click();
      cy.location("pathname").should("equal", "/login");
      cy.get('#Email').type(email);
      cy.get('#Password').type(password);
      cy.get('#RememberMe').click();
      cy.get('.button-1.login-button').click();
      cy.wait(1000);
      cy.get("#Email-error").contains("Wrong email");
   });


   
   it("Registration with invalid password", () => {
      password = `${Math.round(Math.random() * 10)}`; // password length is 1
      email = `${password}@example.net`;

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
      cy.get("#Password-error").contains("Password must meet the following rules: must have at least 6 characters");
   });

   it.only("login with invalid password", () => {
      password = `${Math.round(Math.random() * 10)}`; // password length is 1
      email = `${password}@example.net`;

      cy.get('.ico-login').click();
      cy.location("pathname").should("equal", "/login");
      cy.get('#Email').type(email);
      cy.get('#Password').type(password);
      cy.get('#RememberMe').click();
      cy.get('.button-1.login-button').click();
      cy.get(".message-error").contains("Login was unsuccessful. Please correct the errors and try again.No customer account found");
   });
});

