const detailContainer = document.querySelector(".detail-container");

function createBorderCountry(detail) {
  let borderCountries = "";
  if (detail.borders) {
    detail.borders.forEach((country) => {
      borderCountries += `<div class='country'>${country}</div>`;
    });
  } else {
    console.log("no borders");
  }
  return `
    <div class='border-country-section'>
        <div class='section-container'>
            <h3 class='section-header'>Border countries:</h3>
            <div class='border-country-box-container'>
                ${borderCountries}
            </div>
        </div>
    </div>`;
}

function createDescriptionCol2(detail) {
  let col2Text = `
    <p class='info-section  total-level-domain'>Total Level Domain: <span class='info'>${detail.topLevelDomain}</span></p>
    <p class='info-section  currencies'>Currencies: <span class='info'>${detail.currencies}</span></p>
    <p class='info-section  languages'>Languages:`;
  detail.languages.forEach((lang) => {
    col2Text += ` <span class='info'>${lang}</span>`;
  });
  return col2Text + "</p>";
}

function createDescriptionCol1(detail) {
  return `
        <p class='info-section native-name'>Native Name: <span class='info'>${detail.nativeName}</span></p>
        <p class='info-section  population'>Population: <span class='info'>${detail.population}</span></p>
        <p class='info-section  region'>Region: <span class='info'>${detail.region}</span></p>
        <p class='info-section  sup-region'>Sup Region: <span class='info'>${detail.subregion}</span></p>
        <p class='info-section  capital'>Capital: <span class='info'>${detail.capital}</span></p>`;
}

function createDescription(detail) {
  return `
        <div class='description-section'>
            <div class='country-name-section'>
                <h1 class='country-name'>${detail.name}</h1>
            </div>
            <div class='more-description-section'>
                <div class='col'>
                    ${createDescriptionCol1(detail)}
                </div>
                <div class='col'>
                    ${createDescriptionCol2(detail)}
                </div>
            </div>
            ${createBorderCountry(detail)}
        </div>
    `;
}

function createDetailFlag(detail) {
  return `
        <div class='flag-section'>
            <div class='flag'>
                <img src='${detail.flagUrl}' alt='flag' class='flag-img'>
            </div>
        </div>`;
}

function createElementDetail(detail) {
  let elementDetailText = createDetailFlag(detail) + createDescription(detail);
  return elementDetailText;
}

function getDetailForCountry(country) {
  // adding languages array
  const newCountryLanguages = [];
  if (country.languages) {
    country.languages.forEach((lang) => {
      newCountryLanguages.push(lang.name);
    });
  } else {
    console.log("no languages");
  }
  const detail = {
    flagUrl: country.flag,
    nativeName: country.nativeName,
    name: country.name,
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    capital: country.capital,
    topLevelDomain: country.topLevelDomain[0],
    currencies: country.currencies[0].code,
    languages: newCountryLanguages,
    borders: country.borders,
  };
  return detail;
}

function createDetailBox(elementHTMLText) {
  // removing old elements
  detailContainer.innerHTML = "";
  // adding elements to the page
  detailContainer.insertAdjacentHTML("afterbegin", elementHTMLText);
}

async function getCountyInfo(index) {
  try {
    const url = `https://restcountries.com/v2/all`;
    const response = await fetch(url);
    const data = await response.json();
    countryData = data[index];
    const detail = getDetailForCountry(countryData);
    const element = createElementDetail(detail);
    createDetailBox(element);
    console.log(element);
  } catch (error) {
    console.log(error);
  }
}

getCountyInfo(localStorage.getItem("countryIndex"));
