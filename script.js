var allAthletes = [] || JSON.parse(localStorage.getItem('allAthletes'));

function register() {
    var athleteInput = document.getElementById("athlete");
    var genderInput = document.getElementById("gender");
    var sportInput = document.getElementById("sport");
    var countryInput = document.getElementById("country");
    var error = document.getElementById("error");
    var showResult = document.getElementById("showResult");

    var athlete = athleteInput.value;
    var gender = genderInput.value;
    var sport = sportInput.value;
    var country = countryInput.value;

    if (athlete === '' || gender === '' || sport === '' || country === '') {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
        
        athleteInput.value = '';
        genderInput.value = '';
        sportInput.value = '';
        countryInput.value = '';
        
        var person = {
            athlete,
            gender,
            sport,
            country
        };
        
        allAthletes.push(person);
        saveToLocalStorage();
        displayResult();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('allAthletes', JSON.stringify(allAthletes));
}


localStorage.getItem('allAthletes')
console.log('allAthletes');
function displayResult() {
    var showResult = document.getElementById("showResult");
    showResult.innerHTML = `
        <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Sport</th>
            <th>Country</th>
            <th>Actions</th>
        </tr>
    `;

    for (var i = 0; i < allAthletes.length; i++) {
        showResult.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${allAthletes[i].athlete}</td>
                <td>${allAthletes[i].gender}</td>
                <td>${allAthletes[i].sport}</td>
                <td>${allAthletes[i].country}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteItems(${i})">Delete</button>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editModal(${i})">Edit</button>
                </td>
            </tr>
        `;
    }
}

function deleteItems(index) {
    var confamu = confirm('Are you sure you want to delete');
    if (confamu == true) {
        allAthletes.splice(index, 1);
        saveToLocalStorage();
        displayResult();
    }
}

function editModal(index) {
    var editAthleteInput = document.getElementById("editAthlete");
    var editGenderInput = document.getElementById("editGender");
    var editSportInput = document.getElementById("editSport");
    var editCountryInput = document.getElementById("editCountry");

    editAthleteInput.value = '';
    editGenderInput.value = '';
    editSportInput.value = '';
    editCountryInput.value = '';

    
    editModal.index = index;
}

function saveChanges() {
    var index = editModal.index;
    var editedAthlete = document.getElementById("editAthlete").value;
    var editedGender = document.getElementById("editGender").value;
    var editedSport = document.getElementById("editSport").value;
    var editedCountry = document.getElementById("editCountry").value;
     
    allAthletes[index].athlete = editedAthlete;
    allAthletes[index].gender = editedGender;
    allAthletes[index].sport = editedSport;
    allAthletes[index].country = editedCountry;

    saveToLocalStorage();
    displayResult();
}

document.getElementById("saveChangesBtn").addEventListener("click", saveChanges);

 
displayResult();
  
