import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EvAlis = () => {
    const [ev, setEv] = useState([]);

    useEffect(() => {
        try {
            
            let jsonData = require("./data/db.json");
            var tableRows = [];
            for (let i = 0; i<jsonData.length; i++) {
                tableRows[i] = jsonData[i];
            }
            setEv(tableRows);
        } catch (error) {
          console.log(error);
        }
      }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr><th>Araci Olunan Evler</th></tr>
                </thead>
                <tbody>
                    
                    {ev.map(({id, yer, durum}) => (
                        <tr><td><Link to="evAl" state={{from : {id}}}>Ev {id}</Link></td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default EvAlis;