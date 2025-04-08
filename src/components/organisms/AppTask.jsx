'use client'
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AppTitleTask from "../molecules/AppTitleTask";
import AppDatePicker from "../molecules/AppDatePicker";
import AppTextfieldEditor from "../molecules/AppTextfieldEditor";
import { convertDatePeriodText } from "@/utils/helper";
import AppButton from "../atoms/AppButton";
import dayjs from "dayjs";


function MuiCollapse(props) {

    return (
        <AnimatePresence>
            {props.isActive && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <Box className="ml-10 flex flex-col gap-[5px] justify-start items-start">
                        <AppDatePicker 
                            value={props.date}
                            onChange={(value) => {
                                props.onChangeDate(value)
                            }}/>
                        <AppTextfieldEditor 
                            value={props.description}
                            onChange={(value) => {
                                props.onChangeDescription(value)
                        }}/>
                        { props.isNew && 
                            <Box className='flex items-center justify-end gap-[12px] w-full'>
                                <AppButton
                                    text={'Cancel'}
                                    backgroundColor={'red'}
                                    onClick={props.onCancel}
                                />
                                <AppButton
                                    text={'Add'}
                                    onClick={props.onAdd}
                                />
                            </Box> 
                        }
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function AppTask(props) {
    const [isExpanded, setExpanded] = useState(true);

    const [ title, setTitle ] = useState('Type a message')
    const [ date, setDate ] = useState('')
    const [ dateTime, setDateTime ] = useState('')
    const [ datePeriod, setDatePeriod ] = useState('')
    const [ description, setDescription ] = useState('No Description')

    const handleChangeTitle = (value) => {
        setTitle(value)
        props.onChangeTitle(value)
    }

    const handleChangeDescription = (value) => {
        setDescription(value)
        props.onChangeDescription(value)
    }

    const handleChangeDate = (value) => {
        const formattedDate = value.format("DD/MM/YYYY")
        setDate(value)
        setDateTime(formattedDate)
        props.onChangeDate(value)
    }

    const handleDatePeriodText=()=>{
        const value = convertDatePeriodText(props.date);
        setDatePeriod(value)
    }
    
    const handleCurrentData = () => {
        const datePeriod = convertDatePeriodText('2025-04-10T17:00:00.000Z');
        setTitle(props.title)
        setDate(dayjs(props.date))
        setDatePeriod(datePeriod)
        setDateTime(dayjs(props.dateTime).format("DD/MM/YYYY"))
        setDescription(props.description)
    }

    useEffect(()=>{
        if(!props.isNew){
            handleCurrentData()
            handleDatePeriodText()
        }
    },[])
    
    return (
        <Box className="flex flex-col gap-[5px] w-full">
            <AppTitleTask
                title={title}
                dateTime={dateTime}
                datePeriod={datePeriod}
                isOpen={isExpanded}
                onChange={handleChangeTitle}
                onChevronClick={() => setExpanded(!isExpanded)}
                onChangeCheck={(value)=>{setExpanded(value)}}
                onDelete={props.onDeleteTask}
            />
            <MuiCollapse 
                isActive={isExpanded} 
                isNew={props.isNew}
                date={date}
                description={description}
                onChangeDate={handleChangeDate} 
                onChangeDescription={handleChangeDescription}   
                onCancel={props.onCancel}
                onAdd={props.onAdd}
            />
        </Box>
    );
}
