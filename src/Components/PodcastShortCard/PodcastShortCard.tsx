import { Card, CardContent, Typography } from "@mui/material";

interface IProps {
  title: string;
  description: string;
  imgSrc: string;
}

const PodcastShortCard: React.FC<IProps> = ({ title, description, imgSrc }) => {
  return (
    <div style={{ position: "relative", height: "300px", width: "300px" }}>
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
      <Card sx={{ marginTop: "25%", paddingTop: "30%" }}>
        <CardContent>
          <Typography
            sx={{ textAlign: "center", fontWeight: 500 }}
            gutterBottom
          >
            {title.toUpperCase()}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>{description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PodcastShortCard;
