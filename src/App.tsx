import { Typography } from "@mui/material";
import Router from "./Router";

const App = () => {
  return (
    <div>
      <header style={{ borderBottom: "1px solid #e1e1e1", padding: "8px" }}>
        <Typography
          component="a"
          href="/"
          sx={{
            color: "#0789c7",
            fontWeight: 500,
            fontSize: "1.2rem",
            textDecoration: "none",
          }}
        >
          Podcaster
        </Typography>
      </header>
      <div style={{ margin: "16px" }}>
        <Router />
      </div>
    </div>
  );
};

export default App;
