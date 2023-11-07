import { useState } from 'react';
import Navbar from '../src/components/navbar';
import theme from '../src/theme';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';


export default function Index() {
  const [loading, setLoading] = useState(false);
  const router= useRouter();

  const getOrderBook = async (xmlData) => {
    try {
      const formData = new FormData();
      formData.append("XML", xmlData);
      const requestOptions = {
        method: "POST",
        body: formData
      }
      const url = 'http://localhost:3000/api/script';
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            console.log(data.message)
            // router.push({
            //   pathname:'/orderBook',
            //   query:{keywords:data.pdfText}
            // })
            setLoading(false);
          }
          else {
            console.log(data);
            setLoading(false);
          }
        })
    }
    catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  }

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    getOrderBook(file);
  }


  return (
    <Box sx={{ backgroundColor: theme.palette.background.main, minHeight: "100vh" }}>
      <Navbar />
      <Container sx={{ pt: 4, textAlign: 'center', color: theme.palette.text.main }}>
        <Typography variant='h4' sx={{ fontWeight: 500, mb: 1 }}>
          Order Book Processing
        </Typography>
        <Typography variant='h6' sx={{ fontWeight: 300, mb: 5 }}>
          The program read and process <b>ALL</b> the orders in the order file and maintain order books.
        </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ width: 300, height: 75, mb: 1, fontSize: 30, textTransform: 'none' }}
        >
          {
            loading ? <CircularProgress sx={{ color: "#fff" }} /> : "Select XML File"
          }
          <input
            type="file"
            onChange={(e) => handleUpload(e)}
            accept="application/xml"
            hidden
          />
        </Button>
      </Container>
    </Box>
  );
}
