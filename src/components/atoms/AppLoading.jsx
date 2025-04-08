import { Box, CircularProgress, Typography } from "@mui/material";

const AppLoading = (props) => {
    return(
        <Box className = 'flex flex-col gap-[12px] items-center justify-center'>
            <CircularProgress color={ props.color || 'primary.grey' } />
            <Typography className="text-[12px]">{props.text || 'Loading Something...'}</Typography>
        </Box>
    )
}

export default AppLoading;