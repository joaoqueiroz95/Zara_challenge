import { Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PodcastShortCard from "/@/Components/PodcastShortCard/PodcastShortCard";
import { getPodcasts } from "/@/Services/podcasts";
import { useHeaderLoaderStore } from "/@/Stores/loaderStore";
import {
  checkValidLocalStorage,
  getLocalStorageItem,
  saveToLocalStorage,
} from "/@/Utils/localStorage";

const Home = () => {
  const x = 1;
  const [podcasts, setPodcasts] = useState([]);
  const [filterVal, setFilterVal] = useState("");

  const setIsLoading = useHeaderLoaderStore((state) => state.setIsLoading);

  useEffect(() => {
    const isValid = checkValidLocalStorage("podcasts");

    setIsLoading(true);
    if (isValid) {
      setPodcasts(getLocalStorageItem("podcasts"));
      setIsLoading(false);
    } else {
      getPodcasts().then((podcasts) => {
        setIsLoading(false);
        setPodcasts(podcasts);
        saveToLocalStorage("podcasts", podcasts);
      });
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

  const chunkArray = (arr: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

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
          <Chip label={filteredPodcasts.length} color="primary" />
          <TextField
            size="small"
            placeholder="Filter podcasts..."
            value={filterVal}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div>
        {chunkArray(filteredPodcasts, 4).map((podcastsChunk: any[]) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            {podcastsChunk.map((podcast: any) => (
              <PodcastShortCard
                key={podcast.id}
                id={podcast.id}
                title={podcast.title}
                author={podcast.author}
                imgSrc={podcast.image}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
