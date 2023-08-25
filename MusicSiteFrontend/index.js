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
            const buttonContent = 'Add Album';
            const musicians_header = 'Musicians';
            const addAlbumClickCallback = (musicianId, musicianName) => {
                renderAddAlbumToMusicianPage(musicianId, musicianName);
            }
            const musicianClickCallback = function (musicianId) {
                getMusicianById(musicianId);
            };
            displayMusicItem(result, musicians_header, musicianClickCallback, addAlbumClickCallback, buttonContent);
        })
        .catch(error => console.log('error', error));
}

function renderAddAlbumToMusicianPage(musicianId, musicianName){
    const main = document.querySelector('#main-container');
    main.innerHTML = '';
    renderMenu();
    const musicianNameHeader = document.createElement('h2');
    musicianNameHeader.textContent ='Add album to ' + musicianName;
    const form = createAddAlbumForm(musicianId);
    main.appendChild(musicianNameHeader);
    main.appendChild(form);
}

function createAddAlbumForm(musicianId){
    const form = document.createElement('form');
    const { inputElements, submit_btn } = createAddAlbumMusicianFormInputs(musicianId);
    appendInputsToForm(form, inputElements);
    createGenreInput();
    form.appendChild(submit_btn);
    return form;
}

function createAddAlbumMusicianFormInputs(musicicanId){
    const inputElements = {
        name: createInputElement('Name'),
        image: createInputElement('Image Url'),
        released: createInputElement('Released'),
        description: createTextAreaElement('Description')
    }
    const submit_btn = createSaveAlbumMusicianSubmitBtn(inputElements, musicicanId);

    return {inputElements, submit_btn};
}

function createSaveAlbumMusicianSubmitBtn(inputElements, musicianId){
    const submit_btn = createSubmitBtn();
    submit_btn.addEventListener('click', () =>{
        const inputValues = extractInputValues(inputElements);
        const selectedGenres = getSelectedGenres();
        inputValues.genres = selectedGenres;
        saveAlbumToMusician(musicianId, inputValues);
    })
    return submit_btn;
}

function saveAlbumToMusician(musicianId, inputValues){
    const requestBody = JSON.stringify(inputValues);
    fetch('http://localhost:8080/api/v1/music/musician/album/save?musicianId=' + musicianId + '&genres=' + inputValues.genres, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: requestBody
    }).then(console.log('Success'))
        .catch(error => console.error('Error:', error));
}

function getAllBands() {
    fetch('http://localhost:8080/api/v1/band/find/all')
        .then(response => response.json())
        .then(result => {
            const bands_header_content = 'Bands';
            const addBtnContent = 'Add Album';
            const addAlbumClickCallback = (bandId, bandName) => {
                renderAddAlbumToBandPage(bandId, bandName);
            }
            const bandClickCallback = function (bandId) {
                getBandById(bandId);
            };
            displayMusicItem(result, bands_header_content, bandClickCallback, addAlbumClickCallback, addBtnContent);
        })
        .catch(error => console.log('error', error));
}

function renderAddAlbumToBandPage(bandId, bandName){
    const main = document.querySelector('#main-container');
    main.innerHTML = '';
    renderMenu();
    const bandNameHeader = document.createElement('h2');
    bandNameHeader.textContent ='Add album to ' + bandName;
    const form = createAddAlbumBandForm(bandId);
    main.appendChild(bandNameHeader);
    main.appendChild(form);
}

function createAddAlbumBandForm(bandId){
    const form = document.createElement('form');
    const { inputElements, submit_btn } = createAddAlbumBandInputs(bandId);
    appendInputsToForm(form, inputElements);
    createGenreInput();
    form.appendChild(submit_btn);
    return form;
}


function createAddAlbumBandInputs(bandId){
    const inputElements = {
        name: createInputElement('Name'),
        image: createInputElement('Image Url'),
        released: createInputElement('Released'),
        description: createTextAreaElement('Description')
    }
    const submit_btn = createAddAlbumBandSubmitBtn(inputElements, bandId);

    return {inputElements, submit_btn};
}

function createAddAlbumBandSubmitBtn(inputElements, bandId){
    const submit_btn = createSubmitBtn();
    submit_btn.addEventListener('click', (event) =>{
        const inputValues = extractInputValues(inputElements);
        const selectedGenres = getSelectedGenres();
        inputValues.genres = selectedGenres; 
        saveAlbumToBand(bandId, inputValues);
    })
    return submit_btn;
}

function saveAlbumToBand(bandId, inputValues){
    const requestBody = JSON.stringify(inputValues);
    fetch('http://localhost:8080/api/v1/music/band/album/save?bandId=' + bandId + '&genres=' + inputValues.genres, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: requestBody
    }).then(console.log('Success'))
        .catch(error => console.error('Error:', error));
}

