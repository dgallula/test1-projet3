import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Unsubscribe } from "redux";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/Store";
import SignIn from "../../AuthArea/LoginPage/LoginPage";
import Logout from "../../AuthArea/Logout/Logout";
import SignUp from "../../AuthArea/RegisterPage/RegisterPage";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import Chart from "../../VacationsArea/Chart/Chart";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Page404 from "../Page404/Page404";

function Router(): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    const unsubscribeMe: Unsubscribe = authStore.subscribe(() => {
        
        const user = authStore.getState().user;
        if (!user) {
            setIsLoggedIn(false);
            setIsAdmin(false);
        } else {
            setIsLoggedIn(true);
            const role = user?.role;
            if (role === Role.Admin) setIsAdmin(true);
            if (role !== Role.Admin) setIsAdmin(false);
        }
    });

    useEffect(() => {

        let user = authStore.getState().user;
        if (!user) {
            setIsLoggedIn(false);
            setIsAdmin(false);
        } else {
            const role = user?.role;
            if (role !== Role.Admin) setIsAdmin(false);
        }
    }, []);

    useEffect( () => {
        return () => {
            unsubscribeMe();   
        };
    },  []);

    return (
        <div className="Router">
            <Routes>
                <Route path="*" element={<Page404 />} />
                <Route path="/home" element={isLoggedIn ? <VacationsList /> : <Navigate to="/login" />} />

                {/* Auth Routes */}
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/logout" element={<Logout />} />

                {/* Vacations Routes */}
                <Route path="/add-vacation" element={isAdmin ? <AddVacation /> : <Navigate to="*" />} />
                <Route path="/update-vacation/:id" element={isAdmin ? <UpdateVacation /> : <Navigate to="*" />} />
                <Route path="/chart" element={isAdmin ? <Chart /> : <Navigate to="*" />} />
                <Route path="/" element={<Navigate replace to="/home" />} />
            </Routes>
        </div>
    );
}

export default Router;
