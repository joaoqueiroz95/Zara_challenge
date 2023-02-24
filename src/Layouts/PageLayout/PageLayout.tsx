import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div>
      <header>
        <Typography>Podcaster</Typography>
      </header>
      <Outlet />
    </div>
  );
};

export default PageLayout;
