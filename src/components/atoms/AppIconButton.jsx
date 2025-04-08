import Image from "next/image";

const AppIconButton = (props) => {
    return(
            <Image 
                src={ props.iconPath ||  "/icon/chat-white.svg"  } 
                alt={props.alt || "text"} 
                width={ props.iconSize || 30} 
                height={ props.iconSize || 30} 
                onClick={props.onClick ||  (() => {})} 
            />

    )
}

export default AppIconButton;