import { CircularProgress, Typography } from "@mui/material";
import Router from "./Router";
import { useHeaderLoaderStore } from "./Stores/loaderStore";

const App = () => {
  const isLoading = useHeaderLoaderStore((state) => state.isLoading);

  return (
    <div>
      <header
        style={{
          borderBottom: "1px solid #e1e1e1",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        {isLoading && <CircularProgress />}
      </header>
      <div style={{ margin: "32px" }}>
        <Router />
      </div>
    </div>
  );
};

export default App;
