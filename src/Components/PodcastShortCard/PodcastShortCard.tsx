import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProps {
  id: string;
  title: string;
  author: string;
  imgSrc: string;
}

const PodcastShortCard: React.FC<IProps> = ({ id, title, author, imgSrc }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/podcast/${id}`);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "300px",
        width: "300px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <img
        src={imgSrc}
        style={{
          borderRadius: "50%",
          height: "50%",
          width: "50%",
          objectFit: "cover",
          overflow: "hidden",
          position: "absolute",
          top: "0px",
          left: "25%",
        }}
      />
      <Card
        sx={{ marginTop: "25%", paddingTop: "30%", height: "115px" }}
        data-test="podcast-short-card"
      >
        <CardContent>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 500,
              width: "230px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            gutterBottom
          >
            {title.toUpperCase()}
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            Author: {author}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PodcastShortCard;
