'use client'
import { Box } from "@mui/material";
import AppFoundation from "@/components/templates/AppFoundation";
import AppTextField from "@/components/atoms/AppTextField";

const AppQuick = () => {
    return(<>
        <Box className=" bg-black w-full h-[100vh] flex  justify-start items-center   ">
            <Box className=' w-[10%] h-full'></Box>
            <Box className=' w-[90%] h-full border-l-2 border-primary-grey' sx={{ borderColor: 'primary.grey' }}>
                <AppTextField
                    border={true}
                    borderRadius={'0px'}
                    placeholder ={' '}
                    backgroundColor='primary.grey'
                    startAdornment={true}
                    paddingStartAdornment={'0px 0px 0px 10px'}
                    value= {''}
                    onChange={((value)=>{
    
                    })}
                />
            </Box>
            <AppFoundation/>
        </Box>    
    </>)
}

export default AppQuick;