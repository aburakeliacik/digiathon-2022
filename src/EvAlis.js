import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetWeb3, GetContract, GetAccount } from "./BlockchainUtil";
import MainContract from "./build/contracts/MainContract.json";
import Sale from "./build/contracts/Sale.json";

const EvAlis = () => {

    const [ev, setEv] = useState([]);
    const [web3, setweb3] = useState(); 
    const [fiyat, setFiyat] = useState("");
    const [yuzde, setYuzde] = useState(""); 
    const [sahipAdres, setSahipAdres] = useState("");  
    const [pesin, setPesin] = useState(0);
    const [banka, setBanka] = useState(0);
    const [kredi, setKredi] = useState("");
    const [tutar, setTutar] = useState("");
 
    const baglan = async () => {
        try {

            const getWeb = new GetWeb3();
            let web = await getWeb.getWeb3();
            setweb3(web);
        
            if (web.eth.getAccounts === undefined) {
                console.log("undef");
            } else {
                console.log("degil");
            }

            // 4. Load Contract
            const Contract = new GetContract();
            //var deeds = await Contract.getContract(web, Deeds);
            var mainContract = await new web.eth.Contract(MainContract.abi, "0xBdD49a9fe0cc424236c41A8831431EBF85149d3c");

            let eCount = await mainContract.methods.saleId().call();
            console.log("election count");
            console.log(eCount);
            var salesAddr = await mainContract.methods.Sales(eCount-1).call();
            let saleCon = await new web3.eth.Contract(Sale.abi, salesAddr);

            var price = await saleCon.methods.getPrice().call();
            var ownerAddr = await saleCon.methods.getOwner().call();
            var percentage = await saleCon.methods.getPercentage().call();
            
            setFiyat(price);
            setSahipAdres(ownerAddr);
            setYuzde(percentage);

        } catch(err) {
            console.log(err);
        }

    }

    useEffect(() => {
        baglan();
      }, []);

      
    const bankaEkle = () => {
        setPesin(0);
        setBanka(1);
    }

    const tutarHesapla = (e) => {
        setKredi(e.target.value);
        setTutar((fiyat-kredi).toString());
    };

    
    const onayla = () => {

    }

    const pesinVer = () => {
        setPesin(1);
        setBanka(0);
    }

    return (
        <div className="container card">
            <div class="form-group">
                <h3>Adınıza Açılan Satılık Evler</h3>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr><th>Ev Fiyatı</th><th>Satılan Tapu Payı</th><th>Satıcı Adresi</th></tr>
                    </thead>
                    <tbody>
                        <tr><th>{fiyat}</th><th>{yuzde}</th><th>{sahipAdres}</th></tr>
                    </tbody>
                </table>
            </div>
            <div class="form-group">
                <div className="row">
                    <div className="col">
                        <div className="leftside">
                            <button onClick={pesinVer} className="btn btn-primary" style={{margin:"10px"}}>Pesin Öde</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="rightside" style={{textAlign: "center"}}>
                            <button onClick={bankaEkle} className="btn btn-primary" style={{margin:"10px"}}>Banka Aracılığıyla Öde</button><br></br>
                            <label>Ev Değeri <input type="text" value={fiyat} onChange={e => setFiyat(e.target.value)} placeholder="Toplam Tutar" /></label><br></br><br></br>
                            <label>Çekilecek Kredi Tutari <input type="text" value={kredi} onChange={tutarHesapla} placeholder="Tutar" /></label><br></br><br></br>
                            <label>Ödenecek Nakit Tutar <input type="text" value={tutar} onChange={e => setTutar(e.target.value)} placeholder="Nakit Tutarı" /></label><br></br>
                            <button onClick={onayla} className="btn btn-primary" style={{margin:"10px"}}>Onayla</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EvAlis;