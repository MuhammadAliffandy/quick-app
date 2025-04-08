'use client'
import { Box} from "@mui/material";
import Image from "next/image";

const AppCircleButton = (props) => {



    return(
        props.isChild == true ?     
        <Box   className='relative min-w-fit h-auto flex items-center justify-start '>
        
            <Box onClick={props.onClickRange} sx={{ position: 'relative' , right:'15px', backgroundColor:  "primary.black" , p : props.iconPadding || '20px'}} className={` rounded-full`}>
                <Image src={props.iconPath || "/icon/chat-white.svg"  } alt={props.alt || "text"} width={ props.iconSize || 30} height={ props.iconSize || 30} />
            </Box>
            <Box onClick={props.onClick} sx={{ zIndex: 1, position: 'absolute' , backgroundColor: props.backgroundColor || "indicator.purple" , p : props.iconPadding || '20px'}} className={`cursor-pointer  rounded-full`}>
                <Image src={ props.iconPath ||  "/icon/chat-white.svg"  } alt={props.alt || "text"} width={ props.iconSize || 30} height={ props.iconSize || 30} />
            </Box>
        </Box> :
        <Box onClick={(props.onClick)} sx={{ backgroundColor: props.backgroundColor || "indicator.purple" , p : props.iconPadding || '20px'}} className={` cursor-pointer rounded-full`}>
            <Image src={ props.iconPath ||  "/icon/chat-white.svg"  } alt={props.alt || "text"} width={ props.iconSize || 30} height={ props.iconSize || 30} />
        </Box>
    )
}

export default AppCircleButton;