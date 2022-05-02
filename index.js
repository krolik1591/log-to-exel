import * as fs from 'fs';
import * as readline from 'readline';

main();

async function main() {
    let result = ''
    let LogList = await processLineByLine('E:\\work\\test.txt')
    let KeysArr = ArrKeysFromLogs(SetKeys(LogList))

    result = ListToCsv(KeysArr) + addValueToString(LogList, KeysArr)

    await fs.promises.writeFile("E:\\work\\tabl.csv", result)
}

function addValueToString(ListLog, KeysArr) {
    let allValueLogs = '';

    for (let log of ListLog) {
        let Values = []

        for (let key of KeysArr) {
            if (log[key] === undefined) {
                Values.push('')
            } else {
                Values.push(log[key])
            }
        }
        allValueLogs += ListToCsv(Values)
    }
    return allValueLogs
}

function ListToCsv(list) {
    return list.join(',') + '\n'
}

function ArrKeysFromLogs(SetKeys) {
    let KeysArr = []
    for (let key of SetKeys) {
        KeysArr.push(key)
    }
    return KeysArr
}

function SetKeys(ListLog) {
    let set = new Set()
    for (let log of ListLog) {
        for (let key of Object.keys(log)) {
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
    return a;
}