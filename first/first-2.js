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
            case('o'):
                if(data.charAt(i + 1) == 'n'){
                    if(data.charAt(i + 2) == 'e'){
                        tempDigits.push('1')
                    }
                }
                break
            case('t'):
                if(data.charAt(i + 1) == 'w'){
                    if(data.charAt(i + 2) == 'o'){
                        tempDigits.push('2')
                    }
                }
                if(data.charAt(i + 1) == 'h'){
                    if(data.charAt(i + 2) == 'r'){
                        if(data.charAt(i + 3) == 'e'){
                            if(data.charAt(i + 4) == 'e'){
                                tempDigits.push('3')
                            }
                        }
                    }
                }
                break
            case('f'):
                if(data.charAt(i + 1) == 'o'){
                    if(data.charAt(i + 2) == 'u'){
                        if(data.charAt(i + 3) == 'r'){
                            tempDigits.push('4')
                        }
                    }
                }
                if(data.charAt(i + 1) == 'i'){
                    if(data.charAt(i + 2) == 'v'){
                        if(data.charAt(i + 3) == 'e'){
                            tempDigits.push('5')
                        }
                    }
                }
                break
            case('s'):
                if(data.charAt(i + 1) == 'i'){
                    if(data.charAt(i + 2) == 'x'){
                        tempDigits.push('6')
                    }
                }
                if(data.charAt(i + 1) == 'e'){
                    if(data.charAt(i + 2) == 'v'){
                        if(data.charAt(i + 3) == 'e'){
                            if(data.charAt(i + 4) == 'n'){
                                tempDigits.push('7')
                            }
                        }
                    }
                }
                break
            case('e'):
                if(data.charAt(i + 1) == 'i'){
                    if(data.charAt(i + 2) == 'g'){
                        if(data.charAt(i + 3) == 'h'){
                            if(data.charAt(i + 4) == 't'){
                                tempDigits.push('8')
                            }
                        }
                    }
                }
                break
            case('n'):
                if(data.charAt(i + 1) == 'i'){
                    if(data.charAt(i + 2) == 'n'){
                        if(data.charAt(i + 3) == 'e'){
                            tempDigits.push('9')
                        }
                    }
                }
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