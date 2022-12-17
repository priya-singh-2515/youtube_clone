import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [VideoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();
  const [videosList, setVideosList] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet&statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideosList(data.items)
    );
  }, [id]);

  if (!VideoDetail?.snippet) return "Loading..........";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = VideoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={2} p={{ md: 6, xs:1}}>
          <Box sx={{ width: "100%", position: "sticky" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="black" variant="h5" fontWeight="blod" pt={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "black" }}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={"h6"} color="black">
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} like
                </Typography>
              </Stack>
            </Stack>
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              mt={5}
            >
              <Videos video={videosList} direction="row" />
            </Box>
          </Box>
        </Box>
        <Box
          justifyContent="center"
          alignItems="center"
          m={5}
        >
          <Videos video={videosList?.slice(-20, -1)} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
