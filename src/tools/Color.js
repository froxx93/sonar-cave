const Color = {};

Color.DARK = "black";

Color.nextOnRainbow = (colorCode) => {
    const rainbowColors = [
        "#ff0000",
        "#ff7700",
        "#ffff00",
        "#77ff00",
        "#00ff00",
        "#00ff77",
        "#00ffff",
        "#0077ff",
        "#0000ff",
        "#7700ff",
        "#ff00ff",
        "#ff0077",
    ];

    const index = rainbowColors.indexOf(colorCode);

    let nextIndex = index+1;
    if (nextIndex >= rainbowColors.length) {
        nextIndex = 0;
    }

    return rainbowColors[nextIndex];
}
