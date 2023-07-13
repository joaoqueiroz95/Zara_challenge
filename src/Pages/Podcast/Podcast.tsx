import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EpisodesTable from "/@/Components/EpisodesTable/EpisodesTable";
import PodcastDetailsCard from "/@/Components/PodcastDetailsCard/PodcastDetailsCard";
import { getPodcast, getPodcasts } from "/@/Services/podcasts";
import { useHeaderLoaderStore } from "/@/Stores/loaderStore";
import {
  checkValidLocalStorage,
  getLocalStorageItem,
  saveToLocalStorage,
} from "/@/Utils/localStorage";
import { IEpisode } from "/@/types/episode";

const Podcast = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState<any | null>(null);
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);

  const setIsLoading = useHeaderLoaderStore((state) => state.setIsLoading);

  useEffect(() => {
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
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {episodes.length > 0 && (
          <Card>
            <CardContent
              sx={{
                "&:last-child": {
                  paddingBottom: "16px",
                },
              }}
            >
              <Typography sx={{ fontSize: "1.25rem", fontWeight: 500 }}>
                Episodes: {episodes.length}
              </Typography>
            </CardContent>
          </Card>
        )}
        {episodes.length > 0 && (
          <Card style={{ maxHeight: "84vh", overflowY: "auto" }}>
            <CardContent>
              <EpisodesTable data={episodes} podcastId={podcastId} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Podcast;
