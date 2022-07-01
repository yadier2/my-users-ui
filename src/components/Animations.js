import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations() {
  return (
    <Box>
      <Skeleton animation="wave" height={80} />
      <Skeleton height={40} />
      <Skeleton animation="wave" height={50} />
      <Skeleton height={40} />
      <Skeleton animation="wave" height={50} />
    </Box>
  );
}
