'use client'

import { Input, InputAdornment } from "@mui/material";
import Image from "next/image";

const AppTextField = (props) => {
    return (
        <Input
            id={props.id || ""}
            type={props.type || "text"}
            label={props.label || ""}
            size="small"
            value={props.value || ''}
            maxRows={5}
            placeholder={ props.placeholder || "Search" }
            sx={{
                padding:0,
                backgroundColor: props.backgroundColor || 'white',
                borderRadius : props.borderRadius || '5px'
            }}
            fullWidth
            multiline
            disableUnderline
            disabled={props.disabled || false}
            startAdornment={
                props.startAdornment && (
                    <InputAdornment position="start" sx={{padding: props.paddingStartAdornment , paddingRight: props.paddingRight || "0px" }}>
                        <Image src={"/icon/search-white.svg"} alt="search-icon" width={15} height={15} />
                    </InputAdornment>
                )
            }
            endAdornment={
                props.endAdornment && (
                    <InputAdornment position="end" sx={{ paddingRight: props.paddingRight || "0px" }}>
                        <Image src={props.endAdornment || "/icon/search.svg"} alt="search-icon" width={20} height={20} />
                    </InputAdornment>
                )
            }
            slotProps={{
                input: {
                    style: {
                        width: "100%",
                        color: props.color || "primary.black",
                        fontSize: props.fontSize || "14px",
                        padding: props.padding || "10px",
                        paddingLeft: props.paddingLeft,
                        borderRadius: "5px",
                        border: props.border ? "1px solid #828282" : "",
                        textDecoration: props.isCheck ?  'line-through' : 'none',
                        "& .MuiInputBaseRoot.MuiDisabled": {
                            WebkitTextFillColor: "primary.grey",
                            opacity:1
                        },
                    },
                },
            }}
            className="w-[100%]"
            onChange={(e) => {
                props.onChange(e.target.value)
            }}
            onBlur={props.onBlur || (()=>{})}
        />
    );
};

export default AppTextField;
