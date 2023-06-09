import { Box, Card, FormControlLabel, Switch, TextField, ThemeProvider, Tooltip, createTheme, IconButton, Button, CardContent, Theme, ClassNameMap } from "@mui/material";
import {makeStyles} from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HelpIcon from '@mui/icons-material/Help';
import { Dispatch, SetStateAction, useState } from "react";

const useStyles: (props?: any) => ClassNameMap<"switch"> = makeStyles({
    switch: {
        "& .Mui-checked": {
            color: '#1876d2',
            "& .Mui-track": '#4c7191'
        },
        "& .MuiSwitch-track": {
            backgroundColor: "#fff !important"
        }
    }
});

const theme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#ffffff',
        }
    }, 
});

function TooltipItem(props: {title: string}): JSX.Element {
    return(
        <ThemeProvider theme={theme}>
            <Tooltip title={props.title} arrow>
                <IconButton>
                    <HelpIcon/>
                </IconButton>
            </Tooltip>
        </ThemeProvider>
    );
}

function DatePick(props: {label: string, onChange: Dispatch<SetStateAction<null>>}): JSX.Element {
    return(
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{width: '100%', height: 'auto'}} label={props.label} onChange={(val: any) => props.onChange(val)}/>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default function CommitControl(props: {
        setFunc: React.Dispatch<React.SetStateAction<number>>, 
        setResponseRef: React.Dispatch<React.SetStateAction<JSON>>, 
        state: number
    }): JSX.Element {

    const [ghublink, setGHubLink]: [string ,Dispatch<SetStateAction<string>>] = useState('');
    const [ghubUser, setGHubUser]: [string ,Dispatch<SetStateAction<string>>]  = useState('');
    const [toDate, setToDate]: [Date|null, Dispatch<SetStateAction<null>>] = useState(null);
    const [fromDate, setFromDate]: [Date|null, Dispatch<SetStateAction<null>>] = useState(null);
    const [student, setStudent]: [boolean ,Dispatch<SetStateAction<boolean>>] = useState(false);
    const [excludeMerge, setExcludeMerge]: [boolean ,Dispatch<SetStateAction<boolean>>] = useState(false);

    const submitForm: () => Promise<void> = async () => {

        var ToDateObject: Date|null = toDate !== null ? new Date(toDate) : null;
        var FromDateObject: Date|null = fromDate !== null ? new Date(fromDate) : null;

        props.setFunc(1);

        await fetch('http://127.0.0.1:8000/getcommits', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name: ghubUser,
                link: ghublink,
            })
        }).then(async (res: Response) => {
            await res.json().then((data: JSON) => {
                props.setResponseRef(data);
                console.log(data);
                props.setFunc(2);
            });
        });

        console.log(ghublink);
        console.log(ghubUser);
        console.log(student);
        console.log(ToDateObject?.getMonth(), ToDateObject?.getDay(), ToDateObject?.getFullYear());
        console.log(FromDateObject?.getDate());
    }

    const classes: ClassNameMap<"switch"> = useStyles();
    const inTheme: Theme = theme;
    
    return(
        <Box sx={{bgcolor:'#0E0B10', marginTop: {xs: '10px', md: '0'}}}>
            <Card sx={{bgcolor: '#0E0B10', textAlign: 'center', paddingBottom: '20px'}}>
                <CardContent sx={{bgcolor: '#0E0B10', width: '100%', display: {xs:'inline-block', md:'flex'}, justifyContent: 'center', marginTop: {xs: '10px', md: 0}, padding: 0, margin: 'auto'}}>
                    <ThemeProvider theme={inTheme}>
                        <Box sx={{display: 'flex', flexDirection: 'column', margin: '0 30px', marginTop: {xs: 0, md:'20px'}, marginBottom: {xs: 0, md:'20px'}}}>
                            <Box sx={{display: 'flex'}}>
                                <TextField required={true} color='secondary' label="GitHub Link" variant="outlined" size="small" sx={{width: '100%'}} onChange={(val:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setGHubLink(val.target.value)}/>
                                <TooltipItem title="The Link to the GitHub Repository to search for your commit data in. This Repository MUST be public. For example: https://github.com/anderm18/FindMyCommits"/>
                            </Box>
                            <TextField required={true} sx={{width: 'auto', marginTop: '10px'}} color='secondary' label="GitHub Username" variant="outlined" size="small" onChange={(val:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setGHubUser(val.target.value)}/>
                        </Box>
                    </ThemeProvider>
                    <Box sx={{width: 'auto', marginTop: {xs: 0, md: '25px'}, justify: 'center', marginLeft: {xs: '25px', md: 0}}}>
                        <Box sx={{display: 'flex', width: 'auto', justifyContent: 'left'}}>
                            <FormControlLabel sx={{color: '#a0a6a7', margin: '0'}} className={classes.switch} control={<Switch onChange={() => setStudent(!student)}/>} label="RCOS Student?"/>
                            <TooltipItem title="Students of the Rensselaer Center of Open Source can check this box for their midterm and final commit reports. This will show the commits only in your respective semester!"/>
                        </Box>
                        <FormControlLabel sx={{ display: 'flex', color: '#a0a6a7', margin: '0'}} className={classes.switch} control={<Switch onChange={() => setExcludeMerge(!excludeMerge)}/>} label="Exclude Merge Commits" />
                    </Box>
                    <Box sx={{display: 'flex', margin:'0 30px', marginTop: {xs: 0, md:'35px'}, marginBottom: {xs: '10px', md: 0}, maxWidth: '400px'}}>
                        <DatePick label="Start Date" onChange={setFromDate}/>
                        <DatePick label="End Date" onChange={setToDate}/>
                    </Box>
                </CardContent>
                <Box sx={{margin: 'auto'}}>
                    <Button disabled={props.state===1} variant='contained' onClick={submitForm}>Find My Commits</Button>
                </Box>
            </Card>
            <Box sx={{bgcolor: '#0e0b16', height: '100%', width: '100%'}}>
                <Box sx={{width: '60%', height: '20px', marginLeft: 'auto', marginRight: 'auto', borderTop: 'solid', borderColor: 'white'}} />
            </Box>
        </Box>


    );
}