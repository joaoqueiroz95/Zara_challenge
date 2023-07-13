import { Chip, TextField, Grid } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import PodcastShortCard from "/@/Components/PodcastShortCard/PodcastShortCard";
import { useHeaderLoaderStore } from "/@/Stores/loaderStore";
import usePodcasts from "../../Hooks/usePodcasts";

const Home = () => {
  const { podcasts, isLoading } = usePodcasts();
  const [filterVal, setFilterVal] = useState("");

  const setIsLoadingHeader = useHeaderLoaderStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoadingHeader(isLoading);
  }, [isLoading]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterVal(event.target.value);
  };

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter((podcast: any) => {
      if (filterVal === "") return true;

      const title = podcast.title.toLowerCase();
      const author = podcast.author.toLowerCase();
      const filterText = filterVal.toLowerCase();

      return title.includes(filterText) || author.includes(filterText);
    });
  }, [filterVal, podcasts]);

  return (
    <div>
      <div style={{ margin: "16px 0 32px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: "16px",
          }}
        >
          <Chip label={filteredPodcasts.length} color="primary" data-test="chip-number-podcasts" />
          <TextField
            size="small"
            placeholder="Filter podcasts..."
            value={filterVal}
            onChange={handleFilterChange}
            data-test="filter-podcasts-input"
          />
        </div>
      </div>
      <div>
        <Grid container spacing={2}>
          {filteredPodcasts.map((podcast: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={podcast.id}>
              <PodcastShortCard
                id={podcast.id}
                title={podcast.title}
                author={podcast.author}
                imgSrc={podcast.image}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
