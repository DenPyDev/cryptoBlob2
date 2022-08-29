// SPDX-License-Identifier: MIT
pragma solidity 0.8.16 ;

contract cryptoBlob4 {

    mapping(address => mapping(bytes32 => bool)) public OWNER_PET_MAP;
    mapping(address => bytes32[]) public OWNER_PET_LIST;
    address[] public OWNERS_LIST;

    mapping(bytes32 => uint256[]) public PET_GENES_MAP;

    struct Claim {
        address sender;
        uint256 value;
        bytes32 petName;
        bytes32 newPetName;
        uint256 timestamp;}

    mapping(address => Claim[]) public INHERIT_TICKETS;

    uint256 public SEED;

    constructor(){
        SEED = 1 + block.timestamp % 100;
    }

    function updateSeed(uint256 n) public {
    unchecked{SEED = SEED + n;}
    }

    function randInt(uint256 from, uint256 to, uint256 seed) public view returns (uint256) {
        uint256 rnd = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, seed))) % 100;
        return from + (rnd * (to - from) / 100);
    }

    function readStr(string calldata text) public pure returns (bytes32){
        bytes calldata bText = bytes(text);
        require(bText.length <= 32, "string must be <= 32b");
        return bytes32(bText);
    }

    function generateGenes(uint8 lenght) public view returns (uint256[] memory){
        uint256[] memory genes = new uint256[](lenght);
        uint256 i = 0;
        while (i < lenght) {
            genes[i] = randInt(50, 150, i + 1 + SEED);
            i++;
        }
        return genes;
    }

    function deviateGenes(uint256[] memory genes) public view returns (uint256[] memory){
        uint256[] memory tempGenes = genes;
        uint256 i = 0;
        uint256 newVal;
        while (i < tempGenes.length) {
            newVal = uint256(tempGenes[i] + uint256(randInt(0, 40, i + 1 + SEED)));
            if (newVal > 20) {newVal -= 20;}
            if (newVal > 200) {newVal -= 20;}
            tempGenes[i] = newVal;
            i++;
        }
        return tempGenes;
    }

    function setOwnerPet(address wallet, bytes32 petName) public {
        OWNER_PET_MAP[wallet][petName] = true;
        OWNER_PET_LIST[wallet].push(petName);
        if (OWNER_PET_LIST[wallet].length < 2)
        {OWNERS_LIST.push(wallet);}
    }

    function PUBgetOwnerPetList(address wallet) public view returns (string[] memory) {
        uint256 lenght = OWNER_PET_LIST[wallet].length;

        string[] memory output = new string[](lenght);
        for (uint256 i = 0; i < OWNER_PET_LIST[wallet].length; i++)
        {
            output[i] = (string(abi.encodePacked(OWNER_PET_LIST[wallet][i])));
        }
        return output;
    }

    function containsOwnerPet(address wallet, bytes32 petName) public view returns (bool){
        return OWNER_PET_MAP[wallet][petName];
    }

    function setPetGenes(bytes32 petName, uint256[] memory genes) public {
        PET_GENES_MAP[petName] = genes;
    }

    function getPetGenes(bytes32 petName) public view returns (uint256[] memory){
        return PET_GENES_MAP[petName];
    }

    function inherit(address wallet_to, bytes32 petName, bytes32 newPetName) public {
        require(getPetGenes(petName).length >= 1, "error, parent name not exist");
        require(getPetGenes(newPetName).length == 0, "error, child name already exist");
        require(containsOwnerPet(msg.sender, petName) == true, "error,you are not the parent owner");

        uint256[] memory petGenes = getPetGenes(petName);
        updateSeed(petGenes.length);

        uint256[] memory childGenes = deviateGenes(petGenes);
        setPetGenes(newPetName, childGenes);
        setOwnerPet(wallet_to, newPetName);
    }

    function arise(bytes32 petName) public {
        require(getPetGenes(petName).length == 0, "error, name already exist");
        uint256[] memory genes = generateGenes(20);
        updateSeed(genes.length);
        setPetGenes(petName, genes);
        setOwnerPet(msg.sender, petName);
    }

    function PUBcheckPetNameExists(string calldata sPetName) public view returns (bool) {
        bytes32 petName = readStr(sPetName);
        return getPetGenes(petName).length > 0;
    }

    function PUBcheckAmIPetOwner(string calldata sPetName) public view returns (bool) {
        bytes32 petName = readStr(sPetName);
        return containsOwnerPet(msg.sender, petName);
    }

    function PUBgetPetGenesStr(string calldata sPetName) public view returns (uint256[] memory){
        return PET_GENES_MAP[readStr(sPetName)];
    }

    function PUBarise(string calldata sPetName) public {
        bytes32 petName = readStr(sPetName);
        arise(petName);
    }

    function PUBinherit(address wallet_to, string calldata sPetName, string calldata sNewPetName) public {
        bytes32 petName = readStr(sPetName);
        bytes32 newPetName = readStr(sNewPetName);
        inherit(wallet_to, petName, newPetName);
    }

    function PUBInheritCreateTicket(address petOwner, string calldata sPetName, string calldata sNewPetName) public payable {
        bytes32 petName = readStr(sPetName);
        bytes32 newPetName = readStr(sNewPetName);
        INHERIT_TICKETS[petOwner].push(Claim(msg.sender, msg.value, petName, newPetName, block.timestamp));
    }

    function PUBcheckMyTickets() public view returns (Claim[] memory) {
        return INHERIT_TICKETS[msg.sender];
    }

    function PUBacceptMyTicket(uint256 ticket_index) public {
        require(ticket_index < INHERIT_TICKETS[msg.sender].length, "index out of range");
        Claim memory ticket = INHERIT_TICKETS[msg.sender][ticket_index];
        address payable addr = payable(msg.sender);
        if (ticket.sender != address(0))
        {
            inherit(ticket.sender, ticket.petName, ticket.newPetName);
            delete INHERIT_TICKETS[msg.sender][ticket_index];
            addr.transfer(ticket.value);
        }
    }

    function PUBrejectMyTicket(uint256 ticket_index) public {
        require(ticket_index < INHERIT_TICKETS[msg.sender].length, "index out of range");
        Claim memory ticket = INHERIT_TICKETS[msg.sender][ticket_index];
        address payable addr = payable(ticket.sender);
        if (ticket.sender != address(0))
        {
            delete INHERIT_TICKETS[msg.sender][ticket_index];
            addr.transfer(ticket.value);
        }
    }

    function PUBgetOwners() public view returns (address[] memory){
        return OWNERS_LIST;
    }
}

