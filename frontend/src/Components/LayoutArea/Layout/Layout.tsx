import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Router from "../Router/Router";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <main>
                <Router />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
