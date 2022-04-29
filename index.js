import * as fs from 'fs';
import * as readline from 'readline';

let a = await processLineByLine();
let set = new Set()
let str = ''
let obj = {};

main();

async function main() {
    lengthOfKeys()
    startKeys()
    keyToValue()

    let file = await fs.promises.open("E:\\work\\tabl.csv", 'a')
    await fs.promises.appendFile(file, str);
    await file.close()
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('E:\\work\\test.txt');

    const rl = readline.createInterface({input: fileStream,});

    let a = []
    for await (const line of rl) {
        let x = JSON.parse(line);
        a.push(JSON.parse(x['log']));
    }
    return a;
}

function lengthOfKeys() {
    for (let i = 0; i < a.length; i++) {
        let arrKeys = []
        for (let key in a[i]) {
            arrKeys.push(key)
        }

        for (let j = 0; j < arrKeys.length; j++) {
            let key = arrKeys[j];
            set.add(key)
        }
    }
}

function startKeys() {
    let pisya = Array.from(set)
    for (let i = 0; i < pisya.length; i++) {
        str += pisya[i] + ','
    }
    str += '\n'
}

function keyToValue() {
    for (let i = 0; i < a.length; i++) {
        let arr = a[i];

        for (let item of set) {
            obj[item] = ''
        }

        let value = Object.values(arr);
        let key = Object.keys(arr);

        for (let j = 0; j < value.length; j++) {
            obj[key[j]] += value[j]
        }

        for (let key in obj) {
            str += obj[key] + ','
        }
        str += '\n'
    }
}