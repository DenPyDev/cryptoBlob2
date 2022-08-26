import React, {useState} from "react";
import {ethers} from "ethers";
import "./App.css";
import {Button, Card} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function decimalToHexString(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return '0x' + number.toString(16).toUpperCase();
}


const _PROVIDER = new ethers.providers.Web3Provider(window.ethereum, "any");
const _USDC = {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi:  [{'inputs': [], 'stateMutability': 'nonpayable', 'type': 'constructor'}, {'inputs': [{'internalType': 'address', 'name': '', 'type': 'address'}, {'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'name': 'INHERIT_TICKETS', 'outputs': [{'internalType': 'address', 'name': 'sender', 'type': 'address'}, {'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}, {'internalType': 'bytes32', 'name': 'petName', 'type': 'bytes32'}, {'internalType': 'bytes32', 'name': 'newPetName', 'type': 'bytes32'}, {'internalType': 'uint256', 'name': 'timestamp', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': '', 'type': 'address'}, {'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'name': 'OWNER_PET_LIST', 'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': '', 'type': 'address'}, {'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}], 'name': 'OWNER_PET_MAP', 'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}, {'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'name': 'PET_GENES_MAP', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': 'petOwner', 'type': 'address'}, {'internalType': 'string', 'name': 'sPetName', 'type': 'string'}, {'internalType': 'string', 'name': 'sNewPetName', 'type': 'string'}], 'name': 'PUBInheritCreateTicket', 'outputs': [], 'stateMutability': 'payable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': 'ticket_index', 'type': 'uint256'}], 'name': 'PUBacceptMyTicket', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'string', 'name': 'sPetName', 'type': 'string'}], 'name': 'PUBarise', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'string', 'name': 'sPetName', 'type': 'string'}], 'name': 'PUBcheckAmIPetOwner', 'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'PUBcheckMyTickets', 'outputs': [{'components': [{'internalType': 'address', 'name': 'sender', 'type': 'address'}, {'internalType': 'uint256', 'name': 'value', 'type': 'uint256'}, {'internalType': 'bytes32', 'name': 'petName', 'type': 'bytes32'}, {'internalType': 'bytes32', 'name': 'newPetName', 'type': 'bytes32'}, {'internalType': 'uint256', 'name': 'timestamp', 'type': 'uint256'}], 'internalType': 'struct cryptoBlob4.Claim[]', 'name': '', 'type': 'tuple[]'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'string', 'name': 'sPetName', 'type': 'string'}], 'name': 'PUBcheckPetNameExists', 'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': 'wallet', 'type': 'address'}], 'name': 'PUBgetOwnerPetList', 'outputs': [{'internalType': 'string[]', 'name': '', 'type': 'string[]'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'string', 'name': 'sPetName', 'type': 'string'}], 'name': 'PUBgetPetGenesStr', 'outputs': [{'internalType': 'uint256[]', 'name': '', 'type': 'uint256[]'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': 'wallet_to', 'type': 'address'}, {'internalType': 'string', 'name': 'sPetName', 'type': 'string'}, {'internalType': 'string', 'name': 'sNewPetName', 'type': 'string'}], 'name': 'PUBinherit', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': 'ticket_index', 'type': 'uint256'}], 'name': 'PUBrejectMyTicket', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [], 'name': 'SEED', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'bytes32', 'name': 'petName', 'type': 'bytes32'}], 'name': 'arise', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': 'wallet', 'type': 'address'}, {'internalType': 'bytes32', 'name': 'petName', 'type': 'bytes32'}], 'name': 'containsOwnerPet', 'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256[]', 'name': 'genes', 'type': 'uint256[]'}], 'name': 'deviateGenes', 'outputs': [{'internalType': 'uint256[]', 'name': '', 'type': 'uint256[]'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint8', 'name': 'lenght', 'type': 'uint8'}], 'name': 'generateGenes', 'outputs': [{'internalType': 'uint256[]', 'name': '', 'type': 'uint256[]'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'bytes32', 'name': 'petName', 'type': 'bytes32'}], 'name': 'getPetGenes', 'outputs': [{'internalType': 'uint256[]', 'name': '', 'type': 'uint256[]'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': 'wallet_to', 'type': 'address'}, {'internalType': 'bytes32', 'name': 'petName', 'type': 'bytes32'}, {'internalType': 'bytes32', 'name': 'newPetName', 'type': 'bytes32'}], 'name': 'inherit', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': 'from', 'type': 'uint256'}, {'internalType': 'uint256', 'name': 'to', 'type': 'uint256'}, {'internalType': 'uint256', 'name': 'seed', 'type': 'uint256'}], 'name': 'randInt', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'string', 'name': 'text', 'type': 'string'}], 'name': 'readStr', 'outputs': [{'internalType': 'bytes32', 'name': '', 'type': 'bytes32'}], 'stateMutability': 'pure', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': 'wallet', 'type': 'address'}, {'internalType': 'bytes32', 'name': 'petName', 'type': 'bytes32'}], 'name': 'setOwnerPet', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'bytes32', 'name': 'petName', 'type': 'bytes32'}, {'internalType': 'uint256[]', 'name': 'genes', 'type': 'uint256[]'}], 'name': 'setPetGenes', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': 'n', 'type': 'uint256'}], 'name': 'updateSeed', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}]
    ,
};
const _SIGNER = _PROVIDER.getSigner();
const CONTRACT = new ethers.Contract(_USDC.address, _USDC.abi, _SIGNER);

