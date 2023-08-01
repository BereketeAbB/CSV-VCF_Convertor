const fs = require('fs')
const readline = require('readline');

const readStream = fs.createReadStream('contact.csv');
const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

let makeContact =  (prefix) => {
    prefix = prefix + " "
    let length = 0
    rl.on('line', (line) => {
        let splitted = line.split(',')
        fs.writeFileSync('./contacts.vcf', 
    `
BEGIN: VCARD
VERSION:2.1
FN:${prefix}${splitted[0]}
TEL;CELL:${splitted[1]}
END:VCARD\n`,
            {
                encoding: 'utf-8',
                flag: 'a',
            }
        )
        length++;
    });
    
    rl.on('close', () => {
        console.log(`Done converting CSV to VCF. ${length} Contacts created.`);
    });
}

makeContact("")