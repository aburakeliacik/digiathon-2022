import { useEffect } from "react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Deeds from "./build/contracts/Deeds.json";
import StakeHolder from "./build/contracts/Stakeholder.json";
import MainContract from "./build/contracts/MainContract.json";
import Sale from "./build/contracts/Sale.json";
// 1. Importing other modules
import { GetWeb3, GetContract, GetAccount } from "./BlockchainUtil";
import IERC721 from "./build/contracts/IERC721.json";

const Ev = () => {

    const location = useLocation();

    const [satisDurumu, setSatisDurumu] = useState("");
    const [ev, setEv] = useState();
    const [fiyat, setFiyat] = useState("");
    const [yuzdeler, setYuzde] = useState("");
    const [rol, setRol] = useState("");
    const [tc, setTc] = useState("");
    const [pay, setPay] = useState("");
    const [aliciAddr, setAlici] = useState("");
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
            var deeds = await new web.eth.Contract(Deeds.abi, "0x412a98aDBE04d457c1E028438F0E0c3f74F4f1de");

            console.log(deeds);
            //var deeds = await Contract.getContract(web, Deeds);
            var ownerId = parseInt(location.state.from);
            var ownerAddress = await deeds.methods.ownerOf(ownerId).send({from: "0xD9f96B93eDe61eCAd4206341d5Eb352bF6E1eE16"});
            //var ownerAddress = await deeds.ownerOf(0, {from: "0x412a98aDBE04d457c1E028438F0E0c3f74F4f1de"});
            console.log(ownerAddress);

            var stakeHolder = await new web.eth.Contract(StakeHolder.abi, "0x52f81eF7fC5dce7a5753207b9d27e6e2fa7b7AB1");
            var yuzde = await stakeHolder.methods.balanceOf("0xD9f96B93eDe61eCAd4206341d5Eb352bF6E1eE16").call();
            setYuzde(yuzde);
        } catch(err) {
            console.log(err);
        }

    }

    useEffect(() => {
        let kisiRol = sessionStorage.getItem("rol");
        setRol(kisiRol);
        baglan();
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
                        setSatisDurumu(satisDurum);
                    }
                }
            }
        }
    }, []);

    const guncelle = () => {

    }

    const iptal = () => {

    }

    const satisaKoy = async () => {
        try {
            setAlici(document.getElementById("aliciAddr").value);

            var mainContract = await new web3.eth.Contract(MainContract.abi, "0x155Ba44cfdcBcEFf5CCD5B5e7af334987e19a748");
            await mainContract.methods.createElection("0x52f81eF7fC5dce7a5753207b9d27e6e2fa7b7AB1", yuzdeler).send({from : "0xD9f96B93eDe61eCAd4206341d5Eb352bF6E1eE16"});
            
            let eCount = await mainContract.methods.saleId().call();
            console.log("election count");
            console.log(eCount);
            var salesAddr = await mainContract.methods.Sales(eCount-1).call();

            console.log("sales adresi");
            console.log(salesAddr);

            let saleCon = await new web3.eth.Contract(Sale.abi, salesAddr);
            saleCon.methods.addBuyer(aliciAddr).send({from : "0xD9f96B93eDe61eCAd4206341d5Eb352bF6E1eE16"});

            var stakeHolder = await new web3.eth.Contract(StakeHolder.abi, "0x52f81eF7fC5dce7a5753207b9d27e6e2fa7b7AB1");
            await stakeHolder.methods.approve(salesAddr, yuzdeler).send({from: "0xD9f96B93eDe61eCAd4206341d5Eb352bF6E1eE16"});

            console.log("approve bitt");

        } catch(err) {
            console.log(err);
        }
    }

    const aliciEkle = () => {

    }

    const aliciCikar = () => {

    }

    const payEkle = () => {
    }

    return ( 
        <>
        <div>
            <h3>Ev Bilgileri</h3>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr><th>Tapu No</th><th>Satış Durumu</th><th>Yuzdelik Pay</th><th>Alici Adresi</th></tr>
                </thead>
                <tbody>
                    <tr><td>{location.state.from}</td><td>{satisDurumu}</td><td>{yuzdeler}</td><td>{aliciAddr}</td></tr>
                </tbody>
            </table>
        </div>

        <div className="container card">
            <h3>Satışa Sun</h3>
            <div className="form-group" style={{margin:"10px"}}>
            {rol == "0" && <input type="text" value={fiyat} onChange={e => setFiyat(e.target.value)} placeholder="Fiyat" />}<br></br><br></br>
            {rol == "0" && <input type="text" value={tc} onChange={e => setTc(e.target.value)} placeholder="TC" />}<br></br><br></br><br></br>
            {rol == "0" && <input type="text" value={pay} onChange={e => setPay(e.target.value)} placeholder="Satılacak Pay" />}<br></br><br></br><br></br>
            {rol == "0" && <label><input type="checkbox" id="evli" onChange={payEkle} />&nbsp;&nbsp;&nbsp;Aracı eklenecek mi ?</label>}<br></br><br></br><br></br>
            {rol == "0" && <input type="text" id="aliciAddr" placeholder="Alici Adresi" />}<br></br><br></br>
            {rol == "0" && <button onClick={satisaKoy} className="btn btn-primary" style={{margin:"10px"}}>Satisa Koy</button>}
            {rol == "0" && <button onClick={iptal} className="btn btn-primary" style={{margin:"10px"}}>İptal</button>}
            {rol == "1" && <button onClick={aliciEkle} className="btn btn-primary" style={{margin:"10px"}}>Alici Ekle</button>}
            {rol == "1" && <button onClick={aliciCikar} className="btn btn-primary" style={{margin:"10px"}}>Alici Çıkar</button>}
            </div>
        </div>
        </>
    );
}
 
export default Ev;