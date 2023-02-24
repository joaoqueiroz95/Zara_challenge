//Base
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import Home from "./Pages/Home/Home";
import Podcast from "./Pages/Podcast/Podcast";

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
        element: <div>Podcast Episode</div>,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
