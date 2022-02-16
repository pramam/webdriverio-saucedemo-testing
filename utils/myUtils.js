//https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
// padDigits(9, 4);  // "0009"
// padDigits(10, 4); // "0010"
// padDigits(15000, 4); // "15000"
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

module.exports = {
    padDigits: padDigits
};