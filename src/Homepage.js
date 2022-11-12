import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

    let navigate = useNavigate();
    const [rol, setRol] = useState("");
    const [web3, setweb3] = useState(); 
    const [account, setAccount] = useState(); 
    const [instance, setInstance] = useState(); 

    useEffect(() => {
      try {
        let kisiRol = sessionStorage.getItem("rol");
        setRol(kisiRol);
      } catch (error) {
        console.log(error);
      }
    }, []);
  
    const evSat = () => {
        navigate("/satis")
    }

    const evAraci = () => {
        navigate("/aracilik")
    }

    const evAl = () => {
        navigate("/alis")
    }

    return (
        <div class="btn-group-vertical">
            <button onClick={evSat} className="btn btn-primary" style={{margin:"10px"}}>Tapularım</button> <br></br>
            {rol === "1" && <button onClick={evAraci} className="btn btn-primary" style={{margin:"10px"}}>Aracılık İşlemleri</button>}  <br></br>
            <button onClick={evAl} className="btn btn-primary" style={{margin:"10px"}}>Ev Alış İşlemleri</button>
        </div>
    
    )

}
 
export default Homepage;