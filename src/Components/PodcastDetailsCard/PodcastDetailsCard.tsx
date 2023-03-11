import { Card, CardContent, Divider, Typography } from "@mui/material";

interface IProps {
  title: string;
  author: string;
  description: string;
  imgSrc: string;
}

const PodcastDetailsCard: React.FC<IProps> = ({
  title,
  author,
  description,
  imgSrc,
}) => {
  return (
    <Card sx={{ width: "300px", maxHeight: "840px", overflowY: "auto" }}>
      <CardContent>
        <div>
          <img src={imgSrc} width="100%" />
        </div>
        <Divider sx={{ margin: "8px" }} />
        <Typography sx={{ fontWeight: 500 }} gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary">by {author}</Typography>
        <Divider sx={{ margin: "8px" }} />
        <Typography sx={{ fontWeight: 500 }} gutterBottom>
          Description:
        </Typography>
        <Typography color="text.secondary" sx={{ fontStyle: "italic" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PodcastDetailsCard;
