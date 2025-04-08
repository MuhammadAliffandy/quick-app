import { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel} from "@mui/material";

const AppSelectButton = (props) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
        props.onChange(event.target.value)
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 70, padding: 0}}>
            <Select
            value={value}
            onChange={handleChange}
            displayEmpty
            sx={{ 
                backgroundColor: 'white' , 
                display: 'flex' , 
                justifyContent: 'end' , 
                alignItems:'flex-end',
                padding:0,
            }}
            MenuProps={{
                sx:{
                    padding: 0
                },
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "center", 
                },
                PaperProps: {  
                    sx: {
                        width: '300px',
                    }
                }
            }}
            >
                <MenuItem value="" disabled hidden>
                    My List
                </MenuItem>
                {
                    props.data.map(( data , index) => {
                        return(
                            <MenuItem value={index} sx={{borderBottom:  index + 1 == props.data.length ? '' : '1px solid black',}} >
                                {data}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    );
};

export default AppSelectButton;
