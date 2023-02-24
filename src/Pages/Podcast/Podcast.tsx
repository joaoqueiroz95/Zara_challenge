import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EpisodesTable from "/@/Components/EpisodesTable/EpisodesTable";
import PodcastDetailsCard from "/@/Components/PodcastDetailsCard/PodcastDetailsCard";
import { getPodcast } from "/@/Services/podcasts";

const Podcast = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState<any | null>(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const saved_podcasts = localStorage.getItem("podcasts");
    if (saved_podcasts === null) {
      navigate("/");
      return;
    }

    const podcasts = JSON.parse(saved_podcasts).podcasts;
    const podcast = podcasts.find((pod: any) => pod.id === podcastId);
    setPodcast(podcast);

    const saved_podcast = localStorage.getItem(podcast.id);

    let diffDays = 0;
    if (saved_podcast !== null) {
      const date = new Date(JSON.parse(saved_podcast).date);

      // Calculate the difference in time between the stored date and now
      const diffTime = Math.abs(Date.now() - date.getTime());
      diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    if (saved_podcast === null || diffDays >= 1) {
      const currentDate = new Date();

      getPodcast(podcastId as string).then((res) => {
        setEpisodes(res);
        localStorage.setItem(
          podcast.id,
          JSON.stringify({ date: currentDate.toISOString(), episodes: res })
        );
      });
    } else {
      setEpisodes(JSON.parse(saved_podcast).episodes);
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
      <div>
        {/* <Card>
          <CardContent>
            <Typography>Episodes: 66</Typography>
          </CardContent>
        </Card> */}
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
