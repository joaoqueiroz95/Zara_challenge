describe("Home Page", () => {
  it("Verifies there are initially 100 podcasts", () => {
    cy.visit("http://localhost:3001/");

    cy.get("[data-test=chip-number-podcasts]").should("have.text", "100");
    cy.get("[data-test=filter-podcasts-input]").type("zzzzzz");
    cy.get("[data-test=chip-number-podcasts]").should("have.text", "0");
  });

  it("Verifies that when filtering by inexistent value, there will be no podcasts", () => {
    cy.visit("http://localhost:3001/");

    cy.get("[data-test=filter-podcasts-input]").type("zzzzzz");
    cy.get("[data-test=chip-number-podcasts]").should("have.text", "0");
  });

  it("Clicks on a podcast and checks if it goes to the correct URL", () => {
    cy.visit("http://localhost:3001/");

    cy.get("[data-test=podcast-short-card]").first().click();

    cy.url().should("match", /\/podcast\/\w+/);
  });
});
