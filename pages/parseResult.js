import Navbar from '../src/components/navbar';
import theme from '../src/theme';
import { Container, Box, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';


export default function ParseResult() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [rowsArray,setRowsArray]=useState([]);

    const columns = [
        {
            field: 'id',
            headerName: 'Sr. No.',
            flex: 1
        },
        {
            field: 'keyword',
            headerName: 'Keywords',
            flex: 1
        }
    ];

    var rows = [];

    useEffect(() => {
        try {
            const keywordsArray = router.query.keywords;
            var i;
            for (i = 0; i < keywordsArray.length; i++) {
                const obj = {
                    "id": i + 1,
                    "keyword": keywordsArray[i]
                };
                rows = [...rows, obj]
            }
            if (i == keywordsArray.length) {
                setLoading(false);
                setRowsArray(rows);
            }
        }
        catch (error) {
            router.push('/')
            console.log(error)
        }
    }, [])

    return (
        <Box sx={{ backgroundColor: theme.palette.background.main, minHeight: "100vh" }}>
            <Navbar />
            <Container sx={{ pt: 4, textAlign: 'center', color: theme.palette.text.main }}>
                <Box sx={{ height: 526, width: '100%', background: theme.palette.background.light, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {
                        loading ? <CircularProgress /> : <DataGrid
                            rows={rowsArray}
                            columns={columns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                        />
                    }
                </Box>
            </Container>
        </Box>
    );
}
