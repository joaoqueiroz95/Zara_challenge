import { useEffect, useState } from "react";
import { getPodcast } from "/@/Services/podcasts";
import {
  checkValidLocalStorage,
  getLocalStorageItem,
  saveToLocalStorage,
} from "/@/Utils/localStorage";
import { IPodcast } from "../types/podcast";
import { IEpisode } from "../types/episode";
import usePodcasts from "./usePodcasts";

const usePodcast = (podcastId?: string) => {
  const { podcasts, isLoading: isLoadingPodcasts } = usePodcasts();

  const [podcast, setPodcast] = useState<IPodcast>();
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const podcast = podcasts.find((pod) => pod.id === podcastId);
      if (!podcast) {
        setIsLoading(false);
        return;
      }
      setPodcast(podcast);

      const isPodcastEpisodesValid = checkValidLocalStorage(podcast.id);

      if (isPodcastEpisodesValid) {
        setEpisodes(getLocalStorageItem(podcast.id));
      } else {
        await getPodcast(podcast.id).then((eps) => {
          setEpisodes(eps);
          saveToLocalStorage(podcast.id, eps);
        });
      }

      setIsLoading(false);
    };

    if (!podcastId) {
      setIsLoading(false);
      return;
    }

    if (!isLoadingPodcasts) init();
  }, [isLoadingPodcasts]);

  return { podcast, episodes, isLoading };
};

export default usePodcast;
