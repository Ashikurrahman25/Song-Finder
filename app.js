const searchForSongs = async() => {

    const searchedSong = document.getElementById("search-input").value;
    const url = `https://api.lyrics.ovh/suggest/${searchedSong}`;

    const res = await fetch(url);
    const data = await res.json();
    showSongs(data.data);
}

const showSongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML ='';
    songs.forEach(song => {

        const songDiv = document.createElement('Div');
        songDiv.className = "single-result row align-items-center my-3 p-3";

        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}t</span></p>
            <audio controls>
                <source src= "${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick ="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>`;

        songContainer.appendChild(songDiv);
    });
}

const getLyric = async(artist, title)=>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    const res = await fetch(url);
    const data = await res.json();
    showLyrics(data.lyrics);
}

const showLyrics = lyrics =>{
    const lyricContainer = document.getElementById('lyric-container');
    lyricContainer.innerText = lyrics;
    document.documentElement.scrollTop = 0;
    console.log(lyrics);
}

