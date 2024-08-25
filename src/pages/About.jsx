import { useAuth } from "../store(context API)/authContextAPI";



const About=()=>{

    const {user}=useAuth();

    return <>
    <h1>ABOUT PAGE</h1>
    <p> Welcome {user?user.username:"Buddy"} </p>
    </>
}

export default About;