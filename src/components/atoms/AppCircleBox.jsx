import { Box } from "@mui/material";

const AppCircleBox = (props) => {
    return(
        <Box sx={{ 
            backgroundColor: props.backgroundColor || 'indicator.red',
            width: '10px',
            height: '10px',
            borderRadius: "100%"
        }}>
        </Box>
    )
}

export default AppCircleBox;