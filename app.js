const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value
    const url = ` https://api.lyrics.ovh/suggest/${searchText}`
    try {
        toggleSpinner();
        const res = await fetch(url)
        const data = await res.json()
        displaySongs(data.data)
    }
    catch (error) {
        displayError("SoRrY!!Problem for data fetching")
    }

}
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = ` <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
       <source src="${song.preview}" type="audio/mpeg">
      </audio>

    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>`
        songContainer.appendChild(songDiv);
        toggleSpinner();
    })
}
const getLyric = async (artist, title) => {
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        toggleSpinner()
        const res = await fetch(url)
        const data = await res.json()
        displayLyrics(data.lyrics)
    }
    catch (error) {
        displayError('SoRrY!!Problem for data fetching')
    }
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerText = lyrics;
    toggleSpinner()
}
const displayError = error => {
    const errorTag = document.getElementById('error-text')
    errorTag.innerText = error;
}

const toggleSpinner=()=>
{
    const loadingSpinner=document.getElementById('loading-spinner');
    const song=document.getElementById('song-container');
    const lyric=document.getElementById('lyric-song');
   
        loadingSpinner.classList.toggle('d-none');
        song.classList.toggle('d-none');
        lyric.classList.toggle('d-none');
    
   
   
}




document.getElementById('search-field').addEventListener('keypress',function(event){
   // event.preventDefault();
    if(event.key==='Enter')
    {
        document.getElementById('search-button').click();
    }
})

