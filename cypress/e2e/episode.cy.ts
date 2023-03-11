describe("Podcast Page", () => {
  let mainUrl =
    "http://localhost:3001/podcast/1535809341/episode/1000601100410";

  it("Clicking Header goes back to main page", () => {
    cy.visit(mainUrl);
    cy.contains("Podcaster").click();

    cy.url().should("eq", "http://localhost:3001/");
  });

  it("Episode should have audio element", () => {
    cy.visit(mainUrl);

    cy.get("audio").should("exist");
  });

  it("Using an invalid episodeId redirects to home page", () => {
    cy.visit("http://localhost:3001/podcast/1535809341/episode/invalid");
    cy.url().should("eq", "http://localhost:3001/");
  });
});