function App() {


    let [imgUrl, setImgUrl] = useState('https://via.placeholder.com/500x500/09f/fff.png');
    let [textPet1, setTextPet1] = useState('.......');
    let [textPet2, setTextPet2] = useState('.......');
    let [textPet3, setTextPet3] = useState('.......');
    let [textPetGenes, setTextPetGenes] = useState('.......');
    let [textPetArise, setTextPetArise] = useState('.......');
    let [textPetInherit, setTextPetInherit] = useState('.......');

    let [textPetInheritCrTicket, setTextPetInheritCrTicket] = useState('.......');

    let [textMyTickets, setTextMyTickets] = useState('.......');


    let [textAccept_ticket, setTextAccept_ticket] = useState('.......');
    let [textReject_ticket, setTextReject_ticket] = useState('.......');



    const [data, setdata] = useState({
        address: "",
        Balance: null,
    });

    const btn_sign = async () => {
        const message = "Hello";
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];
        const signature = await window.ethereum.request({method: 'personal_sign', params: [message, account]});
        console.log(signature)

    };

    const btn_wallet_connect = () => {
        if (window.ethereum) {
            window.ethereum
                .request({method: "eth_requestAccounts"})
                .then((res) => accountChangeHandler(res[0]));
        } else {
            alert("install metamask extension!!");
        }
    };

    const btn_send_eth = async () => {
        if (window.ethereum) {
            const transactionParameters = {
                gasPrice: decimalToHexString(10 ** 13),
                gas: decimalToHexString(160000),
                value: decimalToHexString(1),
                to: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
                from: window.ethereum.selectedAddress,
            }
            try {
                const txHash = await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [transactionParameters],
                })
                alert(txHash)
            } catch (error) {
                alert(error.message)
            }
        } else {
            alert("install metamask extension!!");
        }
    };

    const btn_arise = async () => {
        if (window.ethereum) {
            try {
                setTextPetArise(textPetArise = `.......`);
                let petname = document.getElementById("pet-name-input").value

                let tx2;
                try{
                    tx2 = await CONTRACT.PUBcheckPetNameExists(petname);}

                catch {

                    tx2 = false;
                }

                if( !tx2)
                {
                    const tx = await CONTRACT.PUBarise(petname, {gasPrice: 20e9});
                    console.log(`Transaction hash: ${tx.hash}`);

                    const receipt = await tx.wait();
                    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
                    console.log(`Gas used: ${receipt.gasUsed.toString()}`);
                    setTextPetArise(textPetArise = `Tx: ${tx.hash}`);

                }
                else {
                    if(! tx2){
                        setTextPetArise(textPetArise = `Error name not valid`);
                        console.log(`Error name not valid`);
                    }

                }

            } catch (error) {
                let err_text = error.toString();

                if (error.toString().includes('reason=')) {
                    err_text = error.toString().split('reason=')[1].split('transaction=')[0];
                }
                setTextPetArise(textPetArise = `${err_text}`);
            }
        } else {
            alert("install metamask extension!!");
        }
    };

    const btn_inherit = async () => {
        if (window.ethereum) {
            try {
                setTextPetInherit(textPetInherit = `.......`);
                let to_addr = document.getElementById("pet-inh-input-to").value // "0xBcd4042DE499D14e55001CcbB24a551F3b954096";
                let parent_petname = document.getElementById("pet-inh-input-parent-name").value
                let child_petname = document.getElementById("pet-inh-input-child-name").value
                const tx = await CONTRACT.PUBinherit(to_addr, parent_petname, child_petname, {gasPrice: 20e9});
                console.log(`Transaction hash: ${tx.hash}`);
                const receipt = await tx.wait();
                console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
                console.log(`Gas used: ${receipt.gasUsed.toString()}`);
                setTextPetInherit(textPetInherit = `Tx: ${tx.hash}`);

            } catch (error) {
                let err_text = error.toString();
                if (error.toString().includes('reason=')) {
                    err_text = error.toString().split('reason=')[1].split('transaction=')[0];
                }
                setTextPetInherit(textPetInherit = `${err_text}`)
            }
        } else {
            alert("install metamask extension!!");
        }
    };



    const btn_inherit_create_ticket = async () => {
        if (window.ethereum) {
            try {
                setTextPetInherit(textPetInherit = `.......`);
                let pet_owner = document.getElementById("pet-inh-cr-ticket-input-to").value // "0xBcd4042DE499D14e55001CcbB24a551F3b954096";
                let parent_petname = document.getElementById("pet-inh-cr-ticket-input-parent-name").value
                let child_petname = document.getElementById("pet-inh-cr-ticket-input-child-name").value
                let create_ticket_val = document.getElementById("pet-inh-cr-ticket-val").value

                const tx = await CONTRACT.PUBInheritCreateTicket(pet_owner, parent_petname, child_petname, {gasPrice: 20e9, value: parseInt(create_ticket_val)*10**9});
                console.log(`Transaction hash: ${tx.hash}`);
                const receipt = await tx.wait();
                console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
                console.log(`Gas used: ${receipt.gasUsed.toString()}`);
                setTextPetInherit(textPetInherit = `Tx: ${tx.hash}`);

            } catch (error) {
                let err_text = error.toString();
                if (error.toString().includes('reason=')) {
                    err_text = error.toString().split('reason=')[1].split('transaction=')[0];
                }
                setTextPetInheritCrTicket(textPetInheritCrTicket = `${err_text}`)
            }
        } else {
            alert("install metamask extension!!");
        }
    };

    const btn_get_genes = async () => {
        if (window.ethereum) {
            let genpetname = document.getElementById("gen-pet-name-input").value
            const tx = await CONTRACT.PUBgetPetGenesStr(genpetname);
            // alert(tx)
            console.log(`Transaction qqq: ${tx}`);
            setTextPetGenes(textPetGenes = `Genes: ${tx}`);
            const _imgUrl = `http://localhost:5000/video_feed?rnd=${Math.random().toString()}&p=${tx.join("&p=")}`
            console.log(_imgUrl);
            setImgUrl(imgUrl = _imgUrl);
        } else {
            alert("install metamask extension!!");
        }
    };

    const btn_get_tickets = async () => {
        if (window.ethereum) {
            let tx = await CONTRACT.PUBcheckMyTickets();

            let array = tx.toString().split(',')



            let print = '';

            const chunkSize = 5;
            for (let i = 0; i < array.length; i += chunkSize) {
                const chunk = array.slice(i, i + chunkSize);
                let [sender, value, petName, newPetName, timestamp] = chunk
                petName =  ethers.utils.parseBytes32String(petName) ;
                newPetName = ethers.utils.parseBytes32String(newPetName);


                let date = new Date(timestamp*1000);

                let str_date = date.getDate()+
                    "/"+(date.getMonth()+1)+
                    "/"+date.getFullYear()+
                    " "+date.getHours()+
                    ":"+date.getMinutes()+
                    ":"+date.getSeconds();


                console.log(sender, parseInt(value),  petName, newPetName, str_date);

                print += sender + '\n' + value  + '\n' + petName+ '\n' + newPetName+ '\n' + str_date
                print +='\n\n'
            }

            console.log(`Transaction qqq: ${array}`);
            setTextMyTickets(textMyTickets = `${print}`);
        } else {
            alert("install metamask extension!!");
        }
    };


    const btn_is_pet_valid = async () => {
        if (window.ethereum) {
            let checkpetname = document.getElementById("check-pet-name-input").value

            try {

                const tx2 = await CONTRACT.PUBcheckPetNameExists(checkpetname);
                const tx3 = await CONTRACT.PUBcheckAmIPetOwner(checkpetname);

                setTextPet2(textPet2 = `PetNameExists ?: ${tx2}`);
                setTextPet3(textPet3 = `AmIPetOwner: ${tx3}`);
                console.log(`PetNameExists ?: ${tx2}\nAmIPetOwner: ${tx3}`);

            } catch (error) {
                let err_text = error.toString();

                if (error.toString().includes('reason=')) {
                    err_text = error.toString().split('reason=')[1].split('transaction=')[0];
                }
                setTextPet1(textPet1 = err_text);
                setTextPet2(textPet2 = err_text);
                setTextPet3(textPet3 = err_text);
            }
        } else {
            alert("install metamask extension!!");
        }
    };



    const btn_accept_ticket = async () => {
        if (window.ethereum) {
            try {
                setTextPetInherit(textPetInherit = `.......`);
                let index = document.getElementById("pet-input-accept_ticket").value
                const tx = await CONTRACT.PUBacceptMyTicket(index, {gasPrice: 20e9});
                console.log(`Transaction hash: ${tx.hash}`);
                const receipt = await tx.wait();
                console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
                console.log(`Gas used: ${receipt.gasUsed.toString()}`);
                setTextAccept_ticket(textAccept_ticket = `Tx: ${tx.hash}`);

            } catch (error) {
                let err_text = error.toString();
                if (error.toString().includes('reason=')) {
                    err_text = error.toString().split('reason=')[1].split('transaction=')[0];
                }
                setTextAccept_ticket(textAccept_ticket = `${err_text}`)
            }
        } else {
            alert("install metamask extension!!");
        }
    };


    const btn_reject_ticket = async () => {
        if (window.ethereum) {
            try {
                setTextPetInherit(textPetInherit = `.......`);
                let index = document.getElementById("pet-input-reject_ticket").value
                const tx = await CONTRACT.PUBrejectMyTicket(index, {gasPrice: 20e9});
                console.log(`Transaction hash: ${tx.hash}`);
                const receipt = await tx.wait();
                console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
                console.log(`Gas used: ${receipt.gasUsed.toString()}`);
                setTextReject_ticket(textReject_ticket = `Tx: ${tx.hash}`);

            } catch (error) {
                let err_text = error.toString();
                if (error.toString().includes('reason=')) {
                    err_text = error.toString().split('reason=')[1].split('transaction=')[0];
                }
                setTextReject_ticket(textReject_ticket = `${err_text}`)
            }
        } else {
            alert("install metamask extension!!");
        }
    };



    const getbalance = (address) => {
        window.ethereum
            .request({
                method: "eth_getBalance",
                params: [address, "latest"]
            })
            .then((balance) => {
                setdata({
                    Balance: ethers.utils.formatEther(balance),
                    Address: address,
                });
            });
    };

    const accountChangeHandler = (account) => {
        setdata({
            address: account,
        });
        getbalance(account);
    };

    return (
        <div className="App">
            <section id="hero">
                <div className="container">
                    <div className="row justify-content-md-center col-lg-12 pt-5">
                        <div
                            className="col-lg-6 pt-lg-1 order-2 order-lg-1 d-flex flex-column justify-content-center aos-init aos-animate"
                            data-aos="fade-up" >
                            <div>
                                <Card className="text-center" >
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_wallet_connect} variant="primary" style={{fontSize:'0.8rem'}}>Connect</Button>
                                                <text className="form-control" style={{fontSize:'0.8rem'}}>Balance: {data.Balance}</text>
                                            </div>
                                            <text className="form-control" style={{fontSize:'0.8rem'}} >Address: {data.Address}</text>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card className="text-center ">
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_arise} variant="primary" style={{backgroundColor: 'orange' ,fontSize:'0.8rem'}} > Arise Pet </Button>
                                                <input type="text" className="form-control input-sm" id="pet-name-input" name="title" placeholder='Pet name' style={{fontSize:'0.8rem'}}/>
                                            </div>
                                            <p className="form-control" style={{fontSize:'0.8rem'}}> {textPetArise} </p>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card className="text-center">
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_inherit} variant="primary" style={{backgroundColor: 'orange' ,fontSize:'0.8rem'}}> Inherit Pet </Button>
                                                <input type="text" className="form-control input-sm" id="pet-inh-input-parent-name" placeholder='parent' style={{fontSize:'0.8rem'}}/>
                                                <input type="text" className="form-control input-sm" id="pet-inh-input-child-name" placeholder='child' style={{fontSize:'0.8rem'}} />
                                            </div>
                                            <input type="text" className="form-control" id="pet-inh-input-to" placeholder='to' style={{fontSize:'0.8rem'}}></input>
                                            <p className="form-control"  style={{fontSize:'0.8rem'}}> {textPetInherit} </p>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card className="text-center">
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_inherit_create_ticket} variant="primary" style={{backgroundColor: 'red' ,fontSize:'0.8rem'}}> Inherit Pet Ticket </Button>
                                                <input type="text" className="form-control input-sm" id="pet-inh-cr-ticket-input-parent-name" placeholder='parent' style={{fontSize:'0.8rem'}}/>
                                                <input type="text" className="form-control input-sm" id="pet-inh-cr-ticket-input-child-name" placeholder='child' style={{fontSize:'0.8rem'}} />
                                                <input type="text" className="form-control input-sm" id="pet-inh-cr-ticket-val" placeholder='Gwei' style={{fontSize:'0.8rem'}} />
                                            </div>
                                            <input type="text" className="form-control" id="pet-inh-cr-ticket-input-to" placeholder='Pet owner' style={{fontSize:'0.8rem'}}></input>
                                            <p className="form-control"  style={{fontSize:'0.8rem'}}> {textPetInheritCrTicket} </p>
                                        </div>
                                    </Card.Body>
                                </Card>


                                <Card className="text-center">
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_is_pet_valid} variant="primary" style={{fontSize:'0.8rem'}}>Check Pet </Button>
                                                <input type="text" className="form-control input-sm" id="check-pet-name-input" name="title" placeholder='Pet name' style={{fontSize:'0.8rem'}}/>
                                            </div>
                                            <div className="input-group">
                                                <p className="form-control input-sm" id="pet-name-input" style={{fontSize:'0.8rem'}}>{textPet1}</p>
                                                <p className="form-control input-sm" id="pet-name-input" style={{fontSize:'0.8rem'}}>{textPet2}</p>
                                                <p className="form-control input-sm" id="pet-name-input" style={{fontSize:'0.8rem'}}>{textPet3}</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card className="text-center">
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_get_genes} variant="primary" style={{fontSize:'0.8rem'}}> Get genes Pet </Button>
                                                <input type="text" className="form-control input-sm" id="gen-pet-name-input" name="title" placeholder='Pet name' style={{fontSize:'0.8rem'}}/>
                                            </div>
                                            <p className="form-control"  style={{fontSize:'0.8rem'}}> {textPetGenes} </p>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card className="text-center">
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_get_tickets} variant="primary" style={{fontSize:'0.8rem'}}> Get tickets </Button>
                                           </div>
                                            <p className="form-control"  style={{fontSize:'0.8rem'}}> {textMyTickets} </p>
                                        </div>
                                    </Card.Body>
                                </Card>


                                <Card className="text-center">
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_accept_ticket} variant="primary" style={{backgroundColor: 'orange' ,fontSize:'0.8rem'}}> accept ticket </Button>
                                                <input type="text" className="form-control input-sm" id="pet-input-accept_ticket" name="title" placeholder='index' style={{fontSize:'0.8rem'}}/>
                                            </div>
                                            <p className="form-control"  style={{fontSize:'0.8rem'}}> {textAccept_ticket} </p>
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card className="text-center">
                                    <Card.Body>
                                        <div className=" p-0">
                                            <div className="input-group">
                                                <Button onClick={btn_reject_ticket} variant="primary" style={{backgroundColor: 'orange' ,fontSize:'0.8rem'}}> reject ticket </Button>
                                                <input type="text" className="form-control input-sm" id="pet-input-reject_ticket" name="title" placeholder='index' style={{fontSize:'0.8rem'}}/>
                                            </div>
                                            <p className="form-control"  style={{fontSize:'0.8rem'}}> {textReject_ticket} </p>
                                        </div>
                                    </Card.Body>
                                </Card>




                                <Card className="text-center">
                                    <Card.Body>
                                        <Button onClick={btn_sign} variant="primary" style={{fontSize:'0.8rem'}}>btn_sign</Button>
                                        <Button onClick={btn_send_eth} variant="primary"
                                                style={{backgroundColor: 'red' ,fontSize:'0.8rem'}} > Send
                                            ETH </Button>
                                    </Card.Body>
                                </Card>

                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 hero-img aos-init aos-animate" data-aos="fade-left">
                            <img src={imgUrl} alt="Video" height="500"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;