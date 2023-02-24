describe("Podcast Page", () => {
  it("Clicking Header goes back to main page", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".MuiCardContent-root").first().click();

    cy.contains("Podcaster").click();

    cy.url().should("eq", "http://localhost:3001/");
  });

  it("Clicking List element should go to episode datails page", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".MuiCardContent-root").first().click();

    cy.wait(10000);

    cy.get(".MuiLink-underlineAlways").first().click();

    cy.url().should("include", "/episode/");
  });

  it("Going directly to podcast page gives no error", () => {
    cy.visit("http://localhost:3001/podcast/1535809341/");
  });

  it("Using an invalid podcastId redirects to home page", () => {
    cy.visit("http://localhost:3001/podcast/invalid/");
    cy.url().should("eq", "http://localhost:3001/");
  });
});
