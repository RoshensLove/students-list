const SERVER_URL = "http://localhost:3000";

 async function serverAddStudent() {
    let respons = await fetch("http://localhost:3000")
 }

// let listStudents = [
//     {
//         name: "Олег",
//         lastname: "Островский",
//         middleName: "Русланович",
//         birthday: new Date(2001, 1, 21),
//         fuculty: "ФИСЕ",
//         start: 2019,
//     },
//     {
//         name: "Петр",
//         lastname: "Петриченко",
//         middleName: "Олегович",
//         birthday: new Date(2005, 6, 18),
//         fuculty: "Экономика",
//         start: 2021,
//     },
//     {
//         name: "Ольга",
//         lastname: "Бурундукова",
//         middleName: "Александрова",
//         birthday: new Date(2008, 6, 3),
//         fuculty: "Информатика",
//         start: 2010,
//     }
// ]

/////////////////////////////////

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

/////////////////////////////////


function $getNewStudentTR(studObj) {
    const $tr = document.createElement("tr");
    const $tdFIO = document.createElement("td");
    const $tdBirthday = document.createElement("td");
    const $tdFaculty = document.createElement("td");
    const $tdStart = document.createElement("td");

    $tdFIO.textContent = `${studObj.lastname} ${studObj.name} ${studObj.middleName}`
    $tdBirthday.textContent = formatDate(studObj.birthday)
    $tdFaculty.textContent = studObj.fuculty
    $tdStart.textContent = studObj.start

    $tr.append($tdFIO, $tdBirthday, $tdFaculty, $tdStart);
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

const addStudents = document.getElementById("add-form").addEventListener("submit", event => {
    event.preventDefault()

    let newStudentObj = {
        name: document.getElementById("name-inp").value,
        lastname: document.getElementById("surname-inp").value,
        middleName: document.getElementById("middleName-inp").value,
        birthday: new Date(document.getElementById("birthday-inp").value),
        fuculty: document.getElementById("faculty-inp").value,
        start: document.getElementById("start-inp").value,
    }

    listStudents.push(newStudentObj);
    render(listStudents)
})