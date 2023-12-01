const fs = require('fs')
let digits = []
let sum = 0

fs.readFile('first/first.txt', 'utf8', (err, data) => {
    let tempDigits = []

    if (err) {
      console.error(err)
      return;
    }

    for(let i = 0; i < data.length; i++){
        switch(data.charAt(i)){
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
                tempDigits.push(data.charAt(i))
                break
            case('\n'):
                digits.push(tempDigits[0] + tempDigits[tempDigits.length-1])
                tempDigits = []
                break
            default:
        }
        if(i == data.length - 1){
            digits.push(tempDigits[0] + tempDigits[tempDigits.length-1])
        }
    }
    
    for(let i = 0; i < digits.length; i++){
        sum = sum + Number(digits[i])
    }

    console.log(sum)
})