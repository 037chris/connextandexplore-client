const Footer = () => {
    return (
        <footer>
            <div className="max-grid">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-5 lg:col-span-4">
                        <p>4/12 Breite</p>
                    </div>
                    <div className="col-span-12 md:col-span-2 lg:col-span-1">
                        <p>1/12 Breite</p>
                    </div>
                    <div className="col-span-12 md:col-span-5 lg:col-span-7">
                        <p>7/12 Breite</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;