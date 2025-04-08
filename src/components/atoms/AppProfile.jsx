'use client'
import { Box} from "@mui/material";
import Image from "next/image";

const AppProfile = (props) => {
    return(
        props.isGroup ?     
        <Box  className='relative w-fit bg-red h-auto inline-flex  items-center '>
            <Box onClick={props.onClick} sx={{  position: 'relative' , backgroundColor: 'profile.grey', p : props.iconPadding || '20px'}} className={`cursor-pointer  rounded-full`}>
                <Image src={ "/icon/user-grey.svg"  } alt={props.alt || "text"} width={ props.iconSize || 30} height={ props.iconSize || 30} />
            </Box>
            <Box onClick={props.onClickRange} sx={{zIndex: 1, position: 'absolute' , right:'-15px',  backgroundColor: props.backgroundColor || "profile.main"  , p : props.iconPadding || '20px'}} className={` rounded-full`}>
                <Image src={ props.iconPath ||  "/icon/user.svg"  } alt={props.alt || "text"} width={ props.iconSize || 30} height={ props.iconSize || 30} />
            </Box>
        </Box> :
        <Box onClick={(props.onClick)} sx={{ backgroundColor: props.backgroundColor || "profile.main" , p : props.iconPadding || '20px'}} className={` cursor-pointer rounded-full`}>
            <Image src={ props.iconPath ||  "/icon/user.svg"  } alt={props.alt || "text"} width={ props.iconSize || 30} height={ props.iconSize || 30} />
        </Box>
    )
}

export default AppProfile;