import {
  Card,
  CardContent,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProps {
  podcastId: string | undefined;
  data: any;
}

const EpisodesTable: React.FC<IProps> = ({ data, podcastId }) => {
  return (
    <TableContainer sx={{ maxHeight: "72vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`/podcast/${podcastId}/episode/${row.episodeId}`}>
                  {row.title}
                </Link>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="center">{row.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EpisodesTable;
