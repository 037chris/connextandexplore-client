import Footer from "./components/html/Footer";
import { Header } from "./components/html/Header";

export default function ErrorFallback({ error }:
    { error: Error }) {
    return (<>
        <Header homeRoute={'page'} headline={'Oops! Etwas lief schief.'} />
        <div>
            <h1>Etwas lief schief:</h1>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
        </div>
        <Footer />
    </>
    )
}