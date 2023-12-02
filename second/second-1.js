const fs = require('fs')

fs.readFile('second.txt', 'utf8', (err, data) => {
    const validRed = 12
    const validGreen = 13
    const validBlue = 14
    let roundRed, roundGreen, roundBlue, gameRed, gameGreen, gameBlue, gameID = 0, sum = 0
    let validGameIDs = []

    if (err) {
        console.error(err)
        return;
      }

    for(let i = 0; i < data.length; i++){
        switch(data.charAt(i)){
            case(':'):
                if(gameRed < roundRed){
                    gameRed = roundRed
                }
                if(gameGreen < roundGreen){
                    gameGreen = roundGreen
                }
                if(gameBlue < roundBlue){
                    gameBlue = roundBlue
                }
                if(validRed >= gameRed && validGreen >= gameGreen && validBlue >= gameBlue){
                    validGameIDs.push(gameID)
                }
                roundRed = 0, roundGreen = 0, roundBlue = 0
                gameRed = 0, gameGreen = 0, gameBlue = 0
                gameID++
                break
            case(';'):
                if(gameRed < roundRed){
                    gameRed = roundRed
                }
                if(gameGreen < roundGreen){
                    gameGreen = roundGreen
                }
                if(gameBlue < roundBlue){
                    gameBlue = roundBlue
                }
                roundRed = 0, roundGreen = 0, roundBlue = 0
                break
            case('r'):
                if(data.charAt(i - 1) == ' '){
                    if(data.charAt(i - 3) == ' '){
                        roundRed = roundRed + Number(data.charAt(i - 2))
                    } else {
                        roundRed = roundRed + Number(data.charAt(i - 3) + data.charAt(i - 2))
                    }
                }
                break
            case('g'):
                if(data.charAt(i - 1) == ' '){
                    if(data.charAt(i - 3) == ' '){
                        roundGreen = roundGreen + Number(data.charAt(i - 2))
                    } else {
                        roundGreen = roundGreen + Number(data.charAt(i - 3) + data.charAt(i - 2))
                    }
                }
                break
            case('b'):
                if(data.charAt(i - 1) == ' '){
                    if(data.charAt(i - 3) == ' '){
                        roundBlue = roundBlue + Number(data.charAt(i - 2))
                    } else {
                        roundBlue = roundBlue + Number(data.charAt(i - 3) + data.charAt(i - 2))
                    }
                }
                break
            default:
        }
        if(i == data.length - 1){
            if(gameRed < roundRed){
                gameRed = roundRed
            }
            if(gameGreen < roundGreen){
                gameGreen = roundGreen
            }
            if(gameBlue < roundBlue){
                gameBlue = roundBlue
            }
            if(validRed >= gameRed && validGreen >= gameGreen && validBlue >= gameBlue){
                validGameIDs.push(gameID)
            }
        }
    }

    for(let i = 0; i < validGameIDs.length; i++){
        sum = sum + validGameIDs[i]
    }
    console.log(validGameIDs)
    console.log(sum)
})