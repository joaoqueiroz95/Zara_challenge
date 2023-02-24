//Base
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import Home from "./Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: `*`,
        element: <div>Not Found</div>,
      },
      {
        path: "podcast/:podcastId",
        element: <div>Podcast View</div>,
      },
      {
        path: "podcast/:podcastId/episode/:episodeId",
        element: <div>Podcast Episode</div>,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
