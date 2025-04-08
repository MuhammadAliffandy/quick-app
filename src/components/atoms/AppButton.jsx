import { Button , Typography} from "@mui/material";

const AppButton = (props) => {
    return(
        <Button sx={{ 
                backgroundColor: props.backgroundColor || "primary.main" , 
                border: props.border ||'none' ,
                margin: props.margin || 0,
                color: props.color || 'white',
                padding: props.padding || '22px',
                height: 0,
                width: 'fit-content',
                borderRadius: props.borderRadius || '5px',
                color: props.color || 'white',  
            }} 
            onClick={props.onClick || (()=>{})}
        >
            <Typography  color={ props.color || "white" } className="text-[14px]" >{props.text}</Typography>
        </Button>
    )
}

export default AppButton;