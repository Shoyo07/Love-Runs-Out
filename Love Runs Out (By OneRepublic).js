const audio = document.getElementById('audio-player');
const video = document.getElementById('bg-video');
const audioContainer = document.getElementById('audio-container');
const subtitlesList = document.getElementById('subtitles-list');
const linksContainer = document.getElementById('links-container');
const headContainer = document.getElementById('head-container');

const FONT_CYCLE = ['Ink Free', 'Capriola', 'Forte'];
let playbackState = 'IDLE'; // Can be 'IDLE', 'PLAYING', 'PAUSED'

const subtitles = [
    {time: 0, text: "(♪ 🥁Musical Drum & Tambourine Music Playing🥁 ♪)",color:'Red'},
    {time: 8, text: "(♪ 🎹Pianic Music Playing🎹 ♪)\n\n",color:'Lavenderblush'},
    {time: 14, text: "[Verse 1]",color:'Red'},
    {time: 15, text: "I'll be your light, your match, your burning sun"},
    {time: 19, text: "I'll be the bright in black that's making you run"},
    {time: 23, text: "And we'll feel alright, and we'll feel alright"},
    {time: 27, text: "'Cause we'll work it out, yeah, we'll work it out"},
    {time: 31, text: "I'll be doing this, if you have a doubt"},
    {time: 35, text: "'Til the love runs out, 'til the love runs out \n\n"},
    
    {time: 38, text: "[Verse 2]",color:'Red'},
    {time: 39, text: "I'll be your ghost, your game, your stadium" ,color:'Gold'},
    {time: 43, text: "I'll be your 50 thousand clapping like one",color:'Gold'},
    {time: 47, text: "And I feel alright, and I feel alright",color:'Gold'},
    {time: 51, text: "'Cause I worked it out, yeah, I worked it out",color:'Gold'},
    {time: 55, text: "I'll be doing this, if you have a doubt",color:'Gold'},
    {time: 59, text: "'Til the love runs out, 'til the love runs out\n\n",color:'Gold'},

    {time: 62, text: "[Chorus]",color:'Red'},
    {time: 63, text: "I got my mind made up, man, I can't let go",color:'Hotpink'},
    {time: 67, text: "I'm killing every second 'til it sees my soul",color:'Hotpink'},
    {time: 71, text: "(Woo) I'll be running (woo), I'll be running",color:'Hotpink'},
    {time: 75, text: "'Til the love runs out, 'til the love runs out",color:'Hotpink'},
    {time: 79, text: "And we'll start a fire, and we'll shut it down",color:'Hotpink'},
    {time: 83, text: "'Til the love runs out, 'til the love runs out\n\n",color:'Hotpink'},

    {time: 14, text: "[Verse 3]",color:'Red'},
    {time: 87, text: "There's a maniac out in front of me",color:'Springgreen'},
    {time: 91, text: "Got an angel on my shoulder, and Mestopheles",color:'Springgreen'},
    {time: 95, text: "But mama raised me good, mama raised me right",color:'Springgreen'},
    {time: 99, text: 'Mama said, "Do what you want, say prayers at night"',color:'Springgreen'},
    {time: 103, text: "And I'm saying them 'cause I'm so devout",color:'Springgreen'},
    {time: 107, text: "'Til the love runs out, 'til the love runs out, yeah\n\n",color:'Springgreen'},

    {time: 110, text: "[Chorus]",color:'Red'},
    {time: 111, text: "I got my mind made up, man, I can't let go",color:'Crimson'},
    {time: 115, text: "I'm killing every second 'til it sees my soul",color:'Crimson'},
    {time: 119, text: "(Woo) I'll be running (woo), I'll be running",color:'Crimson'},
    {time: 123, text: "'Til the love runs out, 'til the love runs out",color:'Crimson'},
    {time: 127, text: "And we'll start a fire, and we'll shut it down",color:'Crimson'},
    {time: 131, text: "'Til the love runs out, 'til the love runs out\n\n",color:'Crimson'},

    {time: 135, text: "[Bridge]",color:'Red'},
    {time: 136, text: "And, oh, we all want the same thing" ,color: 'Coral'},
    {time: 144, text: "Oh-ooh-oh, we all run for something",color: 'Coral'},
    {time: 151, text: "Run for God, for fate, for love, for hate",color: 'Coral'},
    {time: 155, text: "For gold and rust, for diamonds and dust",color: 'Coral'},
    {time: 159, text: "I'll be your light, your match, your burning sun",color: 'Coral'},
    {time: 163, text: "I'll be the bright in black that's making you run\n\n",color: 'Coral'},

    {time: 168, text: "[Chorus]",color:'Red'},
    {time: 169, text: "I got my mind made up, man, I can't let go" ,color: 'Silver'},
    {time: 173, text: "I'm killing every second 'til it sees my soul",color: 'Silver'},
    {time: 177, text: "(Woo) I'll be running (woo), I'll be running",color: 'Silver'},
    {time: 181, text: "'Til the love runs out, 'til the love runs out",color: 'Silver'},
    {time: 185, text: "And we'll start a fire, and we'll shut it down",color: 'Silver'},
    {time: 189, text: "'Til the love runs out, 'til the love runs out\n\n",color: 'Silver'},

    {time: 192, text: "[Outro]",color:'Red'},
    {time: 193, text: "I'll be your light, your match, your burning sun",color: 'Azure'},
    {time: 197, text: "I'll be the bright in black that's making you run",color: 'Azure'},
    {time: 201, text: "And we'll feel alright, and we'll feel alright",color: 'Azure'},
    {time: 205, text: "'Cause we'll work it out, yes, we'll work it out",color: 'Azure'},
    {time: 209, text: "And we'll start a fire, and we'll shut it down",color: 'Azure'},
    {time: 213, text: "'Til the love runs out, 'til the love runs out",color: 'Azure'},
    {time: 217, text: "'Til the love runs out\n",color:'Azure'},
    {time: 221, text: '(Music Fades)',color:'Brown'}
];

