import Footer from "../../html/Footer";
import { Header } from "../../html/Header";

export default function NotFound() {
    return (
        <>
            <Header homeRoute={'page'} headline={'Oops! You seem to be lost.'} />
            <div className="max-grid content-pt">
                <h1 className="center">Oops! You seem to be lost.</h1>
            </div>
            <Footer />
        </>
    )
}