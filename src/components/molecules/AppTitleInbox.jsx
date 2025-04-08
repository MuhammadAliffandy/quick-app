import { Box, Typography } from "@mui/material";
import AppIconButton from "../atoms/AppIconButton";

const AppTitleInbox = (props) => {
    return(
        <Box className='flex items-center w-full justify-between bg-white'>
            
            <Box className='flex gap-[22px] items-center justify-start'>
                <AppIconButton
                    iconPath={'/icon/arrow-back-black.svg'}
                    iconSize={20}
                    backgroundColor={'transparent'}
                    alt={'clock-icon'}
                    iconPadding={'20px'}
                    onClick={ props.onBack || (()=>{})}
                />
                <Box className='flex flex-col items-start justify-start gap-[2px]'>
                    <Typography sx={{
                        fontSize: "14px",
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}>{props.title || 'SOME TITLE on here'}</Typography>
                    {
                        props.isGroup && <Typography sx={{
                            fontSize: "12px",
                        }}>{`${ props.countUser || 0} participants`}</Typography>
                    }
                </Box>
            </Box>
            <AppIconButton
                    iconPath={'/icon/close-black.svg'}
                    iconSize={16}
                    backgroundColor={'transparent'}
                    alt={'clock-icon'}
                    iconPadding={'20px'}
                    onClick={ props.onClose || (()=>{})}
                />
        </Box>
    )
}

export default AppTitleInbox;