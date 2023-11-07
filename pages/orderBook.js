import Navbar from "../src/components/navbar";
import theme from "../src/theme";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrderBookResult() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderBookResult, setOrderBookResult] = useState("");

  useEffect(() => {
    try {
      setOrderBookResult(router.query.orderBookResult);
      setLoading(false);
    } catch (error) {
      router.push("/");
      console.log(error);
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.main,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Container
        sx={{ pt: 4, color: theme.palette.text.main }}
      >
        <Box
          sx={{
            width: "100%",
            background: theme.palette.background.light,
            px:3
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <pre>
              {orderBookResult}
            </pre>
          )}
        </Box>
      </Container>
    </Box>
  );
}
