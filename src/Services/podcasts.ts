import axios from "axios";

export const getPodcasts = () => {
  return axios
    .get(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    )
    .then((res) => {
      const podcasts = res.data.feed.entry;
      return podcasts.map((podcast: any) => ({
        title: podcast["im:name"].label,
        author: podcast["im:artist"].label,
        image: podcast["im:image"][2].label,
      }));
    });
};
