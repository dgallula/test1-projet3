import { Container, Nav, Navbar } from "react-bootstrap";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import logoImage from "../../../Assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import Role from "../../../Models/Role";

function Header(): JSX.Element {

    const navigator = useNavigate();
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        const user = authStore.getState().user;
        setUser(user);

        const unsubscribe = authStore.subscribe(() => {
            const user = authStore.getState().user;
            setUser(user);
        });

        return unsubscribe;
    }, []);


    return (
        <>
            <Navbar variant="dark" expand="lg" >
                <Container fluid >
                    <Navbar.Brand >
                        <img
                            alt=""
                            src={logoImage}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}

                        Observe Vacations
                    </Navbar.Brand>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px',
                         }}
                        navbarScroll

                    >
                        <Nav.Link onClick={() => navigator("/home")}>Home</Nav.Link>
                        {user?.role === Role.Admin && <Nav.Link  onClick={() => navigator("/add-vacation")}>Add vacation</Nav.Link>}
                        {user?.role === Role.Admin && <Nav.Link  onClick={() => navigator("/chart")}>Chart</Nav.Link>}

                    </Nav>
                    <AuthMenu />

                </Container>
            </Navbar>
        </>
    );
}

export default Header;