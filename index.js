import * as fs from 'fs';
import * as readline from 'readline';

main();
//
async function main() {
    let result = ''
    let LogList = await processLineByLine('E:\\work\\test.txt')
    let KeysObj = ObjKeysFromLogs(LogList)

    result = ListToCsv(Object.keys(KeysObj)) + addValueToString(LogList, KeysObj)

    await fs.promises.writeFile("E:\\work\\tabl.csv", result)
}

function addValueToString(ListLog, KeysObject) {
    let allValueLogs = '';

    for (let log of ListLog) {
        let cloneKeysObject = {}
        Object.assign(cloneKeysObject, KeysObject)

        for (let [key, value] of Object.entries(log)) {
            cloneKeysObject[key] = value
        }
        allValueLogs += ListToCsv(Object.values(cloneKeysObject))
    }
    return allValueLogs
}

function ListToCsv(list) {
    let str = ''
    for (let value of list) {
        str += value + ','
    }
    return str  + '\n'
}

function ObjKeysFromLogs(listLog){
    let KeysObj = {}
    for (let log of listLog) {
        let keys = Object.keys(log);
        for (let key of keys) {
            KeysObj[key] = ''
        }
    }
    return KeysObj
}

async function processLineByLine(Path) {
    const fileStream = fs.createReadStream(Path);

    const rl = readline.createInterface({input: fileStream,});

    let a = []
    for await (const line of rl) {
        let x = JSON.parse(line);
        a.push(JSON.parse(x['log']));
    }
    return a;
}
//LoveYouBro :D