function getAllAlbums() {
    fetch('http://localhost:8080/api/v1/album/find/all')
        .then(response => response.json())
        .then(result => {
            const album_header_content = 'Albums';
            const buttonContent = 'Add Song';
            const buttonClickCallback = (albumId, albumName) => {
                renderAddSongPage(albumId, albumName);
            }
            const albumClickCallback = function (albumId) {
                getAlbumById(albumId);
            };
            displayMusicItem(result, album_header_content, albumClickCallback, buttonClickCallback, buttonContent);
        })
}

function renderAddSongPage(albumId, albumName){
    const main = document.querySelector('#main-container');
    main.innerHTML = '';
    renderMenu();
    const albumNameHeader = document.createElement('h2');
    albumNameHeader.textContent ='Add song to ' + albumName;
    const form = createAddSongForm(albumId);
    main.appendChild(albumNameHeader);
    main.appendChild(form);
}

function createAddSongForm(albumId){
    const form = document.createElement('form');
    const { inputElements, submit_btn } = createAddSongToAlbumInputs(albumId);
    appendInputsToForm(form, inputElements);
    createGenreInput();
    form.appendChild(submit_btn);
    return form;
}

function createAddSongToAlbumInputs(albumId){
    const inputElements = {
        name: createInputElement('Name'),
        streams: createInputElement('Streams'),
        duration: createInputElement('Duration'),
        description: createTextAreaElement('Description')
    }
    const submit_btn = createAddSongSubmitBtn(albumId, inputElements);

    return {inputElements, submit_btn};
}
function createAddSongSubmitBtn(albumId, inputElements){
    const submit_btn = createSubmitBtn();
    submit_btn.addEventListener('click', () =>{
        const inputValues = extractInputValues(inputElements);
        const selectedGenres = getSelectedGenres();
        inputValues.genres = selectedGenres; 
        saveSongToAlbum(albumId, inputValues);
    })
    return submit_btn;
}


function saveSongToAlbum(albumId, inputValues){
    const requestBody = JSON.stringify(inputValues);
    console.log(inputValues.genres);
    fetch('http://localhost:8080/api/v1/music/album/song/save?albumId='+ albumId +'&genres=' + inputValues.genres, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: requestBody
    }).then(console.log('Success'))
        .catch(error => console.error('Error:', error));
}

function getAlbumById(albumId){
    fetch('http://localhost:8080/api/v1/album/find/' + albumId)
        .then(response => response.json())
        .then(result => {
            renderAlbumPage(result);
        })
}

function getMusicianById(musicianId) {
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

function displayMusicItem(data, header_content, clickDivCallback, clickButtonCallback, buttonContent) {
    const main = document.querySelector('#main-container');
    const list_container = document.createElement('div');
    list_container.className = 'list_container';
    const list_header = document.createElement('h3');
    list_header.textContent = header_content;
    list_container.appendChild(list_header);
    const music_list = document.createElement('ul');
    const populated_music_list = createMusicianListItem(data, music_list, clickDivCallback, clickButtonCallback, buttonContent);
    list_container.appendChild(populated_music_list);
    main.appendChild(list_container);
}


function createMusicianListItem(data, element, clickDivCallback, clickButtonCallback, buttonContent) {

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
        const addBtn = document.createElement('button');
        addBtn.className = 'add_btn';
        addBtn.textContent = buttonContent;
        const musician = data[index];
        addBtn.addEventListener('click', function(event){
            event.stopPropagation();
            clickButtonCallback(musician.id, musician.name);
        })

        musician_image.src = musician.image;
        musician_name.textContent = musician.name;
        musician_list_item.appendChild(musician_image);
        musician_list_item.appendChild(musician_name);
        musician_list_item.appendChild(addBtn);
        element.appendChild(musician_list_item);
    }
    return element;
}

