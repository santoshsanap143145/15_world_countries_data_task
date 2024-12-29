const cl = console.log;


const cardContainer = document.getElementById('cardContainer')

const searchInput = document.getElementById('searchInput')
const comment = document.getElementById('comment')

const btnName = document.getElementById('btnName')
const btnCap = document.getElementById('btnCap')
const btnPop = document.getElementById('btnPop')

const iconN = document.getElementById('iconN')
const iconc = document.getElementById('iconc')
const iconp = document.getElementById('iconp')

const chartData = document.getElementById('chartData')

const popBtn = document.getElementById('popBtn')
const langBtn = document.getElementById('langBtn')

const title = document.getElementById('title')

const cardTemplate = (array = countries) => {
result = "";
array.forEach(country => {
result += 
            `
            <div class="col-md-2">
                <div class="card countryCard">
                    <img
                    src="${country.flag}"
                    class="card-img-top flag"
                    alt="Logo"
                    title="Logo"
                    />
                    <div class="card-body">
                        <h5 class="card-title">${country.name}</h5>
                        <p class="card-text"><span>capital: </span>${country.capital}</p>
                        <p class="card-text"><span>language: </span>${country.languages}</p>
                        <p class="card-text"><span>population: </span>${country.population}</p>
                    </div>
                </div>
            </div>
            `
})
cardContainer.innerHTML = result;
}
cardTemplate()


const searchOnKeyUp = (eve) => {
    let searchWord = eve.target.value.toLowerCase()

    const filteredCounries = countries.filter(country => {

        return  country.name.toLowerCase().includes(searchWord) ||
                country.capital && country.capital.toLowerCase().includes(searchWord) ||
                country.languages.some(lang => lang.toLowerCase().includes(searchWord) )
    })
    cardTemplate(filteredCounries)

    comment.innerHTML = `${filteredCounries.length} of ${countries.length} countries found`
}

const onClickSortByNames = () => {
    iconN.classList.remove('d-none');
    iconc.classList.add('d-none');
    iconp.classList.add('d-none');
    if(iconN.classList.contains('fa-arrow-down')){
        iconN.classList.replace('fa-arrow-down', 'fa-arrow-up')
        countries.sort((a, b) => b.name.localeCompare(a.name))
    }else{
        iconN.classList.replace('fa-arrow-up', 'fa-arrow-down')
        countries.sort((a, b) => a.name.localeCompare(b.name))
    }
    cardTemplate()
}

const onClickSortByCapitals = () => {
    iconc.classList.remove('d-none');
    iconN.classList.add('d-none');
    iconp.classList.add('d-none');
    if(iconc.classList.contains('fa-arrow-up')){
        iconc.classList.replace('fa-arrow-up', 'fa-arrow-down')
        countries.sort((a, b) => (a.capital || 'Unknown').localeCompare((b.capital || 'Unknown')))
    }else{
        iconc.classList.replace('fa-arrow-down', 'fa-arrow-up')
        countries.sort((a, b) => (b.capital || 'Unknown').localeCompare((a.capital || 'Unknown')))
    }
    cardTemplate()
}


const onClickSortByPopulation = () => {
    iconp.classList.remove('d-none');
    iconN.classList.add('d-none');
    iconc.classList.add('d-none');
    if(iconp.classList.contains('fa-arrow-up')){
        iconp.classList.replace('fa-arrow-up', 'fa-arrow-down')
        countries.sort((a, b) => a.population - b.population)
    }else{
        iconp.classList.replace('fa-arrow-down', 'fa-arrow-up')
        countries.sort((a, b) => b.population - a.population)
    }
    cardTemplate()
}

const displayGraphTemplate = () => {
    const worldPopulation = countries.reduce((acc, cv) => acc + cv.population, 0)
    cl(worldPopulation)
    const top10Countries = countries.sort((a, b) => b.population - a.population).slice(0, 10)
cl(top10Countries)
    let result = 
                `       
                    <div class="row text-center">
                        <div class="col-sm-2 oflow">
                            <h5>world</h5>
                        </div>
                        <div class="col-sm-8">
                            <div class="bar">
                                <div class="percentage" style="width: 100%"></div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <h5>${worldPopulation}</h5>
                        </div>
                    </div>
                `
top10Countries.forEach(country => {
    result += 
                `       
                <div class="row text-center">
                    <div class="col-sm-2 oflow">
                        <h5>${country.name}</h5>
                    </div>
                    <div class="col-sm-8">
                        <div class="bar">
                            <div class="percentage" style="width: ${(country.population / worldPopulation) * 100}%"></div>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <h5>${country.population}</h5>
                    </div>
                </div>
                `
})
chartData.innerHTML = result;
title.innerHTML = `10 Most Populated Countries in the World`
}
displayGraphTemplate()

const onClickpopBtn = () => {
    displayGraphTemplate()
}

const onClicklangBtn = () => {
    const langCountArray = [];
    countries.forEach(country => {
        country.languages.forEach(language => {
            let existingObj = langCountArray.find(obj => obj.language === language)
            if(existingObj){
                existingObj.count += 1
            }else{
                langCountArray.push({language: language, count: 1})
            }
        })
    })
    let mostSpokenLang = langCountArray.sort((a, b) => b.count - a.count).slice(0, 10)

    result = "";
    mostSpokenLang.forEach(obj => {
        result += 
        `
            <div class="row text-center">
                <div class="col-sm-2 oflow">
                    <h5>${obj.language}</h5>
                </div>
                <div class="col-sm-8">
                    <div class="bar">
                        <div class="percentage" style="width: ${obj.count / 100 * 100}%"></div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <h5>${obj.count}</h5>
                </div>
            </div>
        `
    })
chartData.innerHTML = result
title.innerHTML = `10 Most Spoken Languages in the World`
}


searchInput.addEventListener("keyup", searchOnKeyUp)
btnName.addEventListener('click', onClickSortByNames)
btnCap.addEventListener('click', onClickSortByCapitals)
btnPop.addEventListener('click', onClickSortByPopulation)
popBtn.addEventListener('click', onClickpopBtn)
langBtn.addEventListener('click', onClicklangBtn)



