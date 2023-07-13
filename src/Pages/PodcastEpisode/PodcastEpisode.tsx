import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PodcastDetailsCard from "/@/Components/PodcastDetailsCard/PodcastDetailsCard";
import { useHeaderLoaderStore } from "/@/Stores/loaderStore";
import useEpisode from "/@/Hooks/useEpisode";

const PodcastEpisode = () => {
  const { podcastId, episodeId } = useParams();
  const navigate = useNavigate();

  const { podcast, episode, isLoading } = useEpisode(podcastId, episodeId);

  const setIsLoadingHeader = useHeaderLoaderStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoadingHeader(isLoading);
    if (!isLoading && (!podcast || !episode)) {
      navigate("/");
    }
  }, [isLoading]);

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
              <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                {episode.title}
              </Typography>
              <div
                style={{
                  marginBottom: "16px",
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  lineHeight: 1.5,
                  letterSpacing: "0.00938em",
                }}
                dangerouslySetInnerHTML={{ __html: episode.description }}
              ></div>
              <Divider sx={{ margin: "16px" }} />
              <audio controls style={{ width: "100%" }} data-test="episode-audio">
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
