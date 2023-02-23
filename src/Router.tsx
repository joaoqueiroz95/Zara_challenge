//Base
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Main</div>,
    children: [
      {
        element: <div>Layout</div>,
        children: [
          {
            path: `*`,
            element: <div>Not Found</div>
          },
          {
            path: "podcast/:podcastId",
            element: <div>Podcast View</div>
          },
          {
            path: "podcast/:podcastId/episode/:episodeId",
            element: <div>Podcast Episode</div>
          }
        ]
      }
    ]
  }
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