function renderAlbumPage(data){
    const main = document.querySelector('#main-container');
    main.innerHTML = '';
    renderMenu();
    console.log(data);
    const container = getAlbumContainer(data);
    main.appendChild(container);
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

function createSongTableHead(){
    const tableHead = document.createElement('thead');
    const headRow = document.createElement('tr');
    const songNameHeader = document.createElement('td');
    songNameHeader.textContent = 'Name';
    const songDurationHeader = document.createElement('td');
    songDurationHeader.textContent = 'Duration';
    const songStreamsHeader = document.createElement('td');
    songStreamsHeader.textContent = 'Streams';
    const songGenresHeader = document.createElement('td');
    songGenresHeader.textContent = 'Genres';
    const songDesciptionHeader = document.createElement('td');
    songDesciptionHeader.textContent = 'Description';
    headRow.appendChild(songNameHeader);
    headRow.appendChild(songDurationHeader);
    headRow.appendChild(songStreamsHeader);
    headRow.appendChild(songGenresHeader);
    headRow.appendChild(songDesciptionHeader);
    tableHead.appendChild(headRow);
    return tableHead;
}

function createSongsTableBody(songs){
    const tableBody = document.createElement('tbody');
    for (const song of songs) {
        const songRow = document.createElement('tr');
        const songName = document.createElement('td');
        const songDuration = document.createElement('td');
        const songStreams = document.createElement('td');
        const songGenres = document.createElement('td');
        const songDescription = document.createElement('td');
        songName.textContent = song.name;
        songDuration.textContent = song.duration;
        songStreams.textContent = song.streams;
        songDescription.textContent = song.description;
        for(const genre of song.genres){
            console.log(genre.name);
            songGenres.textContent += genre.name + ", ";
        }
        songRow.appendChild(songName);
        songRow.appendChild(songDuration);
        songRow.appendChild(songStreams);
        songRow.appendChild(songGenres);
        songRow.appendChild(songDescription);
        tableBody.appendChild(songRow);
    }
    return tableBody;
}

function createSongsTable(songs){
    const table = document.createElement('table');
    let tableHead = createSongTableHead();
    let tableBody = createSongsTableBody(songs);
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    return table;
}

function getAlbumContainer(album){
    const album_container = createMusicItemContainer('item_page_container');
    const albumImage = createImage(album.image);
    const albumName = createHeader(album.name);
    const albumRelease = createParagraph('Released: ' + album.released);
    const albumDescription = createParagraph(album.description);
    const genresHeader = createSubHeader('Genres');
    albumDescription.className = 'description';
    const genres = createGenreList(album.genres);
    const songsHeader = createSubHeader('Songs');
    const songTable = createSongsTable(album.songs);
    album_container.appendChild(albumImage);
    album_container.appendChild(albumName);
    album_container.appendChild(albumRelease);
    album_container.appendChild(albumDescription);
    album_container.appendChild(genresHeader);
    album_container.appendChild(genres);
    album_container.appendChild(songsHeader);
    album_container.appendChild(songTable);
    return album_container;
}

function getMusicianContainer(musician){
    const musician_container = createMusicItemContainer('item_page_container');
    const musician_name = createHeader(musician.name);
    const musician_image = createImage(musician.image);
    const fullName = createParagraph(musician.fullName);
    const born = createParagraph('Born: ' + musician.dateOfBirth + ', ' + musician.placeOfBirth);
    let deathText = '';
    if(musician.dateOfDeath !== null && musician.placeOfDeath !== null){
        deathText = 'Dead: ' + musician.dateOfDeath + ', ' + musician.placeOfDeath;
    }
    const dead = createParagraph(deathText);
    const yearsActive = createParagraph('Years Active: ' + musician.yearsActive);
    const description_header = createSubHeader('Description');
    const description = createParagraph(musician.description);
    description.className = 'description';
    const instruments = createParagraph('Instrumnets: ' + musician.instruments);
    const genres_header = createSubHeader('Genres');
    const genres = createGenreList(musician.genres);

    const albumClickCallback = (albumId) => {
        getAlbumById(albumId);
    }
    const AlbumListHeader = createSubHeader('Albums');
    const musician_album_list = document.createElement('ul');
    const musicianAlbums = createMusicianListItem(musician.albums, musician_album_list, albumClickCallback);
    musician_album_list.className = 'music_item_page_list';

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
    musician_container.appendChild(AlbumListHeader);
    musician_container.appendChild(musicianAlbums);
    return musician_container;
}

function getBandContainer(band){
    const band_container = createMusicItemContainer('item_page_container');
    const band_logo = createImage(band.logo);
    band_logo.id = 'band_logo';
    const band_image = createImage(band.image);
    const bandName = createParagraph(band.name);
    const yearsActive = createParagraph('Years Active: ' + band.yearsActive);
    const band_description_header = createSubHeader('Description');
    const bandDescription = createParagraph(band.description);
    bandDescription.className = 'description';
    const genresHeader = createSubHeader('Genres');
    const genres = createGenreList(band.genres);
    
    const musiciansHeader = createSubHeader('Band memebers');
    const albumsHeader = createSubHeader('Albums');

    const musicianClickCallback = (musicianId) => {
        getMusicianById(musicianId); 
    };

    const albumClickCallback = (albumId) => {
        getAlbumById(albumId);
    }

    const band_musicians_list = document.createElement('ul');
    const band_musicians = createMusicianListItem(band.musicians, band_musicians_list, musicianClickCallback);
    band_musicians_list.className = 'music_item_page_list';

    const band_album_list = document.createElement('ul');
    const bandAlbums = createMusicianListItem(band.albums, band_album_list, albumClickCallback);
    band_album_list.className = 'music_item_page_list';
    
    band_container.appendChild(band_logo);
    band_container.appendChild(band_image);
    band_container.appendChild(bandName);
    band_container.appendChild(yearsActive);
    band_container.appendChild(band_description_header);
    band_container.appendChild(bandDescription);
    band_container.appendChild(genresHeader);
    band_container.appendChild(genres);
    band_container.appendChild(musiciansHeader);
    band_container.appendChild(band_musicians);
    band_container.appendChild(albumsHeader);
    band_container.appendChild(bandAlbums);
    return band_container;
}

