import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
                navigate("/satis");
            }
        }
        if (loggedIn == 0) {
            alert("Giris hatasi");
        }
        
    };
    
    /*return ( 
        
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
    );*/

    return (
        <>
    <main class="main-content  mt-0">
    <div class="page-header align-items-start min-vh-100" style={{backgroundImage: "url(" + "https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" + ")"}}>
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Giriş Yap</h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <div class="input-group input-group-outline my-3">
                    <input className="form-control" type="text" value={tc} onChange={e => setTc(e.target.value)} placeholder="TC Kimlik No" />
                  </div>
                  <div class="input-group input-group-outline mb-3">
                    <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifre" />
                  </div>
                  <div class="text-center">
                  <button onClick={onSubmit} className="btn btn-primary">Giriş</button>
                  </div>
                  <p class="mt-4 text-sm text-center">
                    Hesabınız yok mu?
                    <a href="./pages/sign-up.html" class="text-primary text-gradient font-weight-bold">Üye ol</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="./assets/js/core/popper.min.js"></script>
  <script src="./assets/js/core/bootstrap.min.js"></script>
  <script src="./assets/js/plugins/perfect-scrollbar.min.js"></script>
  <script src="./assets/js/plugins/smooth-scrollbar.min.js"></script>

  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <script src="./assets/js/material-dashboard.min.js?v=3.0.4"></script>
    
    </>
    );
}
 
export default Login;