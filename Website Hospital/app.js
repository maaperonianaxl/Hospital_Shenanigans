const content = document.getElementById("content");

// patients.js
function loadPatients() {
    content.innerHTML = `
        <h2>Patients List</h2>
        <ul>
            <li>John Doe</li>
            <li>Jane Smith</li>
        </ul>
    `;
}

// doctors.js
function loadDoctors() {
    content.innerHTML = `
        <h2>Doctors List</h2>
        <ul>
            <li>Dr. Cruz</li>
            <li>Dr. Santos</li>
        </ul>
    `;
}

// wards.js
function loadWards() {
    content.innerHTML = `
        <h2>Wards</h2>
        <p>Ward A, Ward B, Ward C</p>
    `;
}

// beds.js
function loadBeds() {
    content.innerHTML = `
        <h2>Beds</h2>
        <p>Available beds: 25</p>
    `;
}

// patientDoctor.js
function loadPatientDoctor() {
    content.innerHTML = `
        <h2>Patient - Doctor Assignment</h2>
        <p>John Doe → Dr. Cruz</p>
    `;
}

// loadWardBeds.js
function loadWardBeds() {
    content.innerHTML = `
        <h2>Ward Beds</h2>
        <p>Ward A → 10 beds</p>
    `;
}


document.getElementById("patientForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;

    content.innerHTML = `
        <h2>Patient Admitted</h2>
        <p>${firstName} ${lastName} has been successfully admitted.</p>
    `;

    this.reset();
});