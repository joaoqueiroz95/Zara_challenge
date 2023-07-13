import { useEffect, useState, useMemo } from "react";
import { getPodcasts } from "/@/Services/podcasts";
import { useHeaderLoaderStore } from "/@/Stores/loaderStore";
import {
  checkValidLocalStorage,
  getLocalStorageItem,
  saveToLocalStorage,
} from "/@/Utils/localStorage";
import { IPodcast } from "../types/podcast";

const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<IPodcast[]>([]);
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

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter((podcast) => {
      if (filterVal === "") return true;

      const title = podcast.title.toLowerCase();
      const author = podcast.author.toLowerCase();
      const filterText = filterVal.toLowerCase();

      return title.includes(filterText) || author.includes(filterText);
    });
  }, [filterVal, podcasts]);

  return {
    filteredPodcasts,
    filterVal,
    handleFilterChange,
  };
};

export default usePodcasts;
