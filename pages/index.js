import { useState } from 'react';
import Navbar from '../src/components/navbar';
import theme from '../src/theme';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';


export default function Index() {
  const [loading, setLoading] = useState(false);
  const router= useRouter();

  const getParseJD = async (pdfData) => {
    try {
      const formData = new FormData();
      formData.append("PDF", pdfData);
      const requestOptions = {
        method: "POST",
        body: formData
      }
      const url = 'https://hire-quotient.azurewebsites.net/api/pdf/parser';
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            // console.log(data)
            router.push({
              pathname:'/parseResult',
              query:{keywords:data.pdfText}
            })
          }
          else {
            console.log(data);
            setLoading(false);
          }
        })
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    getParseJD(file);
  }


  return (
    <Box sx={{ backgroundColor: theme.palette.background.main, minHeight: "100vh" }}>
      <Navbar />
      <Container sx={{ pt: 4, textAlign: 'center', color: theme.palette.text.main }}>
        <Typography variant='h4' sx={{ fontWeight: 500, mb: 1 }}>
          Parse JD file
        </Typography>
        <Typography variant='h6' sx={{ fontWeight: 300, mb: 5 }}>
          Based on any job descriptions provided in pdf below
        </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ width: 300, height: 75, mb: 1, fontSize: 30, textTransform: 'none' }}
        >
          {
            loading ? <CircularProgress sx={{ color: "#fff" }} /> : "Select JD PDF"
          }
          <input
            type="file"
            onChange={(e) => handleUpload(e)}
            accept="application/pdf"
            hidden
          />
        </Button>
      </Container>
    </Box>
  );
}
