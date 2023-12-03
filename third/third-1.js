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

    let partNumbers = prepareNumbers(Tiles, data)
    let sum = 0

    for(let i = 0; i < partNumbers.length; i++){
        sum = sum + Number(partNumbers[i])
    }
    console.log(sum)
})

class Tile {
    constructor(value) {
        this.value = value
        switch(value){
            case '.':
                this.type = 'dot'
                break
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
            default:
                this.type = 'special'
        }
        this.part = false
    }

    setPart(){
        this.part = true
    }
}

function flagParts(tiles, data){
    for (let i = 0; i < data.length / (data.search('\r') + 2 ); i++) {
        for(let j = 0; j < data.search('\r'); j++){
            if(tiles[i][j].type == 'special'){
                for(let k = i - 1; k < i + 2; k++){
                    for(let l = j - 1; l < j + 2; l++){
                        if(tiles[k][l].type == 'number'){
                            tiles[k][l].setPart()
                        }
                    }
                }
            }
        }
    }
}

function prepareNumbers(tiles, data){
    flagParts(tiles, data)
    let keep = false
    let tempNumber = ''
    let keptNumbers = []

    for (let i = 0; i < data.length / (data.search('\r') + 1 ); i++) {
        for(let j = 0; j < data.search('\r'); j++){
            if((tiles[i][j].type != 'number' || j == 0) && tempNumber != '' && keep){
                keptNumbers.push(tempNumber)
                keep = false
            }
            if(tiles[i][j].type != 'number' || j == 0){
                tempNumber = ''
            }
            if(tiles[i][j].type == 'number'){
                tempNumber = tempNumber + tiles[i][j].value
                if(tiles[i][j].part){
                    keep = true
                }
            }
        }
    }

    return keptNumbers
}