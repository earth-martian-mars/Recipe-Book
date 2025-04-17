import { useState } from "react"

function Auth({token}){
    const [auth, setAuth] = useState()

    async function handleCheck(){
        try{
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate",
            {
                method: "GET",
                headers:{
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            console.log(result)
            setAuth(result.data)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <button onClick={handleCheck}>Check for SignUp</button>
        {auth ?
            <div>
                <h2>Your token is {token}</h2>
                <h2> Your username is {auth.username}</h2>
            </div>
        :
        <h2>You are not signed in! Please sign up</h2>
        
    }
        </>
    )
}

export default Auth