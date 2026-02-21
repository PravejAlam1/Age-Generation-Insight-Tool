const dobInput = document.getElementById("dob");
const result = document.getElementById("result");
const error = document.getElementById("error");

// block future date
dobInput.max = new Date().toISOString().split("T")[0];

function getGeneration(year){
    if(year >= 1928 && year <= 1945) return "Silent Generation";
    if(year >= 1946 && year <= 1964) return "Baby Boomer";
    if(year >= 1965 && year <= 1980) return "Generation X (Gen X)";
    if(year >= 1981 && year <= 1996) return "Millennial (Gen Y)";
    if(year >= 1997 && year <= 2012) return "Generation Z (Gen Z)";
    if(year >= 2013) return "Generation Alpha";
    return "Unknown";
}

function calculateAge(){
    result.innerHTML = "";
    error.innerHTML = "";

    if(!dobInput.value){
        error.innerHTML = "Please select Date of Birth";
        return;
    }

    const dob = new Date(dobInput.value);
    const today = new Date();

    if(dob > today){
        error.innerHTML = "Future date not allowed";
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if(days < 0){
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if(months < 0){
        years--;
        months += 12;
    }

    const totalDays = Math.floor(
        (today - dob) / (1000 * 60 * 60 * 24)
    );

    let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if(nextBirthday < today){
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diff = nextBirthday - today;
    const bdDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const bdMonths = Math.floor(bdDays / 30);
    const bdRemainingDays = bdDays % 30;

    let category = "Adult";
    if(years < 13) category = "Child";
    else if(years < 20) category = "Teen";
    else if(years >= 60) category = "Senior Citizen";

    const generation = getGeneration(dob.getFullYear());

    result.innerHTML = `
        <p>You are <span>${years}</span> years 
        <span>${months}</span> months 
        <span>${days}</span> days old</p>

        <p>Total days lived: <span>${totalDays}</span></p>

        <p>Next birthday in 
        <span>${bdMonths}</span> months 
        <span>${bdRemainingDays}</span> days 🎂</p>

        <p>Age Category: <span>${category}</span></p>
        <p>Generation: <span>${generation}</span></p>
    `;
}

function resetAll(){
    dobInput.value = "";
    result.innerHTML = "";
    error.innerHTML = "";
}
