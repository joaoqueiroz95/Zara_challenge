import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PodcastShortCard from "/@/Components/PodcastShortCard/PodcastShortCard";
import { getPodcasts } from "/@/Services/podcasts";

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    const saved_podcasts = localStorage.getItem("podcasts");

    let diffDays = 0;
    if (saved_podcasts !== null) {
      const date = new Date(JSON.parse(saved_podcasts).date);

      // Calculate the difference in time between the stored date and now
      const diffTime = Math.abs(Date.now() - date.getTime());
      diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    if (saved_podcasts === null || diffDays >= 1) {
      const currentDate = new Date();

      getPodcasts().then((podcasts) => {
        setPodcasts(podcasts);
        localStorage.setItem(
          "podcasts",
          JSON.stringify({ date: currentDate.toISOString(), podcasts })
        );
      });
    } else {
      setPodcasts(JSON.parse(saved_podcasts).podcasts);
    }
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterVal(event.target.value);
  };

  const filteredPodcasts = podcasts.filter((podcast: any) => {
    if (filterVal === "") return true;

    const title = podcast.title.toLowerCase();
    const author = podcast.author.toLowerCase();
    const filterText = filterVal.toLowerCase();

    return title.includes(filterText) || author.includes(filterText);
  });

  return (
    <div>
      <div style={{ margin: "16px 0 32px 0", textAlign: "right" }}>
        <TextField
          size="small"
          placeholder="Filter podcasts..."
          value={filterVal}
          onChange={handleFilterChange}
        />
      </div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {filteredPodcasts.map((podcast: any) => (
          <PodcastShortCard
            key={podcast.title}
            title={podcast.title}
            description={podcast.author}
            imgSrc={podcast.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
