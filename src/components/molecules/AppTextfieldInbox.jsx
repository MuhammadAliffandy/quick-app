import { Box, Typography } from "@mui/material";
import AppTextField from "../atoms/AppTextField";
import AppButton from "../atoms/AppButton";
import CloseIcon  from "@mui/icons-material/Close";

const AppTextfieldInbox = (props) => {
    return(
        <Box sx={{ padding : props.padding || '0px 32px 22px 32px' }}  className = 'flex items-end justify-end w-full gap-[12px] '>
                <Box  className = 'flex flex-col items-end justify-end ] w-full'>
                    {
                        props.isReply && <Box sx={{
                            backgroundColor: "#F2F2F2",
                        }} className={'flex flex-col items-stretch justify-start p-[10px] w-full rounded-t-[5px] border-[1px] border-black border-b-0'}>
                            <Box className = 'flex items-center w-full justify-between'> 
                                <Typography sx={{ fontWeight: '700' }}  className="text-[10px] font-bold " >{`Replying to ${props.usernameReply || ''}`}</Typography>
                                <CloseIcon onClick={props.onCloseReply} color='black' className="cursor-pointer"/>
                            </Box>
                            <Typography className="text-[10px]">{props.messageReply || 'Messages from friend'}</Typography>
                        </Box>
                    }
                    <AppTextField
                        border={true}
                        borderRadius={props.isReply ? '0px 0px 5px 5px' : '5px' }
                        paddingLeft={'10px'}
                        placeholder ={props.placeholder}
                        value= { props.value}
                        onChange={((value)=>{
                            props.onChange(value)
                        })}
                    />
                </Box>
                <AppButton
                    text={'Send'}
                    onClick={ props.onClick || (()=>{}) }
                />
        </Box>
    )
}

export default AppTextfieldInbox;