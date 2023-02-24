describe("Home Page", () => {
  it("Verifies there are initially 100 podcasts", () => {
    cy.visit("http://localhost:3001/");

    cy.get(".MuiChip-label").should("have.text", "100");
    cy.get(".MuiInputBase-input").type("zzzzzz");
    cy.get(".MuiChip-label").should("have.text", "0");
  });

  it("Verifies that when filtering by inexistent value, there will be no podcasts", () => {
    cy.visit("http://localhost:3001/");

    cy.get(".MuiInputBase-input").type("zzzzzz");
    cy.get(".MuiChip-label").should("have.text", "0");
  });

  it("Clicks on a podcast and checks if it goes to the correct URL", () => {
    cy.visit("http://localhost:3001/");

    cy.get(".MuiCardContent-root").first().click();

    cy.url().should("match", /\/podcast\/\w+/);
  });
});
