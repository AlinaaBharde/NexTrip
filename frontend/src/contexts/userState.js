import userContext from "./userContext";
import axios from "axios";

// const {isuserAuthenticated, username, email} = axios.get('http://localhost:8000/login');
const isuserAuthenticated =true;
const username ="Varun";
const email = "viinoi@tyf";


const UserState = (props) =>{

    const state = {isuserAuthenticated, username, email};

    return (
        <userContext.Provider value={state}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;