'use client'
import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppIconButton from "../atoms/AppIconButton";

const AppDatePicker = (props) => {

    const [ isChange , setChange  ] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const inputRef = useRef()    

    return (
        <Box className='flex items-center gap-[22px]'>
            {
                <AppIconButton
                    iconPath={ props.value != '' || props.value != null ? '/icon/clock.svg' :  isChange ? '/icon/clock.svg' : '/icon/clock-gray.svg'}
                    iconSize={20}
                    backgroundColor={'transparent'}
                    alt={'clock-icon'}
                    iconPadding={'20px'}
                    onClick={()=>{
                        inputRef.current?.focus();
                    }}
                />
            }
            <Box className='max-w-[230px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    onClose={() => setChange(false)}
                    value={ props.value || selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue)
                        setChange(true)
                        props.onChange(newValue)
                    }}
                    format="DD/MM/YYYY"
                    slotProps={{
                        textField: {
                            variant: "outlined",
                            fullWidth: true,
                            inputRef: inputRef,
                            InputProps: {
                                style: {
                                    backgroundColor: "white",
                                },
                            },
                        },
                    popper: {
                        modifiers: [
                        {
                            name: "preventOverflow",
                            options: {
                            boundary: "window",
                            rootBoundary: "viewport",
                            altAxis: true,
                            },
                        },
                        {
                            name: "flip",
                            options: {
                            fallbackPlacements: ["bottom-end"], 
                            },
                        },
                        ],
                    },
                    }}
                />
                </LocalizationProvider>
            </Box>
        </Box>
    );
};

export default AppDatePicker;
