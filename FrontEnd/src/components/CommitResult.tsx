import { Box, CircularProgress, Typography } from "@mui/material";

function defaultMessage(): JSX.Element {
    return (
        <Typography align='center' sx={{color: '#a0a6a7'}}>
            No Commit Data Loaded
        </Typography>
    );
}

function loadingMessage(): JSX.Element {
    return (
        <Typography sx={{display: 'flex', flexDirection: 'column', color: '#a0a6a7'}} align="center">
            <CircularProgress color="primary" size='50px' sx={{margin: 'auto'}}/>
        </Typography>
    );
}

function displayResult(responseRef: JSON): JSX.Element {
    console.log(responseRef);
    return (
        <div>Returned!</div>
    );
}

export default function CommitResult(props: {responseRef: JSON, state: number}) {

    const JSXRecord: Record<number, Function> = {
        0: defaultMessage,
        1: loadingMessage,
        2: () => displayResult(props.responseRef)
    }

    return (
        
        <Box sx={{width: '100vw', padding: '5% 0', color: '#0E0B16'}}>
            {JSXRecord[props.state]()}
        </Box>

    );
}