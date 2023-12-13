'use client'

import { CgCopy } from "react-icons/cg";
import EventFilter from "../pages/event/EventFilter";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Button from "../Button";

interface IntroProps {

    
}

const LocalEvents: React.FC<IntroProps> = ({

}) => {
const [query, setQuery] = useState<string>("");
const [plz, setPLZ] = useState<string>("");
const [loading, setLoading] = useState(false);

 const {
        register,
        handleSubmit,
        //setError,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({})

const handleSearch:SubmitHandler<FieldValues> = (data) => {
    //setLoading(true);
    setQuery(data.query||"");
    setPLZ(data.plz||"");
    console.log("click")
    //setLoading(false);
}

    return ( 
        <div className="bg-white flex w-full p-4">
            <div className="grid grid-cols-3 place-items-center w-full">
                <div className="col-span-2">
                    <CgCopy className="w-90 text-blue-600 text-center" />
                    <p className="text-center font-serif text-lg text-gray-800 mb-4">Mach die Stadt zu deinem Abenteuer</p>
                    <p className="text-center font-sans text-sm mb-4">Willkommen bei Click & Connect! 
                    Tauche ein in unsere Eventplattform und entdecke spannende Abenteuer in deiner Stadt.
                     Erlebe die Vielfalt deiner Stadt auf völlig neue Weisen und knüpfe wertvolle Verbindungen. Sei Teil unserer Community und gestalte deine Freizeit auf einzigartige Art und Weise.</p>
                  
                    <br />
                    <form onSubmit={handleSubmit(handleSearch)} action="" className="bg-blue-500 rounded ">
                        {/*<input type="text" placeholder="Event suchen" className="shadow-inner"/>
                        <input type="number" placeholder="Postleitzahl" className="shadow-inner"/>
                        <input type="button" value="Suchen" className="px-3 text-white"/>
                        */}
                        <Input
                            type='text'
                            label='Event suchen'
                            id='query'
                            register={register}
                            errors={errors}
                            disabled={loading}
                            pattern={/^[A-Za-z0-9\s\-.]+$/}
                        />
                        <Input
                            type='text'
                            label='Postleitzahl'
                            id='plz'
                            register={register}
                            errors={errors}
                            disabled={loading}
                            pattern={/^[A-Za-z0-9\s\-.]+$/}
                        />
                        <Button 
                            disabled={loading}
                            label={loading ? 'Loading...' : 'Search'}
                            onClick={() => {handleSubmit(handleSearch)}}
                        />
                    </form>
                    <br></br>
                    <EventFilter query={query} /*setQuery={setQuery} setPLZ={setPLZ} */plz={plz} ></EventFilter>

                </div>
                <div className="col-span-1">
                    <img className="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzhqM1WMJRsY9lYJ0Gi5OknZJiahj52a76iuVwB69fA&s" alt="" />
                </div>
            </div>
        </div>
  );
};

 
export default LocalEvents;