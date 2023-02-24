describe("Podcast Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");

    cy.get(".MuiCardContent-root").first().click();
  });

  it("Clicking Header goes back to main page", () => {
    cy.contains("Podcaster").click();

    cy.url().should("eq", "http://localhost:3001/");
  });

  it("Clicking List element should go to episode datails page", () => {
    cy.wait(10000);

    cy.get(".MuiLink-underlineAlways").first().click();

    cy.url().should("include", "/episode/");
  });
});
