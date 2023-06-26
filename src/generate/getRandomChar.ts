export function getRandomChar(min: number, max: number): string {
    const limit = max - min + 1

    return String.fromCharCode(Math.floor(Math.random() * limit) + min)
}

export function getSpecialChar(): string {
    const specialChar: string = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";

    return specialChar[Math.floor(Math.random() * specialChar.length)];
}