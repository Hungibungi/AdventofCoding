const fs = require('fs')

fs.readFile('third.txt', 'utf8', (err, data) => {
    let Tiles = []

    for (let i = 0; i < data.length / (data.search('\r') + 2); i++) {
        Tiles[i] = []
    }

    if (err) {
        console.error(err)
        return;
    }

    data = data.replaceAll('\n', '')

    for(let i = 0; i < data.length; i++){
        if(data.charAt(i) != '\r'){
            Tiles[Math.floor(i / (data.search('\r') + 1))][(i - Math.floor(i / (data.search('\r') + 1))) % data.search('\r')] = new Tile(data.charAt(i))
        }
    }

    let gearNumbers = prepareNumbers(Tiles, data)
    console.log(gearNumbers)
    let sum = 0

    for(let i = 0; i < gearNumbers.length; i++){
        sum = sum + gearNumbers[i]
    }
    console.log(sum)
})

class Tile {
    constructor(value) {
        this.value = value
        switch(value){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.type = 'number'
                break
            case('*'):
                this.type = 'special'
                break
            case '.':
            default:
                this.type = 'dot'
        }
        this.part = false
        this.gearID = -1
    }

    setPart(){
        this.part = true
    }

    setGearID(gearID){
        this.gearID = gearID
    }
}

function flagParts(tiles, data){
    let numbers = []
    let gearID = 0

    for (let i = 0; i < data.length / (data.search('\r') + 2); i++) {
        for(let j = 0; j < data.search('\r'); j++){
            if(tiles[i][j].type == 'special'){
                for(let k = i - 1; k < i + 2; k++){
                    for(let l = j - 1; l < j + 2; l++){
                        if(tiles[k][l].type == 'number'){
                            numbers.push(k + ',' + l)
                        }
                    }
                }
                if(isSeparate(numbers, tiles)){
                    for(let k = 0; k < numbers.length; k++){
                        tiles[numbers[k].split(',')[0]][numbers[k].split(',')[1]].setPart()
                        tiles[numbers[k].split(',')[0]][numbers[k].split(',')[1]].setGearID(gearID)
                        console.log(tiles[numbers[k].split(',')[0]][numbers[k].split(',')[1]])
                    }
                    gearID++
                }
                numbers = []
            }
        }
    }

    return gearID
}

function prepareNumbers(tiles, data){
    let amountOfGears = flagParts(tiles, data)
    let keep = false
    let tempNumber = ''
    let keptNumbers = []
    let gearID = 0

    for (let i = 0; i < amountOfGears; i++) {
        keptNumbers[i] = 1
    }

    for (let i = 0; i < data.length / (data.search('\r')) - 1; i++) {
        for(let j = 0; j < data.search('\r'); j++){
            if((tiles[i][j].type != 'number' || j == 0) && tempNumber != '' && keep){
                keptNumbers[gearID] = Number(keptNumbers[gearID]) * Number(tempNumber)
                keep = false
            }
            if(tiles[i][j].type != 'number' || j == 0){
                tempNumber = ''
            }
            if(tiles[i][j].type == 'number'){
                tempNumber = tempNumber + tiles[i][j].value
                if(tiles[i][j].part){
                    gearID = tiles[i][j].gearID
                    keep = true
                }
            }
        }
    }

    return keptNumbers
}

function isSeparate(numbers, tiles){
    let separate = false

    for(let i = 0; i < numbers.length - 1; i++){
        let coordX1 = numbers[i].split(',')[1]
        let coordY1 = numbers[i].split(',')[0]
        let coordX2 = numbers[i + 1].split(',')[1]
        let coordY2 = numbers[i + 1].split(',')[0]

        if(coordY1 != coordY2 || (coordX1 - coordX2 == -2 && tiles[Number(coordY1)][Number(coordX1) + 1].type != 'number')){
            separate = true
        }
    }

    return separate
}