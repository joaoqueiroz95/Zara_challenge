import { Card, CardContent, Typography } from "@mui/material";
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

    getPodcast(podcastId as string).then((res) => {
      setEpisodes(res);
    });
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
        {episodes.length > 0 && (
          <Card style={{ maxHeight: "775px" }}>
            <CardContent>
              <EpisodesTable data={episodes} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Podcast;
