const search = document.getElementById('button-addon2');
const input = document.querySelector('input');

search.addEventListener('click', () => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${input.value}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.teams))
})

const displayData = (data) => {
    const parent = document.getElementById('items');
    const searchInfo = document.getElementById('search-info');
    const image = document.querySelector('#full-image');
    parent.innerHTML = '';
    spinner(parent);
    stopSpinning();

    if(data == undefined || data == '' || input.value == '' || data == null){
        searchInfo.innerHTML = `<h1 class="text-center text-muted display-6 fw-bolder align-self-center">Search with a team name(ex. Brazil, Argentina)</h1>`
        image.innerHTML = ''
    }
    else{
        const call = () => {
            setTimeout(() => {
                data.forEach( (data) => {
                    const child = document.createElement('div');
                    searchInfo.innerHTML = `You searched for: <b><i>'${input.value}'</i></b>`
                    child.innerHTML = `<div class="col">
                    <div class="card">
                     <img src="${data.strTeamBadge}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.strTeam}</h5>
                        <p class="card-text">${data.strStadiumDescription.slice(0, 200)}</p>
                    </div>
                    </div>
                    </div>`;
                    child.addEventListener('click', () => {
                        topImage(data)
                    })
                    parent.appendChild(child);
                })
            }, 1200);
        }
        call();
        image.innerHTML = ''
    }   
}
const topImage = (data) => {
    const image = document.querySelector('#full-image');
    image.innerHTML = `<div class="card col-lg-4 w-80 mx-auto position-relative id="show">
    <img src="${data.strTeamBadge}" class="card-img-top" alt="..."> 
    <button id="cross" class="position-absolute top-0 end-0 border-0 bg-transparent fw-bolder text-warning"><h2>X</h2></button>
    <div class="card-body">
      <h5 class="card-title">${data.strTeam}</h5>
      <p class="card-text">${data.strStadiumDescription.slice(0, 200)}</p>
      <a href="${data.strRSS}" target="_blank"class="btn btn-primary">Youtube</a>
    </div>
  </div>`;
  const cross = document.getElementById('cross');
  cross.addEventListener('click', () => {
      image.innerHTML = '';
  })
}
const spinner = (par) => {
    const spinner = document.getElementById('items')
    
    spinner.innerHTML = `<div class="spinner-border mx-auto" role="status" id="spinner">
    <span class="visually-hidden">Loading...</span>          
    </div>`
}
const stopSpinning = () => {
    setTimeout(() => {
        const parentSpinner = document.getElementById('spinner');
        parentSpinner.style.display = 'none';
    }, 1190);
}