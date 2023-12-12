console.log("Welcome to FineTune");
let audioElement  = new Audio('songs/Missing-Me.mp3')
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar =  document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Missing Me" , filePath: "songs/Missing-Me.mp3" , coverPath : "covers/1.jpg"},
    {songName: "Naatu Naatu" , filePath: "songs/2.mp3" , coverPath : "covers/2.jpg"},
    {songName: "I Ain't Worried " , filePath: "songs/3.mp3" , coverPath : "covers/3.jpg"},
    {songName: "Deva Deva" , filePath: "songs/4.mp3" , coverPath : "covers/4.jpg"},
    {songName: "NaaN NaaN" , filePath: "songs/5.mp3" , coverPath : "covers/5.jpg"},
]

songItems.forEach((element ,  i)=>{
    //console.log(element , i);    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play(); 
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 2;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100; 
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 2;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=> {
    if(songIndex >=5){
        songIndex = 0;
    }
    else {
    songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');


})
    
    document.getElementById('previous').addEventListener('click', ()=> {
        if(songIndex <= 0){
            songIndex = 0;
        }
        else {
        songIndex -= 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
})