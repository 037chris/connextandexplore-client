import Footer from "../../html/Footer";
import { Header } from "../../html/Header";

const Agbs = () => {
    return (
        <>
            <Header homeRoute={'page'} headline={'AGBS'} />
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

export default Agbs;