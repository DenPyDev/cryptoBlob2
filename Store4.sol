const { expect } = require("chai")
const { ethers} = require("hardhat");


describe("cryptoBlob4", function () {
  let acc1 //global
  let acc2 //global
  let ct //global

  beforeEach(async function() {
   

    [acc1, acc2] = await ethers.getSigners(); //get wallets
    const Payments = await ethers.getContractFactory("cryptoBlob4", acc1); //compile contract from acc1
    ct = await Payments.deploy() ;  //deploy contract (sent tx)
    await ct.deployed(); //deploy contract (wait tx to compile)
    //console.log("payments.address", ct.address);

  })
  



  it("seed should be increased", async function() {
    const val_seed = await ct.SEED();
    await ct.updateSeed(5);
    const val_new_seed = await ct.SEED();
    expect(Number(val_seed)+5).to.eq(Number(val_new_seed));
  })



  it("rnd should be in range, and random", async function() {
    const allEqual = arr => arr.every(val => val === arr[0]);
    const rndArr = [];
    for(var i = 0; i < 10; i++){
      const val_rnd = await ct.randInt(5000,5050,i);
      expect(val_rnd).to.be.gte(5000);
      expect(val_rnd).to.be.lte(5050);
      rndArr.push(val_rnd);
   }
   //console.log("rndArr", rndArr);
   expect(allEqual(rndArr)).to.eq(false);
  })



  it("should be possible to validate the string", async function() {
    await ct.readStr("qwertyuiqwertyuiqwertyuiqwertyui");
    await expect(ct.readStr("qwertyuiqwertyuiqwertyuiqwertyui_")).to.be.revertedWith("string must be <= 32b");
  })


  it("seed should be increased", async function() {
    const Genes = await ct.generateGenes(5);
    expect(Genes.length).to.eq(5);
  })



  it("should be generate random array", async function() {
    const genes = await ct.generateGenes(5);
    const newGenes = await ct.deviateGenes(genes);
    expect(genes.length).to.eq(5);
    expect(newGenes.length).to.eq(5);
    expect(genes).to.not.eq(newGenes);

  })
  

  it("should be check is acc ownes a pet", async function() {
    const petName =  await ct.readStr("qwerty");
    await ct.setOwnerPet(acc1.address, petName);

    const ex = await ct.containsOwnerPet(acc1.address, petName);
    const not_ex = await ct.containsOwnerPet(acc2.address, petName);

    expect(ex).to.eq(true);
    expect(not_ex).to.eq(false);
  })




  it("should be possible to set genes to pet", async function() {
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const petName =  await ct.readStr("qwerty");
    await ct.setPetGenes(petName, [1,2,3]);

    const origGenes = [ethers.BigNumber.from(1),ethers.BigNumber.from(2),ethers.BigNumber.from(3)]
    const genes = await ct.getPetGenes(petName);
    expect(equals(origGenes, genes)).to.eq(true);
  })


  it("should be possible to check pet existance", async function() {
    const petName =  await ct.readStr("qwerty");
    await ct.setPetGenes(petName, [1,2,3]);

    expect(await ct.PUBcheckPetNameExists("qwerty")).to.eq(true);
    expect(await ct.PUBcheckPetNameExists("qqwwee")).to.eq(false);
  })






  it("should be possible to check pes ownership", async function() {
    const petName =  await ct.readStr("qwerty");
    await ct.connect(acc1).setOwnerPet(acc1.address, petName);
    expect(await ct.connect(acc1).PUBcheckAmIPetOwner("qwerty")).to.eq(true)
    expect(await ct.connect(acc2).PUBcheckAmIPetOwner("qwerty")).to.eq(false)
  })


  it("should possible to create new pet", async function() {

    await ct.connect(acc1).PUBarise("qwerty");
    expect(await ct.PUBcheckPetNameExists("qwerty")).to.eq(true);
    expect(await ct.connect(acc1).PUBcheckAmIPetOwner("qwerty")).to.eq(true)

    const genes = await ct.PUBgetPetGenesStr("qwerty");
    expect(genes.length).to.gte(1);

    expect(await ct.connect(acc2).PUBcheckAmIPetOwner("qwerty")).to.eq(false)
  })




  it("should be possible to inherit from your pet", async function() {

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    await ct.connect(acc1).PUBarise("qwerty");
    await ct.PUBinherit(acc2.address,"qwerty", "qqwwee")

    const parent_genes = await ct.PUBgetPetGenesStr("qwerty");
    const child_genes = await ct.PUBgetPetGenesStr("qqwwee");

    expect(equals(parent_genes, child_genes)).to.eq(false);
    expect(parent_genes.length).to.eq(child_genes.length);
  })

  it("should be impossible to inherit from not your pet", async function() {
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    await ct.connect(acc1).PUBarise("qwerty");
    await expect(ct.connect(acc2).PUBinherit(acc2.address,"qwerty", "qqwwee")).to.be.revertedWith("error,you are not the parent owner");
  })

  
  it("should be impossible to sreate inherit and accept ticket and eth", async function() {
   
    await ct.connect(acc1).PUBarise("qwerty");
    
    let acc1_balance = await ethers.provider.getBalance(acc1.address);
    let acc2_balance = await ethers.provider.getBalance(acc2.address);
    let contr_balance = await ethers.provider.getBalance(ct.address)

    const options = {value: ethers.utils.parseUnits("1")}
    await ct.connect(acc2).PUBInheritCreateTicket(acc1.address, "qwerty",  "qwerty-child", options);

    let acc1_balance2 = await ethers.provider.getBalance(acc1.address);
    let  acc2_balance2 = await ethers.provider.getBalance(acc2.address);
    let contr_balance2 = await ethers.provider.getBalance(ct.address)

    let one_eth_left_acc2 = (10**18 <= (acc2_balance - acc2_balance2)<1.1*10**18)
    expect(one_eth_left_acc2 == true);

    let one_eth_arrived_to_ct = (10**18 == (contr_balance2 - contr_balance))
    expect(one_eth_arrived_to_ct == true);
    
    await ct.connect(acc1).PUBacceptMyTicket(0)

    let acc1_balance3 = await ethers.provider.getBalance(acc1.address);
    let acc2_balance3 = await ethers.provider.getBalance(acc2.address);
    let contr_balance3 = await ethers.provider.getBalance(ct.address)

    expect(contr_balance3 == 0);  //eth left contract's account
    let diff3 = (0.9*10**18 <= (acc1_balance3 - acc1_balance )<=10**18)
    expect(diff3 == true); //eth arrived to owner's account
  })



  it("should be impossible to sreate inherit and reject ticket and eth", async function() {
   
    await ct.connect(acc1).PUBarise("qwerty");
    

    let acc1_balance = await ethers.provider.getBalance(acc1.address);
    let acc2_balance = await ethers.provider.getBalance(acc2.address);
    let contr_balance = await ethers.provider.getBalance(ct.address)

    const options = {value: ethers.utils.parseUnits("1")}
    await ct.connect(acc2).PUBInheritCreateTicket(acc1.address, "qwerty",  "qwerty-child", options);

    //let acc1_balance2 = await ethers.provider.getBalance(acc1.address);
    let  acc2_balance2 = await ethers.provider.getBalance(acc2.address);
    let contr_balance2 = await ethers.provider.getBalance(ct.address)

    let one_eth_left_acc2 = (10**18 <= (acc2_balance - acc2_balance2)<1.1*10**18)
    expect(one_eth_left_acc2 == true);

    let one_eth_arrived_to_ct = (10**18 == (contr_balance2 - contr_balance));
    expect(one_eth_arrived_to_ct == true);
    
    await ct.connect(acc1).PUBrejectMyTicket(0)

    //let acc1_balance3 = await ethers.provider.getBalance(acc1.address);
    let acc2_balance3 = await ethers.provider.getBalance(acc2.address);
    let contr_balance3 = await ethers.provider.getBalance(ct.address)

    expect(contr_balance3 == 0);  //eth left contract's account
    let diff3 = ((acc2_balance3 - acc2_balance )<=0.1*10**18)
    expect(diff3 == true); //eth arrived to sender's account
  })

})

 
