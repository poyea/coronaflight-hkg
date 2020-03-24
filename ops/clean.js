const fs = require('fs')
const path = require('path')
const readline = require('readline')


async function runClean(){
    const qAndA = (q) => {
        const r = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        return new Promise(resolve => r.question(q, a => {
            r.close()
            resolve(a)
        }))
    }
    let confirm = 'N'
    confirm = await qAndA('Are you sure to clean all the previous dump and output? This action is irreversible.[y/N] ')
    if(confirm === 'Y' || confirm === 'y'){
fs.readdir('./out/dump', (err, files) => {
    if (err) throw err
    const dateFormateRegex = /\d{4}-\d{2}-\d{2}-\d{4}(-raw)?\.txt/
    files.forEach(file => {
        const dir = path.join('./', file)
        if (file.match(dateFormateRegex)){
            fs.unlinkSync('./out/dump/' + dir)
        }
    })
})

fs.readdir('./out/json', (err, files) => {
    if (err) throw err
    const dateFormateRegex = /\d{4}-\d{2}-\d{2}-\d{4}(-raw)?\.json/
    files.forEach(file => {
        const dir = path.join('./', file)
        if (file.match(dateFormateRegex)){
            fs.unlinkSync('./out/json/' +dir)
        }
    })
    console.log('Congrats! Your dump and output files are erased.')
})
    }
    else{
        console.log('Clean exited due to invalid confirmation.')
    }
}

runClean()