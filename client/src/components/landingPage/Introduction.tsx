'use client'

import { CgCopy } from "react-icons/cg";

interface IntroProps {

    
}

const LocalEvents: React.FC<IntroProps> = ({

}) => {
  
    return ( 
        <div className="bg-white flex w-full p-4">
            <div className="grid grid-cols-3 place-items-center w-full">
                <div className="col-span-2">
                    <p className="text-center font-serif text-lg text-gray-800 mb-4">Mach die Stadt zu deinem Abenteuer</p>
                    <p className="text-center font-sans text-sm mb-4">Willkommen bei Click & Connect! 
                    Tauche ein in unsere Eventplattform und entdecke spannende Abenteuer in deiner Stadt.
                     Erlebe die Vielfalt deiner Stadt auf völlig neue Weisen und knüpfe wertvolle Verbindungen. Sei Teil unserer Community und gestalte deine Freizeit auf einzigartige Art und Weise.</p>
                  
                    <br />
                    <form action="" className="bg-blue-500 rounded ">
                        <input type="text" placeholder="Event suchen" className="shadow-inner"/>
                        <input type="number" placeholder="Postleitzahl" className="shadow-inner"/>
                        <input type="button" value="Suchen" className="px-3 text-white"/>
                    </form>
                    

                </div>
                <div className="col-span-1">
                    <img className="" src={process.env.PUBLIC_URL + '/Images/HEADER_IMG.png'} alt="" />
                </div>
            </div>
        </div>
  );
};

 
export default LocalEvents;