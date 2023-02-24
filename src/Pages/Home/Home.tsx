import { useEffect, useState } from "react";
import PodcastShortCard from "/@/Components/PodcastShortCard/PodcastShortCard";
import { getPodcasts } from "/@/Services/podcasts";

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    getPodcasts().then((podcasts) => {
      setPodcasts(podcasts);
    });
  }, []);

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {podcasts.map((podcast: any) => (
        <PodcastShortCard
          title={podcast.title}
          description={podcast.author}
          imgSrc={podcast.image}
        />
      ))}
    </div>
  );
};

export default Home;
