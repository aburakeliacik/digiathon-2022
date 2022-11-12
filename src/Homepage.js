import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetWeb3, GetContract, GetAccount } from "./BlockchainUtil";

const Homepage = () => {

    let navigate = useNavigate();
    const [rol, setRol] = useState("");
    const [web3, setweb3] = useState(); 
    const [account, setAccount] = useState(); 
    const [instance, setInstance] = useState(); 

    const baglan = async () => {
      const getWeb = new GetWeb3();
      let web = await getWeb.getWeb3();
      setweb3(web);
  
      if (web.eth.getAccounts === undefined) {
          console.log("undef");
      } else {
          console.log("degil");
      }
      /*const Account = new GetAccount();
      let account = Account.getAccount(web);
      //setAccount("0xdeee5e1742aab8f4bed8f18ebc055dfadf6f0a1a");
      setAccount(account[0]);

      // 4. Load Contract
      const Contract = new GetContract();
      let main = await Contract.getContract(web, HelloWorldJSON);
      setInstance(main);*/
    }

    useEffect(() => {
      try {
        let kisiRol = sessionStorage.getItem("rol");
        setRol(kisiRol);
        baglan();
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