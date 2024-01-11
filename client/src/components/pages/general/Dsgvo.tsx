import { useEffect } from "react";
import Footer from "../../html/Footer";
import { Header } from "../../html/Header";

const Dsgvo = () => {
    useEffect(() => {
        document.title = 'Datenschutz bei uns - Connect & Explore';
    }, []);
    
    return (
        <>
            <Header homeRoute={'page'} headline={'DSGVO'} />
            <div className='max-grid content'>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="col-span-1 bg-blue-200 min-h-fit">
                        <p>Test</p>
                    </div>
                    <div className="col-span-1 bg-red-200 min-h-fit">
                        <p>Test</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Dsgvo;