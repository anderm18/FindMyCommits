import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import Logo from '../assets/logo.png';

const textStyle = {
    color: 'white',
    marginLeft: '20px',
    fontSize: '14pt',
    fontFamily: "'IBM Plex Sans', sans-serif",
} as const;

export default function NavBar() {
    return(
        <Box sx={{bgcolor: '#0E0B16', borderBottom: 'solid', borderColor: 'white'}}>
            <Toolbar disableGutters={true} sx={{minHeight: '64px'}} >
                <Box sx={{margin: '15px', marginTop: '18px'}}>
                    <Box component="img" src={Logo} sx={{width: '65px'}}/>
                </Box>
                <Typography sx={textStyle}>About</Typography>  
                <a href="/commits" style={{textDecoration: 'none'}}>
                    <Typography sx={textStyle}>Commits</Typography>
                </a>
                <Typography sx={textStyle}>RCOS</Typography>
            </Toolbar>
        </Box>

    );

}