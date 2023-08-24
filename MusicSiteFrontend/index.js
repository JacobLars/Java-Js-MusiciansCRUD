document.addEventListener('DOMContentLoaded', function () {
    renderMenu();
    callStartFetches();
});

function renderMenu() {
    const main = document.querySelector('#main-container');
    const nav_bar = document.createElement('nav');
    nav_bar.appendChild(createHomeButton());
    nav_bar.appendChild(createAddMusicianButton());
    nav_bar.appendChild(createAddBandButton());
    main.appendChild(nav_bar);
}

function createHomeButton() {
    const home_btn = document.createElement('button');
    home_btn.textContent = 'Home';

    home_btn.addEventListener('click', function () {
        const main = document.querySelector('#main-container');
        main.innerHTML = '';
        renderMenu();
        callStartFetches();
    })

    return home_btn;
}

function createAddBandButton() {
    const add_band_btn = document.createElement('button');
    add_band_btn.textContent = 'Add Band';

    add_band_btn.addEventListener('click', function () {
        createAddBandFrom();
    })

    return add_band_btn;
}

function createAddMusicianButton() {
    const add_musician_btn = document.createElement('button');
    add_musician_btn.textContent = "Add Musician";

    add_musician_btn.addEventListener('click', function () {
        createAddMusicianForm();
    })

    return add_musician_btn;
}

function createAddMusicianForm() {
    const main = document.querySelector('#main-container');
    main.innerHTML = '';
    renderMenu();
    const musician_form = document.createElement('form');
    musician_form.id = 'musician_form';
    const { inputElements, submit_btn } = createMusicianFormInputs();
    appendInputsToForm(musician_form, inputElements);
    createGenreInput();
    musician_form.appendChild(submit_btn);
    main.appendChild(musician_form);
}

function createAddBandFrom() {
    const main = document.querySelector('#main-container');
    main.innerHTML = '';
    renderMenu();
    const band_form = document.createElement('form');
    const { inputElements, submit_btn } = createBandFormInputs();
    appendInputsToForm(band_form, inputElements);
    createGenreInput();
    band_form.appendChild(submit_btn);
    main.appendChild(band_form);
}


function createBandFormInputs() {
    const inputElements = {
        name: createInputElement('Name'),
        image: createInputElement('Image Url'),
        logo: createInputElement('Logo Url'),
        yearsActive: createInputElement('Years Active'),
        description: createTextAreaElement('Description')
    };

    const submit_btn = createBandSubmitBtn(inputElements);

    return { inputElements, submit_btn };
}

function createBandSubmitBtn(inputElements) {
    submit_btn = createSubmitBtn();
    submit_btn.addEventListener('click', function () {
        const inputValues = extractInputValues(inputElements);
        const selectedGenres = getSelectedGenres();
        inputValues.genres = selectedGenres;
        console.log(inputValues);
        saveBand(inputValues);
    })

    return submit_btn;
}

function createMusicianFormInputs() {

    const inputElements = {
        name: createInputElement('Name'),
        fullName: createInputElement('Full Name'),
        image: createInputElement('Image Url'),
        dateOfBirth: createInputElement('Date of birth'),
        dateOfDeath: createInputElement('Date of death'),
        placeOfBirth: createInputElement('Place of birth'),
        placeOfDeath: createInputElement('Place of death'),
        description: createTextAreaElement('Description'),
        yearsActive: createInputElement('Years active'),
        instruments: createInputElement('Instruments')
    };

    const submit_btn = createMusicianSubmitBtn(inputElements);

    return { inputElements, submit_btn };
}

function appendInputsToForm(parent, inputElements) {
    for (const inputElement of Object.values(inputElements)) {
        parent.appendChild(inputElement);
    }
}

