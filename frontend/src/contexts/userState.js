import userContext from "./userContext";

// const isuserAuthenticated = axios.get('http://localhost:3000/auth/login');
const isuserAuthenticated = true;


const UserState = (props) =>{

    const state = isuserAuthenticated;

    return (
        <userContext.Provider value={state}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;