import { Chip, TextField, Grid } from "@mui/material";
import PodcastShortCard from "/@/Components/PodcastShortCard/PodcastShortCard";
import usePodcasts from "/@/Hooks/usePodcasts";

const Home = () => {
  const { filteredPodcasts, filterVal, handleFilterChange } = usePodcasts();

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
          {filteredPodcasts.map((podcast) => (
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
