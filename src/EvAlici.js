import { useEffect } from "react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EvAlici = () => {

    const location = useLocation();
    const {from} = location.state;
    const [ev, setEv] = useState([]);
    const [fiyat, setFiyat] = useState("");
    const [pesin, setPesin] = useState(0);
    const [banka, setBanka] = useState(0);
    const [kredi, setKredi] = useState("");

    const [tutar, setTutar] = useState("");



    const a = 5;
    console.log(a);
    console.log("deger");

    useEffect(() => {
        try {


            console.log(from);
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
      }, []);

    const guncelle = () => {

    }

    const iptal = () => {

    }

    const onayla = () => {

    }

    const bankaEkle = () => {
        setPesin(0);
        setBanka(1);
    }

    const pesinVer = () => {
        setPesin(1);
    }

    return ( 
        <>
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr><th>Yer</th><th>Durum</th></tr>
                </thead>
                <tbody>
                    
                    {ev.map(({id, yer, durum}) => (
                        <tr><td>{yer}</td><td>{durum}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
            <button onClick={pesinVer} className="btn btn-primary" style={{margin:"10px"}}>Pesin</button>
            <button onClick={bankaEkle} className="btn btn-primary" style={{margin:"10px"}}>Banka Ekle</button>
            {banka == 0 && pesin == 1 && <input type="text" value={fiyat} onChange={e => setFiyat(e.target.value)} placeholder="Tutar" />}
            {pesin == 1 && banka == 0 && <button onClick={onayla} className="btn btn-primary" style={{margin:"10px"}}>Onayla</button>}
            {pesin == 0 && banka == 1 && <input type="text" value={kredi} onChange={e => setKredi(e.target.value)} placeholder="Kredi" />}
            {pesin == 0 && banka == 1 && <input type="text" value={tutar} onChange={e => setTutar(e.target.value)} placeholder="Tutar" />}
            {pesin == 0 && banka == 1 && <button onClick={onayla} className="btn btn-primary" style={{margin:"10px"}}>Onayla</button>}

        </div>
        </>
    );
}
 
export default EvAlici;