let currentSubtitleIndex = 0;
let currentSubtitleItem = null;

function displaySubtitleWithAnimation(subtitle) {
    currentSubtitleItem = subtitle;
    const subtitleItem = document.createElement('li');
    subtitleItem.style.color = subtitle.color;

    const fontFamilyIndex = (currentSubtitleIndex > 0 ? currentSubtitleIndex - 1 : 0) % FONT_CYCLE.length;
    subtitleItem.style.fontFamily = FONT_CYCLE[fontFamilyIndex];

    let currentCharacterIndex = 0;
    const typingDelay = 60;
    const subtitleText = subtitle.text;
    subtitleItem.innerHTML = '';

    const typingInterval = setInterval(() => {
        if (currentCharacterIndex < subtitleText.length) {
            subtitleItem.innerHTML += subtitleText.charAt(currentCharacterIndex);
            currentCharacterIndex++;
        } else {
            clearInterval(typingInterval);
            if (subtitle.text.endsWith('\n')) {
                subtitleItem.innerHTML += '<br><br>';
            }
        }
    }, typingDelay);
    
    subtitlesList.appendChild(subtitleItem);

    // UPDATED: This block contains the new scrolling logic.
    // It checks if the page content is taller than the visible window.
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
        // If it is, it smoothly scrolls to the very bottom of the page.
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// --- Event Listeners ---

audio.addEventListener('play', () => {
    playbackState = 'PLAYING';
    video.style.display = 'block';
    audioContainer.style.display = 'none';
    linksContainer.style.display = 'none';
    video.play();
});

audio.addEventListener('pause', () => {
    if (!audio.ended) {
        playbackState = 'PAUSED';
    }
    video.pause();
});

audio.addEventListener('seeking', () => {
    video.currentTime = audio.currentTime;
    resyncSubtitles(audio.currentTime);
});

audio.addEventListener('timeupdate', () => {
    if (playbackState !== 'PLAYING' || audio.paused || audio.ended) {
        return;
    }

    const currentTime = audio.currentTime;

    if (currentTime > 0 && headContainer.style.display !== 'block') {
        headContainer.style.display = 'block';
    }
    
    const nextSubtitle = subtitles[currentSubtitleIndex];
    if (nextSubtitle && currentTime >= nextSubtitle.time) {
        displaySubtitleWithAnimation(nextSubtitle);
        currentSubtitleIndex++;
    }
});

audio.addEventListener('ended', () => {
    playbackState = 'IDLE';
    video.style.display = 'none';
    audioContainer.style.display = 'block';
    headContainer.style.display = 'none';
    subtitlesList.innerHTML = '';
    linksContainer.style.display = 'block';
    currentSubtitleIndex = 0;
    currentSubtitleItem = null;
});

document.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
        return;
    }
    if (playbackState === 'PLAYING' || playbackState === 'PAUSED') {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
});

document.addEventListener('visibilitychange', () => {
    if (playbackState === 'IDLE') {
        return;
    }

    if (document.visibilityState === 'visible') {
        video.currentTime = audio.currentTime;
        resyncSubtitles(audio.currentTime);
    }
});

function resyncSubtitles(time) {
    let correctIndex = 0;
    for (let i = 0; i < subtitles.length; i++) {
        if (subtitles[i].time <= time) {
            correctIndex = i + 1;
        } else {
            break;
        }
    }
    
    if (currentSubtitleIndex === correctIndex) {
        return;
    }
    
    currentSubtitleIndex = correctIndex;
    subtitlesList.innerHTML = '';
    
    for (let i = 0; i < currentSubtitleIndex; i++) {
        const subtitle = subtitles[i];
        const subtitleItem = document.createElement('li');
        subtitleItem.style.color = subtitle.color;
        
        const fontFamilyIndex = i % FONT_CYCLE.length;
        subtitleItem.style.fontFamily = FONT_CYCLE[fontFamilyIndex];
        subtitleItem.innerHTML = subtitle.text;
        if (subtitle.text.endsWith('\n')) {
            subtitleItem.innerHTML += '<br><br>';
        }
        subtitlesList.appendChild(subtitleItem);
    }

    const lastSubtitleElement = subtitlesList.lastElementChild;
    if (lastSubtitleElement) {
        // This scroll behavior is intentionally kept to center the lyric on resync.
        lastSubtitleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}