'use client'

import { CgCopy } from "react-icons/cg";

// import logo from "../../../public/vite.svg"
const Logo = () => {
    return ( 
        <div>
            <span><CgCopy className="hidden md:block cursor-pointer h-10 w-10"/></span>
        </div>
        //<img alt="Logo" src={logo} className="hidden md:block cursor-pointer" height="100" width="100"/>
    );
}
 
export default Logo;