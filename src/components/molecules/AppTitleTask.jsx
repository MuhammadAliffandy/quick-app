'use client'
import { Box , Checkbox, Typography, Tooltip, Popover } from "@mui/material";
import AppTextField from "../atoms/AppTextField";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useState } from "react";
import AppButton from "../atoms/AppButton";

const AppTitleTask = (props) => {
    const [isCheck, setCheck] = useState(false)
    const [isChange, setChange] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Box className= 'flex items-stretch justify-between w-full h-fit gap-[22px]'>
            <Box className='flex items-top justify-start w-[50%] gap-[12px]'>
                <Checkbox
                    sx={{
                        "&.Mui-checked": {
                            color: "gray", 
                            background:"transparent"
                        },
                        "&.MuiCheckbox-root": {
                            padding: 0,
                        },
                        margin: 0,
            
                        width: 'fit-content',
                        height: 'fit-content'
                    }}
                    onChange={()=>{
                        props.onChangeCheck(isCheck)
                        setCheck(!isCheck)
                    }}
                />
            
                <AppTextField
                    id='typeBar'
                    border={isChange}
                    isCheck={isCheck}
                    disabled={isCheck}
                    padding={'0px'}
                    value={props.title}
                    onChange={(value)=>{
                        props.onChange(value)
                        setChange(true)
                    }}
                    onBlur={()=>{setChange(false)}}
                />
            
            </Box>
            <Box className='flex items-center justify-center gap-[22px] h-fit'>
                <Box className='flex items-center justify-center gap-[22px]'>
                    <Typography className={`text-[12px]! ${ isCheck ? 'opacity-0' : 'opacity-100'   }`} color="red">{props.datePeriod || ''}</Typography>
                    <Typography className={`text-[12px]! ${ isCheck ? 'opacity-0' : 'opacity-100'   }`} >{ props.dateTime || '' }</Typography> 
                </Box>
                { props.isOpen ?<KeyboardArrowUpIcon color="primary.grey" onClick={props.onChevronClick} /> : <KeyboardArrowDownIcon color="primary.grey" onClick={props.onChevronClick} />  }
                {/*  */}
                <Tooltip title="More">
                    <MoreHorizIcon color="primary.grey" onClick={handleClick} />
                </Tooltip>

                {/*  */}
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
                >
                    <AppButton
                        text={'Delete'}
                        color={'red'}
                        border={'1px solid #828282'}
                        backgroundColor={'white'}
                        onClick={props.onDelete}
                    />
                </Popover>
            </Box>  
        </Box>
    )
}

export default AppTitleTask;