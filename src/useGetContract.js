import { ethers } from "ethers";
import { useEffect, useState } from "react";


const useGetContract = (contractAdress, contractABI) => {

    const [contract, setContract] = useState(null);
   
    useEffect(() => {
        
        let provider;
        let signer;

        // Login to Metamask and check the if the user exists else creates one
        async function login() {
            let res = await connectToMetamask();
            console.log({ res });
            if (res === true) {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                signer = provider.getSigner();
                try {
                    let localContract = new ethers.Contract(contractAdress, contractABI, signer);
                    console.log(localContract);
                    setContract(localContract);
                } catch (err) {
                    alert("Contract adress not set properly!");
                }
            } else {
                alert("Couldn't connect to Metamask");
            }
        }

        // Check if the Metamask connects 
        async function connectToMetamask() {
            try {
                await window.ethereum.enable();
                return true;
            } catch (err) {
                return false;
            }
        }

        login();


    }, [contractAdress, contractABI])


    return (contract);
}

export default useGetContract;