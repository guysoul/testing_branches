const staffContainer = document.querySelector(".staff-container");
const newStaffTxt = document.querySelector("#new-staff-txt");
const addBtn = document.getElementById("add-btn");

let hogwartsStaff; //global variable

//Read
async function fetchStaff() {
  const hogwartsStaffRequest = await fetch(
    "https://hp-api.onrender.com/api/characters/staff"
  );

  let result = await hogwartsStaffRequest.json(); //return array

  return result;
}

//onsole.log(fetchStaff());

async function fetchAndShowStaff() {
  try {
    hogwartsStaff = await fetchStaff();
    //console.log("Inne i fetchAndShowStaff", hogwartsStaff);
    showAllStaff();
  } catch {
    console.error("Oops, klarte ikke laste ned Hogwarts", error);
  }
}

fetchAndShowStaff();

//Read for å vise frem alle ansatte
function showAllStaff() {
  staffContainer.innerHTML = "";
  hogwartsStaff.forEach((staffMember, index) => {
    const staffCard = document.createElement("div");

    //Slett-Delete
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Slett ansatt";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.addEventListener("click", function () {
      deleteStaffMember(index);
    });

    //Rediger-Edit
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Skriv inn navn på ansatt...";
    nameInput.id = `nameInput-${index}`;

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Redigere ansatt";
    editBtn.addEventListener("click", function () {
      editStaffMember(index);
    });

    staffCard.innerHTML = `<img src="${staffMember.image}" style="width: 100px"/> <h3>${staffMember.name}</h3>`;
    console.log(staffMember.name);
    staffCard.append(deleteBtn, nameInput, editBtn);
    staffContainer.append(staffCard);
  });
}

function deleteStaffMember(index) {
  //console.log("Inne i slettfunksjonen");
  hogwartsStaff.splice(index, 1);
  //console.log("etter sletting", hogwartsStaff);
  showAllStaff();
}

//Create
function addStaffMember() {
  hogwartsStaff.unshift({
    name: newStaffTxt.value,
  });
  showAllStaff();
}

addBtn.onclick = addStaffMember;

//Edit
function editStaffMember(index) {
  const newstaffName = document.getElementById(`nameInput-${index}`).value;

  hogwartsStaff[index].name = newstaffName;

  showAllStaff();
}
