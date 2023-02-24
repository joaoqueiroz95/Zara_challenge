import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EpisodesTable from "/@/Components/EpisodesTable/EpisodesTable";
import PodcastDetailsCard from "/@/Components/PodcastDetailsCard/PodcastDetailsCard";
import { getPodcast, getPodcasts } from "/@/Services/podcasts";
import {
  checkValidLocalStorage,
  getLocalStorageItem,
  saveToLocalStorage,
} from "/@/Utils/localStorage";

const Podcast = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState<any | null>(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const isValid = checkValidLocalStorage("podcasts");

    let podcasts;
    if (isValid) {
      podcasts = getLocalStorageItem("podcasts");
    } else {
      getPodcasts().then((pods) => {
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
      getPodcast(podcast.id).then((eps) => {
        setEpisodes(eps);
        saveToLocalStorage(podcast.id, eps);
      });
    }
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
        {episodes.length > 0 && (
          <Card sx={{ merginBottom: "8px" }}>
            <CardContent>
              <Typography>Episodes: {episodes.length}</Typography>
            </CardContent>
          </Card>
        )}
        {episodes.length === 0 && <CircularProgress />}
        {episodes.length > 0 && (
          <Card style={{ maxHeight: "775px", overflowY: "auto" }}>
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
