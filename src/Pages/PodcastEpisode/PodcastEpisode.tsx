import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PodcastDetailsCard from "/@/Components/PodcastDetailsCard/PodcastDetailsCard";
import { getPodcast, getPodcasts } from "/@/Services/podcasts";
import { useHeaderLoaderStore } from "/@/Stores/loaderStore";
import {
  checkValidLocalStorage,
  getLocalStorageItem,
  saveToLocalStorage,
} from "/@/Utils/localStorage";

const PodcastEpisode = () => {
  const { podcastId, episodeId } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState<any | null>(null);
  const [episode, setEpisode] = useState<any | null>(null);

  const setIsLoading = useHeaderLoaderStore((state) => state.setIsLoading);

  const init = async () => {
    setIsLoading(true);
    const isValid = checkValidLocalStorage("podcasts");

    let podcasts;
    if (isValid) {
      podcasts = getLocalStorageItem("podcasts");
    } else {
      await getPodcasts().then((pods) => {
        podcasts = pods;
        saveToLocalStorage("podcasts", pods);
      });
    }

    const podcast = podcasts.find((pod: any) => pod.id === podcastId);
    if (!podcast) {
      navigate("/");
      return;
    }
    setPodcast(podcast);

    const isPodcastEpisodesValid = checkValidLocalStorage(podcast.id);

    let episodes;
    if (isPodcastEpisodesValid) {
      episodes = getLocalStorageItem(podcast.id);
    } else {
      await getPodcast(podcast.id).then((eps) => {
        episodes = eps;
        saveToLocalStorage(podcast.id, eps);
      });
    }

    const episode = episodes.find(
      (ep: any) => String(ep.episodeId) === episodeId
    );
    if (!episode) {
      navigate("/");
      return;
    }
    setEpisode(episode);

    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ display: "flex", gap: "32px" }}>
      {podcast && (
        <PodcastDetailsCard
          title={podcast.title}
          author={podcast.author}
          description={podcast.description}
          imgSrc={podcast.image}
        />
      )}
      <div style={{ flex: 1 }}>
        {episode && (
          <Card style={{ maxHeight: "775px" }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                {episode.title}
              </Typography>
              <Typography sx={{ marginBottom: "8px" }}>
                {episode.description}
              </Typography>
              <audio controls>
                <source src={episode.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PodcastEpisode;
