import axios from "axios";
import { formatMilliseconds } from "../Utils/date";

export const getPodcasts = () => {
  return axios
    .get(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    )
    .then((res) => {
      const podcasts = res.data.feed.entry;
      console.log(podcasts);
      return podcasts.map((podcast: any) => ({
        id: podcast.id.attributes["im:id"],
        title: podcast["im:name"].label,
        author: podcast["im:artist"].label,
        image: podcast["im:image"][2].label,
        description: podcast.summary.label,
      }));
    });
};

export const getPodcast = (id: string) => {
  return axios
    .get(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode`
      )}`
    )
    .then((res) => {
      //const podcasts = res.data.feed.entry;
      const podcast_info = JSON.parse(res.data.contents).results.slice(1);
      console.log(podcast_info);

      /* const ret: any = {};
      ret["podcast"] = {
        author: podcast_info[0].artistName,
        title: podcast_info[0].collectionName,
      }; */

      return podcast_info.map((episode: any) => {
        return {
          title: episode.trackName,
          duration: formatMilliseconds(episode.trackTimeMillis),
          date: episode.releaseDate.slice(0, 10),
        };
      });
    });
};
