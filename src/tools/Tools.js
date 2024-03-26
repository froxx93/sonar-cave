// math extensions
Math.getHypotenuse = (a, b) => {
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return c;
}
Math.randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Number extensions
Number.isEven = (num) => {
    if (!Number.isInteger(num)) {
        console.error(num + " is not an integer");
        return null;
    } else {
        return num % 2 == 0;
    }
}
Number.isOdd = (num) => {
    if (!Number.isInteger(num)) {
        console.error(num + " is not an integer");
        return null;
    } else {
        return num % 2 != 0;
    }
}

// Object extensions
Object.toArray = (obj) => {
    return Object.keys(obj).map(key => obj[key]);
}

// Array extensions
Array.flatten = (arr) => {
    var ret = [];
    for(var i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            ret = ret.concat(Array.flatten(arr[i]));
        } else {
            ret.push(arr[i]);
        }
    }
    return ret;
}
Array.last = (arr) => {
    return arr[arr.length-1];
}
