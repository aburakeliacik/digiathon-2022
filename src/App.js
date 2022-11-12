import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Homepage from './Homepage';
import EvAlis from './EvAlis';
import EvSatis from './EvSatis';
import EvAraci from './EvAraci';
import Ev from './Ev';
import { Link } from 'react-router-dom';
import EvAlici from './EvAlici';
// 1. Importing other modules

function App() {
  /**
  function init() {
    // 2. Load web3
    const Web3 = new GetWeb3();
    this.web3 = await Web3.getWeb3();
    this.setState({ web3: this.web3 });

    // 3. Load Account
    const Account = new GetAccount();
    this.account = await Account.getAccount(this.web3);
    this.setState({ account: this.account[0] });

    // 4. Load Contract
    const Contract = new GetContract();
    this.mainInstance = await Contract.getContract(this.web3, contractJson);
    this.setState({ mainInstance: this.mainInstance });
  }*/

  return (
    <>
    <nav
    className="navbar navbar-dark shadow"
    style={{
      backgroundColor: "#1b2021",
      height: "60px",
      color: "white",
      marginBottom: "50px",
    }}>
    <Link to="/" style={{textDecoration :"none"}}><b style={{ cursor: "pointer", color: "white" }}>e-Devlet Kapısı</b></Link>
    </nav>
    <Routes>
      <Route path="/" element={<Login />}> </Route>
      <Route path="/satis/evim" element={<Ev />}> </Route>
      <Route path="/aracilik/ev" element={<Ev />}> </Route>
      <Route path="/alis/evAl" element={<EvAlici />}> </Route>
      <Route path="/satis" element={<EvSatis />}> </Route>
      <Route path="/alis" element={<EvAlis />}> </Route>
      <Route path="/aracilik" element={<EvAraci />}> </Route>
      <Route path="/anasayfa" element={<Homepage />}> </Route>
    </Routes>
    </>
  );
}

export default App;
