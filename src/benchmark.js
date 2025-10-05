function originalVersion(s) {
    var alphabetArray = new Array(26).fill(0);
    var vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
    var aCharCode = 'a'.charCodeAt(0);
    for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
        var char = s_1[_i];
        alphabetArray[char.charCodeAt(0) - aCharCode]++;
    }
    var maxVowelFreq = 0;
    for (var _a = 0, vowelSet_1 = vowelSet; _a < vowelSet_1.length; _a++) {
        var vowel = vowelSet_1[_a];
        maxVowelFreq = Math.max(maxVowelFreq, alphabetArray[vowel.charCodeAt(0) - aCharCode]);
    }
    var maxConsonantFreq = 0;
    for (var i = 0; i < 26; i++) {
        if (!vowelSet.has(String.fromCharCode(aCharCode + i))) {
            maxConsonantFreq = Math.max(maxConsonantFreq, alphabetArray[i]);
        }
    }
    return maxVowelFreq + maxConsonantFreq;
}
function leetcodeVersion(s) {
    var vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    var az = new Map();
    for (var i = 0; i < s.length; i++) {
        az.set(s[i], (az.get(s[i]) || 0) + 1);
    }
    var v = 0, c = 0;
    for (var _i = 0, az_1 = az; _i < az_1.length; _i++) {
        var _a = az_1[_i], key = _a[0], value = _a[1];
        if (vowels.has(key))
            v = Math.max(v, value);
        else
            c = Math.max(c, value);
    }
    return v + c;
}
function minimalVersion(s) {
    var vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    var freq = {};
    var v = 0, c = 0;
    for (var _i = 0, s_2 = s; _i < s_2.length; _i++) {
        var ch = s_2[_i];
        var f = (freq[ch] = (freq[ch] || 0) + 1);
        if (vowels.has(ch))
            v = Math.max(v, f);
        else
            c = Math.max(c, f);
    }
    return v + c;
}
// --- Benchmark ---
function benchmark(fn, name, input) {
    var start = performance.now();
    var result = fn(input);
    var end = performance.now();
    console.log("".concat(name, ": result=").concat(result, ", time=").concat((end - start).toFixed(3), "ms"));
}
// Generate a big string of 1M chars
var letters = 'abcdefghijklmnopqrstuvwxyz';
var bigString = '';
for (var i = 0; i < 1000000; i++) {
    bigString += letters[Math.floor(Math.random() * 26)];
}
// Run benchmarks
benchmark(originalVersion, 'Original Version', bigString);
benchmark(leetcodeVersion, 'LeetCode Version', bigString);
benchmark(minimalVersion, 'Minimal Version', bigString);
