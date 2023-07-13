import { podcasts } from "../fixtures/podcasts.json";
import { episodes } from "../fixtures/episodes.json";

describe("Podcast Page", () => {
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

  let mainUrl = "http://localhost:3001/podcast/1535809341/episode/1000620870044";

  it("Clicking Header goes back to main page", () => {
    cy.visit(mainUrl);
    cy.get("[data-test=logo-header]").click();

    cy.url().should("eq", "http://localhost:3001/");
  });

  it("Episode should have audio element", () => {
    cy.visit(mainUrl);

    cy.get("[data-test=episode-audio]").should("exist");
  });

  it("Using an invalid episodeId redirects to home page", () => {
    cy.visit("http://localhost:3001/podcast/1535809341/episode/invalid");
    cy.url().should("eq", "http://localhost:3001/");
  });
});
