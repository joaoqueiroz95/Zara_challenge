import { useEffect, useState, useMemo } from "react";
import { getPodcasts } from "/@/Services/podcasts";
import {
  checkValidLocalStorage,
  getLocalStorageItem,
  saveToLocalStorage,
} from "/@/Utils/localStorage";
import { IPodcast } from "../types/podcast";

const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<IPodcast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const isValid = checkValidLocalStorage("podcasts");

      if (isValid) {
        setPodcasts(getLocalStorageItem("podcasts"));
      } else {
        await getPodcasts().then((podcasts) => {
          setPodcasts(podcasts);
          saveToLocalStorage("podcasts", podcasts);
        });
      }

      setIsLoading(false);
    };

    init();
  }, []);

  return { podcasts, isLoading };
};

export default usePodcasts;
