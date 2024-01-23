import Footer from "../../html/Footer";
import { Header } from "../../html/Header";

export default function NotFound() {
    return (
        <>
            <Header homeRoute={'page'} headline={'Oops! Du bist verloren gegangen.'} />
            <div className="max-grid content-pt">
                <h1 className="center">Oops! Du bist verloren gegangen.</h1>
            </div>
            <Footer />
        </>
    )
}