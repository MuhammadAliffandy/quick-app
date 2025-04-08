'use client'
import { Box, Typography , Tooltip , Popover, Divider} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppButton from "../atoms/AppButton";
import { useState } from "react";

const AppBubbleInbox = (props) => {

    
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return(
        <Box className = {`flex flex-col justify-end  w-full p-[10px]`} sx={{ alignItems:props.align}} >
            <Typography sx={{
                fontSize: "12px",
                fontWeight: 'bold',
                color:  props.usernameColor || 'primary.main '
            }}>{props.username || 'username'}</Typography>
            <Box  className={`flex ${props.direction || ''} justify-start items-start w-[70%] `}>
                <Box sx={{ backgroundColor: props.color }} className='p-[10px] rounded-[5px] flex flex-col items-start justify-start gap-[12px]'>
                    <Typography sx={{
                        fontSize: "12px",
                        color: 'primary.black'
                    }}>{props.message || 'some message on here'}</Typography>
                    <Typography sx={{
                        fontSize: "12px",
                        color: 'primary.black'
                    }}>{props.time || '19 : 32'}</Typography>
                </Box>
                <Tooltip>
                    <MoreHorizIcon color="primary.grey" onClick={handleClick} />
                </Tooltip>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: props.alignPopover,
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: props.alignPopover,
                    }}
                >
                <div className="flex flex-col items-stretch"> 
                    <AppButton
                        text={'Edit'}
                        color={'blue'}
                        backgroundColor={'white'}
                        padding={'16px'}
                        onClick={props.onEdit}
                        />
                    <Divider sx={{
                        '&::before, &::after': {
                            borderBottomWidth: '1px', 
                            borderColor: 'primary.grey',
                        },
                    }}/>
                    <AppButton
                        padding={'15px'}
                        text={'Delete'}
                        color={'red'}
                        border={'0px solid #828282'}
                        backgroundColor={'white'}
                        onClick={props.onDelete}
                    />
                </div>
                </Popover>
            </Box>
        </Box>
    )
}

export default AppBubbleInbox;