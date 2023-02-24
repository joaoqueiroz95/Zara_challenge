import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EpisodesTable from "/@/Components/EpisodesTable/EpisodesTable";
import PodcastDetailsCard from "/@/Components/PodcastDetailsCard/PodcastDetailsCard";
import { getPodcast } from "/@/Services/podcasts";

const PodcastEpisode = () => {
  const { podcastId, episodeId } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState<any | null>(null);
  const [episode, setEpisode] = useState<any | null>(null);

  console.log(podcastId);

  useEffect(() => {
    const saved_podcasts = localStorage.getItem("podcasts");
    if (saved_podcasts === null) {
      navigate("/");
      return;
    }

    const podcasts = JSON.parse(saved_podcasts).podcasts;
    const podcast = podcasts.find((pod: any) => pod.id === podcastId);
    setPodcast(podcast);

    const saved_episodes = localStorage.getItem(podcastId as string);
    if (saved_episodes === null) {
      navigate("/");
      return;
    }

    const episodes = JSON.parse(saved_episodes).episodes;
    const episode = episodes.find(
      (ep: any) => String(ep.episodeId) === episodeId
    );
    setEpisode(episode);
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
      <div>
        {/* <Card>
          <CardContent>
            <Typography>Episodes: 66</Typography>
          </CardContent>
        </Card> */}
        {!episode && <CircularProgress />}
        {episode && (
          <Card style={{ maxHeight: "775px", maxWidth: "700px" }}>
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
