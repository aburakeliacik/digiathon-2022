import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EvAraci = () => {

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
            <table className="table table-hover table-bordered">
                <thead>
                    <tr><th>Araci Olunan Evler</th></tr>
                </thead>
                <tbody>
                    
                    {ev.map(({id, yer, durum}) => (
                        <tr><td><Link to="ev" state={{from : {id}}}>Ev {id}</Link></td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default EvAraci;