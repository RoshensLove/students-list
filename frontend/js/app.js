const SERVER_URL = "http://localhost:3000";

 async function serverAddStudent(obj) {
    let response = await fetch(SERVER_URL + "/api/students", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
    });

    let data = await response.json()
    return data

 }

 async function serverGetStudent() {
    let response = await fetch(SERVER_URL + "/api/students", {
        method:"Get",
        headers: { "Content-Type": "application/json" },
    });

    let data = await response.json()
    return data

 }

 async function serverDeleteStudent(id) {
    let response = await fetch(SERVER_URL + "/api/students/" + id, {
        method:"DELETE",
    });

    let data = await response.json()
    return data

 }

let serverData = await serverGetStudent()
// let listStudents = [
//     {
//         name: "Олег",
//         surname: "Островский",
//         middleName: "Русланович",
//         birthday: new Date(2001, 1, 21),
//         fuculty: "ФИСЕ",
//         studyStart: 2019,
//     },
//     {
//         name: "Петр",
//         surname: "Петриченко",
//         middleName: "Олегович",
//         birthday: new Date(2005, 6, 18),
//         fuculty: "Экономика",
//         studyStart: 2021,
//     },
//     {
//         name: "Ольга",
//         surname: "Бурундукова",
//         middleName: "Александрова",
//         birthday: new Date(2008, 6, 3),
//         fuculty: "Информатика",
//         studyStart: 2010,
//     }
// ]

/////////////////////////////////

let listStudents = [];

if(serverData) {
    listStudents = serverData
}

function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    
    let yy = date.getYear();
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

/////////////////////////////////


function $getNewStudentTR(studObj) {
    const $tr = document.createElement("tr");
    const $tdFIO = document.createElement("td");
    const $tdBirthday = document.createElement("td");
    const $tdfaculty = document.createElement("td");
    const $tdstudyStart = document.createElement("td");
    const $tdDelete = document.createElement("td");
    const $btnDelete = document.createElement("button");


    $btnDelete.classList.add("btn", "btn-danger", "w-100");
    $btnDelete.textContent = "Delete"

    $tdFIO.textContent = `${studObj.surname} ${studObj.name} ${studObj.middleName}`
    $tdBirthday.textContent = formatDate(new Date(studObj.birthday))
    $tdfaculty.textContent = studObj.faculty
    $tdstudyStart.textContent = studObj.studyStart

    $btnDelete.addEventListener("click",async function() {
        await serverDeleteStudent(studObj.id);
        $tr.remove()
    })

    $tdDelete.append($btnDelete)
    $tr.append($tdFIO, $tdBirthday, $tdfaculty, $tdstudyStart, $tdDelete);
    return $tr
}
  


function render(arr){
    let copyArr= [...arr];

    const $studTable = document.getElementById("stud-table");

    $studTable.innerHTML = ""
    for (const studObj of copyArr) {
        const $newTr = $getNewStudentTR(studObj);
        $studTable.append($newTr);
    }
}

render(listStudents)

//Add students

const addStudents = document.getElementById("add-form").addEventListener("submit", async function(event) {
    event.preventDefault()

    let newStudentObj = {
        name: document.getElementById("name-inp").value,
        surname: document.getElementById("surname-inp").value,
        lastname: document.getElementById("middleName-inp").value,
        birthday: new Date(document.getElementById("birthday-inp").value),
        faculty: document.getElementById("faculty-inp").value,
        studyStart: document.getElementById("studyStart-inp").value,
    }

    let serverDataObj = await serverAddStudent(newStudentObj)

    serverDataObj.birthday = new Date(serverDataObj.birthday)

    listStudents.push(newStudentObj);

    console.log(listStudents)
    render(listStudents)
})