function createGenreInput() {
    getAllGenres().then(genres => {
        const genres_container = document.createElement('div');
        genres_container.id = 'genres_container';
        const genres_header = document.createElement('h3');
        genres_header.textContent = 'Add Genres';

        genres.forEach(genre => {
            const genre_container = document.createElement('div');
            const genre_input = document.createElement('input');
            genre_input.setAttribute('type', 'checkbox');
            genre_input.name = 'genre';
            genre_input.className = 'genre_input';
            genre_input.value = genre.name;
            genres_container.appendChild(genre_input);
            const genre_label = document.createElement('label');
            genre_label.textContent = genre.name;
            genre_container.appendChild(genre_input);
            genre_container.appendChild(genre_label);
            genres_container.appendChild(genre_container);
        });
        const main_container = document.querySelector('#main-container');
        main_container.appendChild(genres_header);
        main_container.appendChild(genres_container);
    }).catch(error => {
        console.error('Error:', error);
    });

}

function createInputElement(placeholder) {
    const input = document.createElement('input');
    input.className = 'form_input';
    input.placeholder = placeholder;
    return input;
}

function createTextAreaElement(placeholder) {
    const textarea = document.createElement('textarea');
    textarea.placeholder = placeholder;
    return textarea;
}

function createMusicianSubmitBtn(inputElements) {
    submit_btn = createSubmitBtn();
    submit_btn.addEventListener('click', function () {
        const inputValues = extractInputValues(inputElements);
        const selectedGenres = getSelectedGenres();
        inputValues.genres = selectedGenres;
        saveMusician(inputValues);
    });
    return submit_btn;
}

function createSubmitBtn() {
    const submit_btn = document.createElement('input');
    submit_btn.setAttribute('type', 'submit');
    submit_btn.value = 'Submit';
    return submit_btn
}

function getSelectedGenres() {
    const selectedGenres = [];
    const genreInputs = document.querySelectorAll('.genre_input:checked');
    genreInputs.forEach(input => {
        selectedGenres.push(input.value);
    });
    return selectedGenres;
}

function extractInputValues(inputElements) {
    const inputValues = {};

    for (const inputName in inputElements) {
        if (inputName === 'instruments') {
            inputValues[inputName] = inputElements[inputName].value.split(',').map(item => item.trim());
        } else {
            inputValues[inputName] = inputElements[inputName].value;
        }
    }

    return inputValues;
}

async function getAllGenres() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/genre/find/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function saveMusician(inputValues) {
    console.log(inputValues.genres);
    const requestBody = JSON.stringify(inputValues);

    fetch('http://localhost:8080/api/v1/music/musician/genres/save?genres=' + inputValues.genres, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: requestBody
    }).then(console.log('Success'))
        .catch(error => console.error('Error:', error));
}

function saveBand(inputValues) {
    console.log(inputValues.genres);
    const requestBody = JSON.stringify(inputValues);

    fetch('http://localhost:8080/api/v1/music/band/genres/save?genres=' + inputValues.genres, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: requestBody
    }).then(console.log('Success'))
        .catch(error => console.error('Error:', error));
}

function callStartFetches() {
    getAllAlbums();
    getAllBands();
    getAllMusicians();
}

function getAllMusicians() {
    fetch('http://localhost:8080/api/v1/musician/find/all')
        .then(response => response.json())
        .then(result => {
            const musicians_header = 'Musicians';
            const musicianClickCallback = function (musicianId) {
                getMusicianById(musicianId);
            };
            displayMusicItem(result, musicians_header, musicianClickCallback);
        })
        .catch(error => console.log('error', error));
}

function getAllBands() {
    fetch('http://localhost:8080/api/v1/band/find/all')
        .then(response => response.json())
        .then(result => {
            const bands_header_content = 'Bands';
            const bandClickCallback = function (bandId) {
                getBandById(bandId);
            };
            displayMusicItem(result, bands_header_content, bandClickCallback);
        })
        .catch(error => console.log('error', error));
}

function getAllAlbums() {
    fetch('http://localhost:8080/api/v1/album/find/all')
        .then(response => response.json())
        .then(result => {
            const album_header_content = 'Albums';
            const albumClickCallback = function (albumId) {
                
                console.log(albumId);
            };
            displayMusicItem(result, album_header_content, albumClickCallback);
        })
}

function getMusicianById(musicianId) {
    console.log(musicianId);
    fetch('http://localhost:8080/api/v1/musician/find/' + musicianId)
        .then(response => response.json())
        .then(result => {
            renderMusicianPage(result); 
        })
}

