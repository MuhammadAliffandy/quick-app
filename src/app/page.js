'use client'

import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router  = useRouter()
  return (
    <div className="w-full h-[100vh] bg-[#0F8A69] flex items-center justify-center">
        <Tooltip title ="Click, to show quicks">
          <p onClick={()=>{router.push('/quick')}} className="text-[200px] leading-[200px] text-white text-center font-bold cursor-pointer">Simple<br/>Quicks</p>
        </Tooltip>
    </div>
  );
}
