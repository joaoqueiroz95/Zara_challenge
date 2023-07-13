/// <reference types="cypress" />

import { Method } from "axios";

Cypress.Commands.add("mockAxios", (url, method, response) => {
  cy.intercept(method.toLowerCase() as Method, url, (req) => {
    req.reply(response);
  });
});
