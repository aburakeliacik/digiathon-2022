import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Importing other modules
import { GetWeb3, GetContract, GetAccount } from "./BlockchainUtil";

const EvSatis = () => {

    const [data, setData] = useState();
    const [tapular, setTapular] = useState([]);
    const [durumlar, setDurumlar] = useState([]);

    useEffect(() => {
        // tapular cekilir
        let jsonData = require("./data/tapu.json");
        var tapu = [];
        var durum = [];
        for (let i = 0; i<jsonData.length; i++) {
            let sahipSayisi = jsonData[i].sahipler.length;
            for (let j = 0; j<sahipSayisi; j++) {
                if (sessionStorage.getItem("id") === jsonData[i].sahipler[j].id) {
                    let satisDurum = "Satışta Değil";
                    if (jsonData[i].sahipler[j].satis_durumu === "1") {
                        satisDurum = "Satışta";
                    }
                    let json = {
                        "id" : i,
                        "tapuNo" : jsonData[i].tapu_id,
                        "satisDurumu" : satisDurum,
                    };
                    tapu.push(jsonData[i].tapu_id);
                    durum.push(satisDurum);
                    console.log(tapular);
                    console.log(durumlar);
                    //tableRows.row.push(json);
                    //console.log(tableRows);
                    //let updated = data.push(tableRows);
                    //setData(tableRows.row);

                    //tapular.push(tableRows[i]);
                }
            }
        }
        setTapular(tapu);
        setDurumlar(durum);
        console.log(tapu);
        console.log(durum);
        tapular.map((t) => (
            console.log(t)
        ))
    }, []);
    

    return (        
        <div>
            <h3>Tapularım</h3><br></br>
            <table className="table table-hover table-bordered">
                <thead>
                
                </thead>
                <tbody>
                    <tr>
                    <td style={{fontWeight:'bold'}}>Sahip Olunan Evler</td>
                    {tapular.map((t) => (
                        <td><Link to="./evim" style={{textDecoration:"none"}} state={{from : t }}>Tapu Numarası {t}</Link></td>
                    ))}
                    </tr><tr>
                    <td style={{fontWeight:'bold'}}>Satış Durumları</td>
                    {durumlar.map((t) => (
                        <td>{t}</td>
                    ))}
                    </tr>
                </tbody>
            </table>
        </div>
    ); 
    
}
 
export default EvSatis;