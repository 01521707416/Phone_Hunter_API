const loadPhone = (searchText, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhones(data.data, dataLimit))
        .catch(error => console.log(error))
}

displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone_container')
    phonesContainer.innerHTML = ``

    // Display 10 phones only
    const showAll = document.getElementById('showAll')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }



    // Display no phones
    const noPhone = document.getElementById('no_phone_found')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = ` 
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body p-4 m-4">
                    <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                        <button href="#" class="btn btn-primary" onclick="loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
            </div>
        `
        phonesContainer.appendChild(phoneDiv)
    })
    /* Stop loader */
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search_field')
    const searchText = searchField.value
    console.log(searchText)
    loadPhone(searchText, dataLimit)
}

/* Button search click */
document.getElementById('search_btn').addEventListener('click', function () {
    /* Start loader */
    processSearch(10)
})

/* Search input field */
document.getElementById('search_field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(10)
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

/* Not the best option to solve */
document.getElementById('btn_showAll').addEventListener('click', function () {
    processSearch()
})

const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data))
        .catch(error => console.log(error))
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phone_details')
    phoneDetails.innerHTML = `
    <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release date unavailable!'} </p>
    <p> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No information found!'}</p>
    <p> Others: ${phone.others ? phone.others : 'Unavilable'}</p>
    `
}

// loadPhone('')