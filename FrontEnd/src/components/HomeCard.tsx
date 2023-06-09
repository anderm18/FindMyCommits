import { AppBar, Box, Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material";

export default function HomeCard(): JSX.Element {
    return(
        <Grid container alignItems='center'>
            <Grid item xs={6}>
                <Box sx={{height: 'auto', marginTop: '20vh', alignContent: 'center', alignItems: 'center'}}>
                    <Box sx={{ backgroundColor: '#0E0B16'}}>
                        <CardContent>
                            <Typography align="center" variant='h2' sx={{fontFamily: "'Montserrat', sans-serif", color: '#61dafb'}}>
                                Your Commits <div style={{color: 'white'}}>all in one place</div>
                                <Button variant="contained">
                                    Find My Commits
                                </Button>
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{backgroundColor: '#121212', height: '20px', marginRight: '40px'}}>
                    
                </Paper>

            </Grid>
        </Grid>
    );
}