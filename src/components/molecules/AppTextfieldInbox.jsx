import { Box } from "@mui/material";
import AppTextField from "../atoms/AppTextField";
import AppButton from "../atoms/AppButton";

const AppTextfieldInbox = (props) => {
    return(
        <Box sx={{ padding : props.padding || '0px 32px 22px 32px' }}  className = 'flex items-center gap-[12px] w-full'>
            <AppTextField
                border={true}
                paddingLeft={'10px'}
                placeholder ={props.placeholder}
                value= { props.value}
                onChange={((value)=>{
                    props.onChange(value)
                })}
            />
            <AppButton
                text={'Send'}
                onClick={ props.onClick || (()=>{}) }
            />

        </Box>
    )
}

export default AppTextfieldInbox;