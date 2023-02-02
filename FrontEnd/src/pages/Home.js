import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { Card, Grid, CardContent, Zoom, Typography, Button, TextField, Hidden, Chip} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider } from '@emotion/react';
import { fontSize } from '@mui/system';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#1876d2',
        },
    }, 
});

function FromDatePicker(param) {

    const [value, setValue] = React.useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="From Date"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField color='secondary' {...params} />}/>
        </LocalizationProvider>
    );
}

function ToDatePicker(param) {

    const [value, setValue] = React.useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="To Date"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField color='secondary' {...params} />}/>
        </LocalizationProvider>
    );
}

const Commits = () => {

    const [commitdata, setCommitData] = useState([]);

    useEffect(() => {
        const fetchCommits = async () => {


            const response = await fetch('http://michaeljanderson.pythonanywhere.com/getcommits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: "anderm18", link: "https://github.com/anderm18/HASSPathways", token: "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"})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            }).catch(error => console.error(error));
            const responseData = await response.json()
            

            setCommitData(responseData)
        };
        fetchCommits()
    }, []);

    console.log(commitdata)
    return (
        <Grid item style={{
            paddingTop: '10px',
            marginLeft: '30px',
            marginRight: '30px',
            width: '100vw'
        }}>
        
            <Card style={{
                display: 'flex',
                height: '70px'
            }}>
                <Box style={{ flexDirection: 'column'}}>
                    <CardContent style={{flex: '1 0 auto'}}>
                        <Typography style={{
                            overflow: 'hidden',
                            position: 'absolute',
                            zIndex: '0',
                            textOverflow: 'ellipsis',
                            maxWidth: 'max(70vw, 100px)',
                            paddingTop: '6px'
                        }} gutterBottom>
                        https://github.com/anderm18/HASSPathways/commit/a5711891e1f618e58268a6838e29ee5ae5b98594
                        </Typography>
                    </CardContent>
                </Box>
                <Box style={{right: '37px',position: 'absolute', paddingTop: '7px', backgroundColor: '#fff'}}>
                <div style={{position: 'absolute', right: '0px'}}>
                    <Chip label='+400' align="right" color='success' style={{marginRight: '5px'}}/>
                    <Chip label='-20' align="right" color='error'/>
                </div>
                <div style={{paddingTop:' 33px', paddingLeft: '7px'}}>
                    <Typography style={{paddingRight: '3px'}}>
                        September 4, 2022
                    </Typography>
                </div>
                </Box>
            </Card>
        </Grid>    
    );

}

export class Home extends React.Component {

   

    render() {
        return(
            <>
                <div style={{width: '100vw', overflow: Hidden}}>
                    <Box style={{
                        backgroundColor: '#323647',
                        height: '50vmin',
                        minHeight: '400px',
                        maxHeight: '450px'
                    }}>
                        <CardContent sx={{
                            align: 'center',
                            paddingTop: '50px'
                            
                        }}>
                            <Typography variant="h1" style={{
                                color: 'white',
                                fontSize: '10vmin'}} align='center'>
                                Find Your Commits
                            </Typography>
                 
                            <div align='center' style={{
                                paddingTop: '10px'

                            }}>
                                <div style={{
                                    display: 'block', 
                                    flexDirection: 'column'}}>
                                    <ThemeProvider theme={theme}>
                                        <div1>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                variant='filled'
                                                label='Username/Email'
                                                color='secondary'
                                                align='center'
                                                InputProps={{ inputProps: { style: { color: '#fff' }}}}
                                                style={{
                                                    margin: '10px',
                                                    maxWidth: '400px',
                                                    width: '60vw'
                                                }}/>
                                        </div1>
                                        <div2>
                                            <TextField
                                                required
                                                id='outlined-required'
                                                variant='filled'
                                                label="Repository Link"
                                                color='secondary'
                                                align='center'
                                                style={{
                                                    margin: '10px',
                                                    maxWidth: '400px',
                                                    width: '60vw'}}/>
                                        </div2>
                                    </ThemeProvider>
                                </div>
                            </div>
                            
                            <Box align='center' style={{
                                paddingTop: '20px'
                            }}>
                                <Button variant="contained" align="center">
                                    Get Commits
                                </Button>
                            </Box>
                        </CardContent>
                    </Box>
                    <Box style={{
                        backgroundColor: '#282a39',
                        height: '100vh',
                        width: "100vw",
                        position: 'fixed'}}>
                        <div style={{paddingTop: '20px'}}>
                            <ThemeProvider theme={theme}>
                                <FromDatePicker/>
                                <ToDatePicker/>
                            </ThemeProvider>
                        </div>
                        <Grid container style={{
                            paddingTop: '10px',
                            width: '100vw'
                        }}>
                            <Commits />       
                        </Grid>
                    </Box>
                </div>
                <Box style={{display: 'flex', width: '100vw', height: '35px', backgroundColor: '#323647', position: 'absolute', bottom: '0px'}}>
                    <ThemeProvider theme={theme}>
                        <a href="https://github.com">
                            <GitHubIcon style={{paddingLeft: '5px', paddingTop: '5px'}} color='primary'/>
                        </a>
                    </ThemeProvider>
                    <Typography style={{paddingTop: '6px', paddingLeft: '6px', color: 'white'}} align='left'>
                        Created by Michael Anderson
                    </Typography>
                </Box>
            </>

        );
    }
}

export default Home;
