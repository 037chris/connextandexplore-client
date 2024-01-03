'use client';

import { BiSearch } from "react-icons/bi";
import Container from "../Container";
import Logo from "../Logo";
import UserMenu from "./UserMenu";

const Navbar = () => {

    return ( 
        <div className="fixed w-full bg-white z-10 shadow-sm m">
            <div className="max-grid">
                <div className="py-4 px-4 border-b-[1px]">
                    <Container>
                        <div className="flex flex-row items-center justify-between gap-3 md:gap-3">
                            <div>
                                <Logo />
                            </div>
                            {/* <BiSearch size={18} /> */}
                            <UserMenu />
                        </div>
                    </Container>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;