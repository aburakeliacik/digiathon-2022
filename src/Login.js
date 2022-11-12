import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HelloWorldJSON from "./build/contracts/HelloWorld.json";

const Login = () => {

    const [tc, setTc] = useState("");
    const [password, setPassword] = useState("");  
    //const [web3, setweb3] = useState(); 
    //const [account, setAccount] = useState(); 
    //const [instance, setInstance] = useState(); 

    let navigate = useNavigate();

    let jsonData = require("./data/user.json");

    /*
    useEffect(() => {
        dene();
    }, []);

    const dene = async () => {

        const getWeb = new GetWeb3();
        let web = await getWeb.getWeb3();
        setweb3(web);
    
        if (web.eth.getAccounts === undefined) {
            console.log("undef");
        } else {
            console.log("degil");
        }
        const Account = new GetAccount();
        let account = Account.getAccount(web);
        setAccount("0xdeee5e1742aab8f4bed8f18ebc055dfadf6f0a1a");
        console.log(account[0]);
        // 4. Load Contract
        const Contract = new GetContract();
        let main = await Contract.getContract(web, HelloWorldJSON);
        setInstance(main);
        //let election = await new web3.eth.Contract(HelloWorldJSON.abi, "0x39bc2cA7ED9358e38d61517dcA538959fA96b1e8");
        try {
            await instance.test({ from: "0xdeee5e1742aab8f4bed8f18ebc055dfadf6f0a1a" });
        }catch(err) {
            console.log(err);
        }
    }*/

    const onSubmit = () => {
        let loggedIn = 0;
        for(let i = 0; i < jsonData.length; i++) {
            if (tc === jsonData[i].tc && password === jsonData[i].sifre) {
                loggedIn = 1;
                sessionStorage.setItem("rol", jsonData[i].arabulucu);
                sessionStorage.setItem("tc", jsonData[i].tc);
                sessionStorage.setItem("id", jsonData[i].id);
                console.log("Id atandi", jsonData[i].id);
                navigate("/anasayfa");
            }
        }
        if (loggedIn == 0) {
            alert("Giris hatasi");
        }
        
    };
    
    return ( 
        <div className="container card">
            <br></br>
            <h3>E-Devlet Giriş Kapısı</h3>
            <br></br>
            <div className="form-group" style={{margin:"0 auto"}}>
                <input type="text" value={tc} onChange={e => setTc(e.target.value)} placeholder="TC" /><br></br><br></br>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sifre"/><br></br> <br></br>
                <button onClick={onSubmit} className="btn btn-primary">Submit</button><br></br><br></br>
            </div>
        </div>
     );
}
 
export default Login;