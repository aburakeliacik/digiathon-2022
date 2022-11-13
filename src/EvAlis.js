import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetWeb3, GetContract, GetAccount } from "./BlockchainUtil";
import MainContract from "./build/contracts/MainContract.json";
import Sale from "./build/contracts/Sale.json";
import Deeds from "./build/contracts/Deeds.json";


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
            await setweb3(web);
        
            if (web.eth.getAccounts === undefined) {
                console.log("undef");
            } else {
                console.log("degil");
            }

            // 4. Load Contract 
            const Contract = new GetContract();
            //var deeds = await Contract.getContract(web, Deeds);
            console.log("girdi");
            var mainContract = await new web.eth.Contract(MainContract.abi, "0xBdD49a9fe0cc424236c41A8831431EBF85149d3c");
            console.log("main alindi");
            let eCount = await mainContract.methods.saleId().call();
            console.log("election count");
            console.log(eCount);
            var salesAddr = await mainContract.methods.Sales(eCount-1).call();
            let saleCon = await new web3.eth.Contract(Sale.abi, salesAddr);

            var price = await saleCon.methods.getPrice().call();
            var ownerAddr = await saleCon.methods.getOwner().call();
            var percentage = await saleCon.methods.getPercentage().call();
            
            await setFiyat(price);
            await setSahipAdres(ownerAddr);
            await setYuzde(percentage);
        } catch(err) {
            console.log(err);
        }

    }

    useEffect( () => {
        baglan(); 
    }, []);

    const tutarHesapla = (e) => {
        setKredi(e.target.value);
        setTutar((fiyat-e.target.value).toString())
    };
     
    const onayla = async () => { 
        var mainContract = await new web3.eth.Contract(MainContract.abi, "0xBdD49a9fe0cc424236c41A8831431EBF85149d3c");
        let eCount = await mainContract.methods.saleId().call();
        var salesAddr = await mainContract.methods.Sales(eCount-1).call();
        let saleCon = await new web3.eth.Contract(Sale.abi, salesAddr);
        saleCon.methods.addBuyer("0xD9f96B93eDe61eCAd4206341d5Eb352bF6E1eE16").send({from : "0xD9f96B93eDe61eCAd4206341d5Eb352bF6E1eE16"});
        alert("Banka ödeme onayı gönderilmiştir.");
    }
    const pesinVer = () => {
        setPesin(1);
        setBanka(0);
    }
    /*
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
    );*/

    return (
        <>
        <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
        <div class="sidenav-header">
          <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
            <img src={require("./assets/img/logo-ct.png")} class="navbar-brand-img h-100" alt="main_logo" />
            <span class="ms-1 font-weight-bold text-white">e-Devlet Kapısı</span>
          </a>
        </div>
        <hr class="horizontal light mt-0 mb-2" />
        <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-white " >
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="material-icons opacity-10">dashboard</i>
                </div>
                <Link to="/satis" style={{color: "white"}}>Tapularım</Link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white active bg-gradient-primary" >
                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i class="material-icons opacity-10">table_view</i>
                </div>
                <span class="nav-link-text ms-1"><Link to="/alis" style={{color: "white"}}>Alış İşlemlerim</Link></span>
              </a>
            </li>
          </ul>
        </div>
        
      </aside>
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
          <div class="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">e-Devlet</a></li>
                <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Tapularım</li>
              </ol>
            </nav>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                <div class="input-group input-group-outline">
                  <label class="form-label">Buraya yaz...</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <ul class="navbar-nav  justify-content-end">
              
                <li class="nav-item d-flex align-items-center">
                  <a href="../pages/sign-in.html" class="nav-link text-body font-weight-bold px-0">
                    <i class="fa fa-user me-sm-1"></i>
                    <span class="d-sm-inline d-none"><Link to="/">Çıkış Yap</Link></span>
                  </a>
                </li>
                <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                  <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
                    <div class="sidenav-toggler-inner">
                      <i class="sidenav-toggler-line"></i>
                      <i class="sidenav-toggler-line"></i>
                      <i class="sidenav-toggler-line"></i>
                    </div>
                  </a>
                </li>
                <li class="nav-item px-3 d-flex align-items-center">
                  <a href="javascript:;" class="nav-link text-body p-0">
                    <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                  </a>
                </li>
                <li class="nav-item dropdown pe-2 d-flex align-items-center">
                  <a href="javascript:;" class="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-bell cursor-pointer"></i>
                  </a>
                  <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                    <li class="mb-2">
                      <a class="dropdown-item border-radius-md" href="javascript:;">
                        <div class="d-flex py-1">
                          <div class="my-auto">
                            <img src={require("./assets/img/team-2.jpg")} class="avatar avatar-sm  me-3 " />
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="text-sm font-weight-normal mb-1">
                              <span class="font-weight-bold">New message</span> from Laur
                            </h6>
                            <p class="text-xs text-secondary mb-0">
                              <i class="fa fa-clock me-1"></i>
                              13 minutes ago
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li class="mb-2">
                      <a class="dropdown-item border-radius-md" href="javascript:;">
                        <div class="d-flex py-1">
                          <div class="my-auto">
                            <img src={require("./assets/img/small-logos/logo-spotify.svg")} class="avatar avatar-sm bg-gradient-dark  me-3 " />
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="text-sm font-weight-normal mb-1">
                              <span class="font-weight-bold">New album</span> by Travis Scott
                            </h6>
                            <p class="text-xs text-secondary mb-0">
                              <i class="fa fa-clock me-1"></i>
                              1 day
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item border-radius-md" href="javascript:;">
                        <div class="d-flex py-1">
                          <div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                            <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
                              <title>credit-card</title>
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                  <g transform="translate(1716.000000, 291.000000)">
                                    <g transform="translate(453.000000, 454.000000)">
                                      <path class="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                      <path class="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="text-sm font-weight-normal mb-1">
                              Payment successfully completed
                            </h6>
                            <p class="text-xs text-secondary mb-0">
                              <i class="fa fa-clock me-1"></i>
                              2 days
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="container-fluid py-4">
          <div class="row">
            <div class="mt-4">
              <div class="card">
                <div class="card-header pb-0 px-3">
                  <h6 class="mb-0">Satılan Tapu Bilgileri</h6>
                </div>
                <div class="card-body pt-4 p-3">
                  <ul class="list-group">
                    <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                      <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm">Satıcı Adresi: {sahipAdres}</h6>
                        <span class="mb-2 text-xs">Taşınmaz Fiyatı: <span class="text-dark font-weight-bold ms-sm-2">{fiyat} ₺</span></span>
                        <span class="mb-2 text-xs">Satış Payı: <span class="text-dark ms-sm-2 font-weight-bold">%{yuzde}</span></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="">
              <div class="row">
                <div class="">
                  <div class="row">
                    <div class="col-md-6 col-6">
                      <div class="card">
                        <div class="card-header mx-4 p-3 text-center">
                          <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                            <i class="material-icons opacity-10">account_balance</i>
                          </div>
                        </div>
                        <div class="card-body pt-0 p-3 text-center">
                          <h6 class="text-center mb-0">Bankalı ödeme</h6>
                          <hr class="horizontal dark my-3" />
                          <h5 class="mb-0"><label>Fiyat <input style={{width: "100%",display:"inline-block"}} id="fiyat" type="text" value={fiyat} onChange={e => setFiyat(e.target.value)} placeholder="Toplam Tutar" readOnly/></label></h5>
                          <h5 class="mb-0"><label>Çekilecek Kredi Tutari <input type="text" id="kredi" style={{width: "100%",display:"inline-block"}} value={kredi} onChange={tutarHesapla} placeholder="Tutar" /></label></h5>
                          <h5 class="mb-0"><label>Ödenecek Nakit Tutar <input type="text" style={{width: "100%",display:"inline-block"}} value={tutar} placeholder="Nakit Tutarı" /></label></h5>
         
                          <div class="card-body p-3">
                            <div class="row">
                              <div class="">

                                <button onClick={onayla} class="btn bg-gradient-info w-100 mb-0 toast-btn" type="button" className="btn btn-primary">Onayla</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-6">
                      <div class="card">
                        <div class="card-header mx-4 p-3 text-center">
                          <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                            <i class="material-icons opacity-10">account_balance_wallet</i>
                          </div>
                        </div>
                        <div class="card-body pt-0 p-3 text-center">
                          <h6 class="text-center mb-0">Peşin Ödeme</h6>
                          <hr class="horizontal dark my-3" />
                          <h5 class="mb-0"><label for="fiyat"> Fiyat <input style={{width: "100%",display:"inline-block"}} type="text" id="fiyat" value={fiyat} placeholder="Fiyat" readOnly/></label></h5>
                          <div class="card-body p-3">
                            <div class="row">
                              <div class="">
                                <button onClick={pesinVer} class="btn bg-gradient-info w-100 mb-0 toast-btn" type="button" className="btn btn-primary" style={{margin:"10px"}}>Peşin Öde</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div class="fixed-plugin">
        <a class="fixed-plugin-button text-dark position-fixed px-3 py-2">
          <i class="material-icons py-2">settings</i>
        </a>
        <div class="card shadow-lg">
          <div class="card-header pb-0 pt-3">
            <div class="float-start">
              <h5 class="mt-3 mb-0">Material UI Configurator</h5>
              <p>See our dashboard options.</p>
            </div>
            <div class="float-end mt-4">
              <button class="btn btn-link text-dark p-0 fixed-plugin-close-button">
                <i class="material-icons">clear</i>
              </button>
            </div>
          </div>
          <hr class="horizontal dark my-1" />
          <div class="card-body pt-sm-3 pt-0">
            <div>
              <h6 class="mb-0">Sidebar Colors</h6>
            </div>
            <a href="javascript:void(0)" class="switch-trigger background-color">
              <div class="badge-colors my-2 text-start">
                <span class="badge filter bg-gradient-primary active" data-color="primary" onclick="sidebarColor(this)"></span>
                <span class="badge filter bg-gradient-dark" data-color="dark" onclick="sidebarColor(this)"></span>
                <span class="badge filter bg-gradient-info" data-color="info" onclick="sidebarColor(this)"></span>
                <span class="badge filter bg-gradient-success" data-color="success" onclick="sidebarColor(this)"></span>
                <span class="badge filter bg-gradient-warning" data-color="warning" onclick="sidebarColor(this)"></span>
                <span class="badge filter bg-gradient-danger" data-color="danger" onclick="sidebarColor(this)"></span>
              </div>
            </a>
            <div class="mt-3">
              <h6 class="mb-0">Sidenav Type</h6>
              <p class="text-sm">Choose between 2 different sidenav types.</p>
            </div>
            <div class="d-flex">
              <button class="btn bg-gradient-dark px-3 mb-2 active" data-class="bg-gradient-dark" onclick="sidebarType(this)">Dark</button>
              <button class="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-transparent" onclick="sidebarType(this)">Transparent</button>
              <button class="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-white" onclick="sidebarType(this)">White</button>
            </div>
            <p class="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>
            <div class="mt-3 d-flex">
              <h6 class="mb-0">Navbar Fixed</h6>
              <div class="form-check form-switch ps-0 ms-auto my-auto">
                <input class="form-check-input mt-1 ms-auto" type="checkbox" id="navbarFixed" onclick="navbarFixed(this)" />
              </div>
            </div>
            <hr class="horizontal dark my-3" />
            <div class="mt-2 d-flex">
              <h6 class="mb-0">Light / Dark</h6>
              <div class="form-check form-switch ps-0 ms-auto my-auto">
                <input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version" onclick="darkMode(this)" />
              </div>
            </div>
            <hr class="horizontal dark my-sm-4" />
            <a class="btn bg-gradient-info w-100" href="https://www.creative-tim.com/product/material-dashboard-pro">Free Download</a>
            <a class="btn btn-outline-dark w-100" href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard">View documentation</a>
            <div class="w-100 text-center">
              <a class="github-button" href="https://github.com/creativetimofficial/material-dashboard" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star creativetimofficial/material-dashboard on GitHub">Star</a>
              <h6 class="mt-3">Thank you for sharing!</h6>
              <a href="https://twitter.com/intent/tweet?text=Check%20Material%20UI%20Dashboard%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard" class="btn btn-dark mb-0 me-2" target="_blank">
                <i class="fab fa-twitter me-1" aria-hidden="true"></i> Tweet
              </a>
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-dashboard" class="btn btn-dark mb-0 me-2" target="_blank">
                <i class="fab fa-facebook-square me-1" aria-hidden="true"></i> Share
              </a>
            </div>
          </div>
        </div>
      </div>
      <script src="../assets/js/core/popper.min.js"></script>
      <script src="../assets/js/core/bootstrap.min.js"></script>
      <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
      <script src="../assets/js/plugins/smooth-scrollbar.min.js"></script>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
      <script src="../assets/js/material-dashboard.min.js?v=3.0.4"></script>
        </>
    );
}
 
export default EvAlis;