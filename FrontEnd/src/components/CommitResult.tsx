import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";

function defaultMessage() {
    return (
        <Typography align='center' sx={{color: '#a0a6a7'}}>
            No Commit Data Loaded
        </Typography>
    );
}

function loadingMessage() {
    return (
        <Typography sx={{display: 'flex', flexDirection: 'column', color: '#a0a6a7'}} align="center">
            <CircularProgress color="primary" size='50px' sx={{margin: 'auto'}}/>
        </Typography>
    );
}

export default function CommitResult(props: any) {

    const JSXRecord: Record<number, Function> = {
        0: defaultMessage,
        1: loadingMessage,
    }

    return (
        
        <Box sx={{width: '100vw', padding: '5% 0', color: '#0E0B16'}}>
            {JSXRecord[props.state]()}
        </Box>

    );
}