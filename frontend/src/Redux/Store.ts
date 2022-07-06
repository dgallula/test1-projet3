import { createStore } from "redux";
import { vacationsReducer } from "./VacationsState";
import { AuthReducer } from "./AuthState"
import { followReducer } from "./FollowState";


export const vacationsStore = createStore(vacationsReducer);
export const authStore = createStore(AuthReducer);
export const followStore = createStore(followReducer);