function getBandById(bandId) {
    fetch('http://localhost:8080/api/v1/band/find/' + bandId)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            renderBandPage(result); 
        })
}

function displayMusicItem(data, header_content, clickDivCallback) {
    const main = document.querySelector('#main-container');
    const list_container = document.createElement('div');
    list_container.className = 'list_container';
    const list_header = document.createElement('h3');
    list_header.textContent = header_content;
    list_container.appendChild(list_header);
    const music_list = document.createElement('ul');
    const populated_music_list = createMusicListItem(data, music_list, clickDivCallback);
    list_container.appendChild(populated_music_list);
    main.appendChild(list_container);
}


function createMusicListItem(data, element, clickDivCallback) {

    let dataLenght = data.length;

    if (data.length >= 10) {
        dataLenght = 10;
    }

    for (let index = 0; index < dataLenght; index++) {
        const musician_list_item = document.createElement('li');
        musician_list_item.addEventListener('click', function(){
            clickDivCallback(data[index].id);
        });
        const musician_image = document.createElement('img');
        const musician_name = document.createElement('p');
        const musician = data[index];
        musician_image.src = musician.image;
        musician_name.textContent = musician.name;
        musician_list_item.appendChild(musician_image);
        musician_list_item.appendChild(musician_name);
        element.appendChild(musician_list_item);
    }
    return element;
}

function renderMusicianPage(data) {
    const main = document.querySelector('#main-container');
    main.innerHTML = '';
    renderMenu();
    const container = getMusicianContainer(data);
    main.appendChild(container);
}

function renderBandPage(data){
    const main = document.querySelector('#main-container');
    main.innerHTML = '';
    renderMenu();
    const container = getBandContainer(data);
    main.appendChild(container);
}

function createMusicItemContainer(className) {
    const musician_container = document.createElement('div');
    musician_container.className = className;
    return musician_container;
}

function createHeader(text) {
    const header = document.createElement('h1');
    header.textContent = text;
    return header;
}

function createImage(src) {
    const image = document.createElement('img');
    image.src = src;
    return image;
}

function createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
}

function createSubHeader(content) {
    const sub_header = document.createElement('h4');
    sub_header.className = 'sub_header';
    sub_header.textContent = content;
    return sub_header;
}

function createGenreList(data){
   const list = document.createElement('div');
   for (const item of data) {
        const listItem = document.createElement('p');
        listItem.textContent = item.name;
        list.appendChild(listItem);
   }
   return list;
}

function getMusicianContainer(data){
    const musician_container = createMusicItemContainer('item_page_container');
    const musician_name = createHeader(data.name);
    const musician_image = createImage(data.image);
    const fullName = createParagraph(data.fullName);
    const born = createParagraph('Born: ' + data.dateOfBirth + ', ' + data.placeOfBirth);
    let deathText = '';
    if(data.dateOfDeath !== null && data.placeOfDeath !== null){
        deathText = 'Dead: ' + data.dateOfDeath + ', ' + data.placeOfDeath;
    }
    const dead = createParagraph(deathText);
    const yearsActive = createParagraph('Years Active: ' + data.yearsActive);
    const description_header = createSubHeader('Description');
    const description = createParagraph(data.description);
    description.className = 'description';
    const instruments = createParagraph('Instrumnets: ' + data.instruments);
    const genres_header = createSubHeader('Genres');
    const genres = createGenreList(data.genres);

    musician_container.appendChild(musician_name);
    musician_container.appendChild(musician_image);
    musician_container.appendChild(fullName);
    musician_container.appendChild(born)
    musician_container.appendChild(dead);
    musician_container.appendChild(yearsActive);
    musician_container.appendChild(description_header);
    musician_container.appendChild(description);
    musician_container.appendChild(instruments);
    musician_container.appendChild(genres_header);
    musician_container.appendChild(genres);
    
    return musician_container;
}

function getBandContainer(data){
    const band_container = createMusicItemContainer('item_page_container');


    return band_container;
}