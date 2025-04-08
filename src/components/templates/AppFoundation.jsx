'use client'
import AppFloatingButton from "../molecules/AppFloatingButton";
import AppInbox from "./AppInbox";
import AppTodo from "./AppTodo";
import { Tooltip, Popover, Box } from "@mui/material";
import { useState } from "react";

const AppFoundation = () => {

    const [quick, setQuick  ] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setQuick(event.target.alt)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Box>
            <Tooltip className={''}>
                <AppFloatingButton
                    onClickQuick ={(value)=>{
                        handleClick(event)
                    }}
                    onClick={(value)=>{
                        if(value != 'thunder'){
                            handleClick(event)
                        }
                    }}
                    onClickRange= {handleClose}
                />
            </Tooltip>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                slotProps={{
                    paper: {
                        sx:{
                            mt: -12
                        }
                    }
                }}
            >
                <div className="w-[45vw]">
                    { quick == 'todo' ? <AppTodo/> : <AppInbox/> }
                </div>
            </Popover>
        </Box>
    )
}

export default AppFoundation;