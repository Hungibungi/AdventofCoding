const fs = require('fs')

fs.readFile('fourth.txt', 'utf8', (err, data) => {
    let tempMultiplier = 0, tempNumber = -1, totalCards = 0
    let tempNumbers = []
    let WinningNumbers = []
    let MyNumbers = []
    let cardsMultiplier = []

    if (err) {
        console.error(err)
        return;
    }

    for(let i = 0; i < data.length; i++){
        switch(data.charAt(i)){
            case('\n'):
                tempNumbers.push(tempNumber)
                MyNumbers.push(tempNumbers)
                tempNumbers = []
            case(':'):
                tempNumber = -1
                break
            case('|'):
                WinningNumbers.push(tempNumbers)
                tempNumbers = []
                break
            case(' '):
                if(tempNumber != -1){
                    tempNumbers.push(tempNumber)
                }
                tempNumber = -1
                break
            case('0'):
            case('1'):
            case('2'):
            case('3'):
            case('4'):
            case('5'):
            case('6'):
            case('7'):
            case('8'):
            case('9'):
                if(tempNumber != -1){
                    tempNumber = tempNumber + data.charAt(i)
                } else {
                    tempNumber = data.charAt(i)
                }
                break
        }
        if(i == data.length - 1){
            tempNumbers.push(tempNumber)
            MyNumbers.push(tempNumbers)
        }
    }

    for(i = 0; i < WinningNumbers.length; i++){
        cardsMultiplier.push(1)
    }

    for(i = 0; i < WinningNumbers.length; i++){
        totalCards = totalCards + cardsMultiplier[i]
        tempMultiplier = 0
        for(j = 0; j < WinningNumbers[i].length; j++){
            if(MyNumbers[i].includes(WinningNumbers[i][j])){
                tempMultiplier++
            }
        }
        for(j = 1; j < tempMultiplier + 1; j++){
            let temp = cardsMultiplier[i + j]
            cardsMultiplier[i + j] = temp + (1 * cardsMultiplier[i])
        }
    }

    console.log(totalCards)
})