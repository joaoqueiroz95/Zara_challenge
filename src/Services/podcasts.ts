import axios from "axios";
import { formatMilliseconds } from "../Utils/date";
import { IPodcast } from "../types/podcast";
import { IEpisode } from "../types/episode";

export const getPodcasts = (): Promise<IPodcast[]> => {
  return axios
    .get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
    .then((res) => {
      const podcasts = res.data.feed.entry;
      return podcasts.map((podcast: any) => ({
        id: podcast.id.attributes["im:id"],
        title: podcast["im:name"].label,
        author: podcast["im:artist"].label,
        image: podcast["im:image"][2].label,
        description: podcast.summary.label,
      }));
    });
};

export const getPodcast = (id: string): Promise<IEpisode[]> => {
  return axios.get(`https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode`).then((res) => {
    const podcast_info = res.data.results.slice(1);

    return podcast_info.map((episode: any) => {
      return {
        title: episode.trackName,
        duration: formatMilliseconds(episode.trackTimeMillis),
        date: episode.releaseDate.slice(0, 10),
        episodeId: episode.trackId,
        description: episode.description,
        audio: episode.episodeUrl,
      };
    });
  });
};
