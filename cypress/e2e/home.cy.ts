import { podcasts } from "../fixtures/podcasts.json";
import { episodes } from "../fixtures/episodes.json";

describe("Home Page", () => {
  beforeEach(() => {
    cy.mockAxios("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json", "GET", {
      status: 200,
      body: {
        feed: {
          entry: podcasts,
        },
      },
    });
    cy.mockAxios("https://itunes.apple.com/lookup?id=1535809341&entity=podcastEpisode", "GET", {
      status: 200,
      body: { results: ["", ...episodes] },
    });
  });

  it("Verifies there are initially 100 podcasts", () => {
    cy.visit("http://localhost:3001/");

    cy.get("[data-test=chip-number-podcasts]").should("have.text", "1");
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
