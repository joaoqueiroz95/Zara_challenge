import { useEffect, useState } from "react";
import { IEpisode } from "../types/episode";
import usePodcast from "./usePodcast";

const useEpisode = (podcastId?: string, episodeId?: string) => {
  const { podcast, episodes, isLoading: isLoadingPodcast } = usePodcast(podcastId);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [episode, setEpisode] = useState<IEpisode>();

  useEffect(() => {
    const init = async () => {
      const episode = episodes.find((ep: any) => String(ep.episodeId) === episodeId);
      if (!episode) {
        setIsLoading(false);
        return;
      }
      setEpisode(episode);

      setIsLoading(false);
    };

    if (!podcastId || !episodeId) {
      setIsLoading(false);
      return;
    }

    if (!isLoadingPodcast) init();
  }, [isLoadingPodcast]);

  return { podcast, episode, isLoading };
};

export default useEpisode;
