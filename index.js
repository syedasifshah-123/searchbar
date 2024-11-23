let country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

const searchField = document.querySelector("[data-input-field]");
const searchBar = document.querySelector("[data-search-bar]");
let currentIndex = -1;

searchField.addEventListener("input", function () {
    let searchVal = searchField.value.toLowerCase();

    if (searchVal === "") {
        searchBar.classList.remove("active");
        searchBar.innerHTML = ""; 
    } else {
        searchBar.classList.add("active");
        updateSearchList(searchVal);
    }
});

function updateSearchList(searchVal) {

    searchBar.innerHTML = "";
    let filteredCountries = country_list.filter(country => country.toLowerCase().startsWith(searchVal));

    if (filteredCountries.length === 0) {
        searchBar.innerHTML = `<div class="no-result">No results found</div>`;
    } else {

        filteredCountries.forEach((country) => {
            let div = document.createElement("div");
            div.className = "search-list";
            div.textContent = country;
            searchBar.appendChild(div);

            div.addEventListener("click", function () {
                searchField.value = div.innerText;
                searchBar.classList.remove("active");
            });

        });

    }

    currentIndex = -1; 
}

searchField.addEventListener("keydown", function (e) {
    const items = searchBar.querySelectorAll(".search-list");

    if (e.key == "Enter" && searchField.value.trim() !== "") {
        const url = `https://www.google.com/search?q=${searchField.value}`;
        window.open(url, 'blank');
    }

    if (items.length > 0) {
        if (e.key === "ArrowDown") {
            
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateActiveItem(items);
            }

        } else if (e.key === "ArrowUp") {
           
            if (currentIndex > 0) {
                currentIndex--;
                updateActiveItem(items);
            }

        } else if (e.key === "Enter" && currentIndex >= 0) {
            searchField.value = items[currentIndex].textContent;
            searchBar.innerHTML = ""; 
            searchBar.classList.remove("active");
        }
    }
});

function updateActiveItem(items) {
    
    items.forEach(item => item.classList.remove("active"));
    
    if (currentIndex >= 0 && currentIndex < items.length) {
        items[currentIndex].classList.add("active");
        items[currentIndex].scrollIntoView({ block: "nearest" });
    }

}







