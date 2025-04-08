'use client'
import { Box, Typography } from "@mui/material";
import AppProfile from "../atoms/AppProfile";
import AppCircleBox from "../atoms/AppCircleBox";
import dayjs from "dayjs";

const AppMessage = (props) => {
    return(
        <Box className='flex justify-between items-center w-full cursor-pointer' onClick={props.onClick || (() => {})}>
            <Box className='flex items-center justify-start gap-[22px]'>
                <AppProfile
                    isGroup={props.isGroup}
                    iconPath={'/icon/user.svg'}
                    iconSize={20}
                    backgroundColor={'primary.main'}
                    alt={'profile'}
                    iconPadding={'10px'}
                />
                <Box className='flex flex-col gap-[2px] items-start justify-center'>

                    <Box className='flex items-center justify-start gap-[22px]'>
                        <Typography sx={{
                            fontSize: "14px",
                            fontWeight: 'bold',
                            color: 'primary.main'
                        }}>{props.title || 'SOME TITLE on here'}</Typography>
                        <Typography sx={{
                            fontSize: "12px",
                        }}>{dayjs(props.date).format("MMMM, D YYYY HH:mm") || '12/12/2002'}</Typography>
                    </Box>

                    { props.isGroup &&
                        <Typography sx={{
                            fontSize: "12px",
                            fontWeight: 'bold'
                        }}>{`${props.username}:` || 'Username:'}</Typography>
                    }
                    <Typography sx={{
                        fontSize: "12px",
                    }}>
                        {props.message || 'some latest message on here'}
                    </Typography>
                </Box>
            </Box>
            <Box className='pr-[4px]'>
                { !props.isRead && <AppCircleBox/> }
            </Box>
        </Box>
    )
}

export default AppMessage ;