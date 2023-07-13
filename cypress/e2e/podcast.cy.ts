describe("Podcast Page", () => {
  it("Clicking Header goes back to main page", () => {
    cy.visit("http://localhost:3001/");
    cy.get("[data-test=podcast-short-card]").first().click();

    cy.get("[data-test=logo-header]").click();

    cy.url().should("eq", "http://localhost:3001/");
  });

  it("Clicking List element should go to episode details page", () => {
    cy.visit("http://localhost:3001/");
    cy.get("[data-test=podcast-short-card]").first().click();

    cy.get("[data-test=episode-link]").first().click();

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
