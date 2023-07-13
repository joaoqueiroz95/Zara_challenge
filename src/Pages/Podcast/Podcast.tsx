import { Card, CardContent, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EpisodesTable from "/@/Components/EpisodesTable/EpisodesTable";
import PodcastDetailsCard from "/@/Components/PodcastDetailsCard/PodcastDetailsCard";
import { useHeaderLoaderStore } from "/@/Stores/loaderStore";
import usePodcast from "/@/Hooks/usePodcast";

const Podcast = () => {
  const navigate = useNavigate();
  const { podcastId } = useParams();

  const { podcast, episodes, isLoading } = usePodcast(podcastId);

  const setIsLoadingHeader = useHeaderLoaderStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoadingHeader(isLoading);
    if (!isLoading && !podcast) {
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
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {!isLoading && episodes.length > 0 && (
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
        {isLoading && (
          <Card>
            <CardContent>
              <LinearProgress />
            </CardContent>
          </Card>
        )}
        {!isLoading && episodes.length > 0 && (
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
