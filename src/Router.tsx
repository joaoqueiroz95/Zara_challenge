//Base
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Podcast from "./Pages/Podcast/Podcast";
import PodcastEpisode from "./Pages/PodcastEpisode/PodcastEpisode";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: `*`,
        element: <div>Not Found</div>,
      },
      {
        path: "/podcast/:podcastId",
        element: <Podcast />,
      },
      {
        path: "/podcast/:podcastId/episode/:episodeId",
        element: <PodcastEpisode />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
