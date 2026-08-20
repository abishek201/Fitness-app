import "./login.css"

export default function login(){
    return(
        <>
        <div className="brandname">
            <h1>BRAND NAME</h1>
        </div>

        <div className="login-content">
            <h2>welcome to fitness</h2>
            <p>create account to get started</p>
            <button className="login-button">create account</button>
            <br></br>
            <input type="text"></input><br></br>
            <button className="login-button-2">continue with email</button>

        </div>
        </>
    )
}