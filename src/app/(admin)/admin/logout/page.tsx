"use client"
import LogoutButton from "@/components/LogoutButton"
import { useEffect } from "react"

export default function Page(){
    useEffect(()=>{

    },[])
    return(
        <div className="text-black">
            You have successfully logged out.
            Redirecting...

            <LogoutButton/>
        </div>
    )
}