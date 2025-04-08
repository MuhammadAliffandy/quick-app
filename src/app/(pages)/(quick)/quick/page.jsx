'use client'
import { Box } from "@mui/material";
import AppFoundation from "@/components/templates/AppFoundation";
import AppTextField from "@/components/atoms/AppTextField";
import { useState, useEffect } from "react";

const AppQuick = () => {
    const [searchValue , setSearchValue ] = useState(' ')

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return(<>
        {
        isMounted &&
        <Box className=" bg-black w-full h-[100vh] flex  justify-start items-center   ">
            <Box className=' w-[10%] h-full'></Box>
                <Box className=' w-[90%] h-full border-l-2 border-primary-grey' sx={{ borderColor: 'primary.grey' }}>
                    <AppTextField
                        border={true}
                        borderRadius={'0px'}
                        placeholder ={' '}
                        backgroundColor={'primary.grey'}
                        startAdornment={true}
                        color={'white'}
                        padding={'0px'}
                        paddingStartAdornment={'0px 0px 0px 10px'}
                        value= {searchValue}
                        onChange={((value)=>{
                            setSearchValue(value)
                        })}
                    />
                </Box>
                <AppFoundation/>
            </Box>    
        }
    </>)
}

export default AppQuick;