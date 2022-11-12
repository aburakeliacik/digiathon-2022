import './App.css';
import { Routes} from "react-router-dom";
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
      marginBottom: "10px",
    }}>
    </nav>
    <Routes>
    </Routes>
    </>
  );
}

export default App;
