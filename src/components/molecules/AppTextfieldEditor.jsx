'use client'
import React, { useState } from "react";
import { Box } from "@mui/material";

import AppIconButton from "../atoms/AppIconButton";
import AppTextField from "../atoms/AppTextField";

const AppTextfieldEditor = (props) => {

    const [isChange, setChange] = useState(false)
    
    const handleChange = (value) => {
        props.onChange(value)
        setChange(true)
    }


    return (
        <Box className='flex items-center gap-[22px] w-full '>
            {
                <AppIconButton
                    iconPath={'/icon/pencil.svg'}
                    iconSize={20}
                    backgroundColor={'transparent'}
                    alt={'clock-icon'}
                    iconPadding={'20px'}
                    onClick={()=>{setChange(true)}}
                />
            }
            <Box className='min-w-[500px] '>   
                <AppTextField
                    id='textditor'
                    value={props.value}
                    border={isChange}
                    placeholder={'No Description'}
                    paddingLeft={'10px'}
                    onChange={handleChange}
                    onBlur={()=>{setChange(false)}}
                />
            </Box>
        </Box>
    );
};

export default AppTextfieldEditor;
