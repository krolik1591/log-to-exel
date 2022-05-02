import * as fs from 'fs';
import * as readline from 'readline';

main();

async function main() {
    let str = ''
    let arr = await processLineByLine('E:\\work\\test.txt')
    let obj = setToObject(setOfKeys(arr))

    str = objectKeysToString(obj) + addValueToString(arr, obj)

    let file = await fs.promises.open("E:\\work\\tabl.csv", 'a')
    await fs.promises.appendFile(file, str);
    await file.close()
}

function addValueToString(arr, obj) {
    let str = '';

    for (let part of arr) {
        let objRight = obj

        for (let [key, value] of Object.entries(part)) {
            objRight[key] = value
        }
        str += objectValuesToString(objRight) + '\n'
    }
    return str
}

function objectKeysToString(obj) {
    let str = ''
    for (let key of Object.keys(obj)) {
        str += key + ','
    }
    return str + '\n'
}

function objectValuesToString(obj) {
    let str = ''
    for (let value of Object.values(obj)) {
        str += value + ','
    }
    return str
}

function setToObject(set) {
    let obj = {}
    for (let key of set) {
        obj[key] = ''
    }
    return obj
}

function setOfKeys(arr) {
    let set = new Set();

    for (let part of arr) {
        let keys = Object.keys(part);
        for (let key of keys) {
            set.add(key)
        }
    }
    return set
}

async function processLineByLine(Path) {
    const fileStream = fs.createReadStream(Path);

    const rl = readline.createInterface({input: fileStream,});

    let a = []
    for await (const line of rl) {
        let x = JSON.parse(line);
        a.push(JSON.parse(x['log']));
    }
    console.log(listForCsv(a))

}

function listForCsv(listLog) {
    let list = []
    for (let log of listLog){
        list.push(log)
    }
    return list
}