import { useEffect } from "react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { GetWeb3, GetContract, GetAccount } from "./BlockchainUtil";

const Ev = () => {

    const location = useLocation();

    const [satisDurumu, setSatisDurumu] = useState("");
    const [ev, setEv] = useState();
    const [fiyat, setFiyat] = useState("");
    const [yuzde, setYuzde] = useState("");
    const [rol, setRol] = useState("");
    const [tc, setTc] = useState("");
    const [web3, setweb3] = useState(); 
    const [account, setAccount] = useState(); 
    const [instance, setInstance] = useState();

    /*
    const baglan = async () => {
        const getWeb = new GetWeb3();
        let web = await getWeb.getWeb3();
        setweb3(web);
    
        if (web.eth.getAccounts === undefined) {
            console.log("undefined");
        } else {
            console.log("not undefined");
        }
        const Account = new GetAccount();
        let account = Account.getAccount(web);
        //setAccount("0xdeee5e1742aab8f4bed8f18ebc055dfadf6f0a1a");
        setAccount(account[0]);
  
        
        const Contract = new GetContract();
        let main = await Contract.getContract(web, HelloWorldJSON);
        setInstance(main);
    }*/

    useEffect(() => {
        let kisiRol = sessionStorage.getItem("rol");
        setRol(kisiRol);

        // tapular cekilir
        let jsonData = require("./data/tapu.json");
        for (let i = 0; i<jsonData.length; i++) {
            if (location.state.from === jsonData[i].tapu_id) {
                for (let j = 0; j< jsonData[i].sahipler.length; j++) {
                    let kisiId = sessionStorage.getItem("id");
                    if (kisiId === jsonData[i].sahipler[j].id) {
                        let satisDurum = "Satışta Değil";
                        if (jsonData[i].sahipler[j].satis_durumu === "1") {
                            satisDurum = "Satışta";
                        }
                        console.log(satisDurum);
                        setSatisDurumu(satisDurum);
                    }
                }
            }
        }
        console.log(satisDurumu);

    }, []);

    /*useEffect(() => {
        try {
            
            let kisiRol = sessionStorage.getItem("rol");
            setRol(kisiRol);

            var evBilgileri = [];
            let jsonData = require("./data/db.json");
            var tableRows = [];
            for (let i = 0; i<jsonData.length; i++) {
                if (from.id == jsonData[i].id) {
                    evBilgileri.push(jsonData[i]);
                }
            }
            console.log(evBilgileri);
            setEv(evBilgileri);
        } catch (error) {
          console.log(error);
        }
      }, []);*/

    const guncelle = () => {

    }

    const iptal = () => {

    }

    const satisaKoy = () => {


    }

    const aliciEkle = () => {

    }

    const aliciCikar = () => {

    }

    const evliEkle = () => {
        if (document.getElementById("evli").checked) {
            setYuzde(50);
        }
        else {
            setYuzde("");
        }
    }

    return ( 
        <>
        <div>
            {console.log(satisDurumu)}
            <table className="table table-hover table-bordered">
                <thead>
                    <tr><th>Tapu No</th><th>Satış Durumu</th></tr>
                </thead>
                <tbody>
                    <tr><td>{location.state.from}</td><td>{satisDurumu}</td></tr>
                </tbody>
            </table>
        </div>

        <div className="container card">
            <div className="form-group" style={{margin:"10px"}}>
            {rol == "0" && <input type="text" value={fiyat} onChange={e => setFiyat(e.target.value)} placeholder="Fiyat" />}<br></br><br></br>
            {rol == "0" && <input type="text" value={yuzde} onChange={e => setYuzde(e.target.value)} placeholder="Yuzde" />}<br></br><br></br><br></br>
            {rol == "0" && <label><input type="checkbox" id="evli" onChange={evliEkle} />Evli Misiniz?</label>}<br></br><br></br><br></br>
            {rol == "0" && <button onClick={satisaKoy} className="btn btn-primary" style={{margin:"10px"}}>Satisa Koy</button>}
            {rol == "0" && <button onClick={guncelle} className="btn btn-primary" style={{margin:"10px"}}>Güncelle</button>}
            {rol == "0" && <button onClick={iptal} className="btn btn-primary" style={{margin:"10px"}}>İptal</button>}
            {rol == "1" && <input type="text" value={tc} onChange={e => setTc(e.target.value)} placeholder="TC" />}<br></br>
            {rol == "1" && <button onClick={aliciEkle} className="btn btn-primary" style={{margin:"10px"}}>Alici Ekle</button>}
            {rol == "1" && <button onClick={aliciCikar} className="btn btn-primary" style={{margin:"10px"}}>Alici Çıkar</button>}
            </div>
        </div>
        </>
    );
}
 
export default Ev;