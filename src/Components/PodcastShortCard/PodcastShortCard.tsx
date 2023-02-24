import { Card, CardContent, Typography } from "@mui/material";

interface IProps {
  title: string;
  description: string;
  imgSrc: string;
}

const PodcastShortCard: React.FC<IProps> = ({ title, description, imgSrc }) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={imgSrc}
        style={{
          borderRadius: "50%",
          height: 100,
          width: 100,
          objectFit: "cover",
          overflow: "hidden",
          top: -50,
          left: 50,
        }}
      />
      <Card sx={{ maxWidth: 200, marginTop: 50, paddingTop: 50 }}>
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
