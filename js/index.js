const searchForm = document.querySelector(".search");
const regionForm = document.querySelector(".filter-by-region-input");
const boxContainer = document.querySelector(".box-container");
let ApiData;
let countryData = "";
const countyArray = [];
const shownCountryNumber = 8;

//  addEventListener for each link
function AddEventForLink() {
  //  addEventListener for each link
  document.querySelectorAll(".link").forEach((item) => {
    item.addEventListener("click", () => {
      const linkIndex = item.dataset.id;
      localStorage.setItem("countryIndex", linkIndex);
      window.open("../detail.html");
    });
  });
}

function createBox(elementHTMLText) {
  // removing old elements
  boxContainer.innerHTML = "";
  // adding elements to the page
  boxContainer.insertAdjacentHTML("afterbegin", elementHTMLText);
  //  addEventListener for each link
  AddEventForLink();
}

function createElement(elementArray) {
  let elementText = "";
  elementArray.forEach((element) => {
    elementText += `
            <div class='box'>
                <a class='link' data-id=${element.id}>
                    <div class='flag-container' style='background-image:url(${element.flagUrl});'>

                    </div>
                    <div class='Country-description'>
                        <div class='Title'>
                            <h1 class='country-name'>${element.name}</h1>
                        </div>
                        <div class='description-list'>
                            <p class='population description'>Population:<span class='value'>${element.population}</span></p>
                            <p class='region description'>Region:<span class='value'>${element.region}</span></p>
                            <p class='capital description'>Capital:<span class='value'>${element.capital}</span></p>
                        </div>
                    </div>
                </a>
            </div>
        `;
  });
  return elementText;
}

function showCountries(searchResult) {
  if (searchResult.length > shownCountryNumber) {
    const newCountryArray = searchResult.slice(0, shownCountryNumber);
    return newCountryArray;
  } else {
    return searchResult;
  }
}

function getRandomCountries() {
  // create random country array
  const countryNumber = countyArray.length;
  const randomCountryArray = [];
  for (let i = 0; i < shownCountryNumber; i++) {
    let startFrom = Math.floor(countryNumber / shownCountryNumber) * i;
    let endOn = Math.floor(countryNumber / shownCountryNumber) * (i + 1);
    const randomNumber =
      Math.floor(Math.random() * (endOn - startFrom)) + startFrom;
    randomCountryArray.push(countyArray[randomNumber]);
  }
  return randomCountryArray;
}

function findCountryByName(nameToFind) {
  const searchResult = countyArray.filter((country) =>
    country.name.includes(nameToFind)
  );
  return showCountries(searchResult);
}

function findCountryByRegion(region) {
  const searchResult = countyArray.filter((country) =>
    country.region.includes(region)
  );
  return showCountries(searchResult);
}

async function getCountyInfo() {
  try {
    const url = "https://restcountries.com/v2/all";
    const response = await fetch(url);
    ApiData = await response.json();
    let counter = 0;
    ApiData.forEach((country) => {
      const newCountry = {
        id: counter,
        flagUrl: country.flag,
        name: country.name,
        population: country.population,
        region: country.region,
        capital: country.capital,
      };
      countyArray.push(newCountry);
      counter++;
    });
    createBox(createElement(getRandomCountries()));
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("change", (event) => {
  createBox(createElement(findCountryByName(event.target.value)));
  event.target.value = "";
});

regionForm.addEventListener("change", (event) => {
  createBox(createElement(findCountryByRegion(event.target.value)));
});

// on load
getCountyInfo();
