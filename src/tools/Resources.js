let resources = {};
let sounds = {};
let soundQueue = null;

const activeAudios = [];

function loadResources(doneFunc, dankMode) {
    let imageQueue = dankMode ? [
        {name: "player1", src: "res/image/bat1-dank.png"},
        {name: "player2", src: "res/image/bat2-dank.png"},
        {name: "player3", src: "res/image/bat3-dank.png"},
    ] : [
        {name: "player1", src: "res/image/bat1.png"},
        {name: "player2", src: "res/image/bat2.png"},
        {name: "player3", src: "res/image/bat3.png"},
    ]

    soundQueue = dankMode ? [
        {name: "growl", src: "res/sound/airhorn.mp3"},
        {name: "hit", src: "res/sound/shot.mp3"},
        {name: "die", src: "res/sound/sad-airhorn.mp3"},
        {name: "mainTheme", src: "res/sound/main-theme.mp3"},
    ] : [
        {name: "growl", src: "res/sound/radar.mp3"},
        {name: "hit", src: "res/sound/radar.mp3"},
        {name: "die", src: "res/sound/die.mp3"},
        {name: "mainTheme", src: "res/sound/cave-theme.mp3"},
    ];

    function loadImage(src, imgDoneFunc) {
        let img = new Image();
        img.onload = () => imgDoneFunc(img);
        img.src = src;
    }

    function loadNextImage() {
        if (imageQueue.length == 0) {
            doneFunc();
        } else {
            let item = imageQueue[0];
            imageQueue.splice(0, 1);
            loadImage(item.src, img => {
                console.log(item);
                resources[item.name] = img;
                loadNextImage();
            })
        }
    }

    loadNextImage();
}

function playSound(name, volume = 1, loop = false) {
    const soundEnabled = true;

    if (soundEnabled) {
        const sound = soundQueue.filter(s => s.name == name)[0];
        if (sound != null) {
            const audio = new Audio(sound.src);
            activeAudios.push(audio);
            audio.name = name;
            audio.volume = volume;
            audio.loop = loop;
            audio.play();
        }
    }
}

function stopSound(name) {
    const audios = activeAudios.filter(a => a.name == name);
    audios.forEach(a => {
        a.pause();
        const index = activeAudios.indexOf(a);
        if (index != -1) activeAudios.splice(index, 1);
    });

}

function stopAllSounds() {
    activeAudios.forEach(a => stopSound(a.name));
}
