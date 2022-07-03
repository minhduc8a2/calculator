
function calculatorMachine(options) {
    const getElement = document.querySelector.bind(document);
    const getElementsList = document.querySelectorAll.bind(document);
    const DisplayElement = getElement(options.display);
    const KeyElementList = getElementsList(options.keys);
    let firstValueString="";
    let operatorString="";
    let secondValueString="";
    let resultValueString="";

    function HandleKeyEvents(){
        for(let key of KeyElementList){
            key.onclick = (e) => {
                let keyType = getKeyType(key);
                
                let keyValue = key.innerText;
                let insertedValue = insertValue(keyType,keyValue);
                
                resultValueString = calculate(keyType,keyValue);
                DisplayElement.innerText = resultValueString? resultValueString : insertedValue? insertedValue : secondValueString? secondValueString : firstValueString ? firstValueString:0  ;

                console.log("first : "+firstValueString,"operator: "+operatorString,"second: "+secondValueString,"result: "+resultValueString);
            }
        }
    }
    function insertValue(keyType,keyValue){
        
        if(firstValueString=='' ){
            if(keyType=='decimal' ) {
                firstValueString='0.';
                return firstValueString;
                
            }
            if(keyType=='number' ) {
                firstValueString = keyValue;
                return firstValueString;
            }
            if(keyValue=='-'){
                firstValueString='-';
                return firstValueString;
                
            }
            return;
        }
        if(resultValueString){
            if(keyType=='decimal' ) {
                firstValueString='0.';
                resultValueString ="";
                operatorString="";
                console.log('in insert result')
                return firstValueString;
                
            }
            if(keyType=='number' ) {
                firstValueString = keyValue;
                resultValueString ="";
                operatorString="";
                console.log('in insert result')
                return firstValueString;
                
            }
            
        }
        if(operatorString==''){

            if(keyType=='number' || (keyType=='decimal' && !firstValueString.includes('.')) ) {
                firstValueString += keyValue;
                return firstValueString;
            }
            if(keyType=='operator' && !Number.isNaN(parseFloat(firstValueString))) {
                operatorString = keyValue;
                return;
            }
        }
        
        if(secondValueString==''){
            if(keyType=='number') {
                secondValueString = keyValue;
                return secondValueString;
            }
            if(keyType=='decimal') {
                secondValueString='0.'; 
                return secondValueString;
            }
            return
        }
        if(keyType=='number'|| (keyType=='decimal' && !firstValueString.includes('.'))) {
            secondValueString += keyValue;
            return secondValueString;
        }
        
    }
    function getKeyType(key){
        switch (key.dataset.action){
            case 'sum':
            case 'subtract':
            case 'multiply':
            case 'divide':
                return 'operator';
            case 'decimal':
                return 'decimal';
            case 'clear':
                return 'clear';
            case 'calculate':
                return 'calculate';
            default: 
                return 'number';
        }
    }
    function calculate(keyType,keyValue){
        if(keyType=='clear'){
            firstValueString = "";
            secondValueString="";
            operatorString="";
           
            return "";
        }
        if(keyType=='calculate' || keyType=='operator'){
            if(firstValueString && operatorString && secondValueString){
                let firstValue = parseFloat(firstValueString);
                let secondValue = parseFloat(secondValueString);
                let result = 0;
                switch (operatorString){
                    case '+': result= (firstValue+secondValue).toFixed(2);
                                break;
                    case '-': result= (firstValue-secondValue).toFixed(2);
                                break;
                    case 'x': result= (firstValue*secondValue).toFixed(2);
                                break;
                    case ':': result= (firstValue/secondValue).toFixed(2);
                                break;
                }
                if(Number.isInteger(firstValue)&&Number.isInteger(secondValue)) {
                    result = Math.floor(result);
                }
                console.log("in calculate");
                firstValueString = result + "";
                secondValueString = "";
                operatorString = "";
                if(keyType=="operator"){
                    operatorString = keyValue;
                }
                
                return result + "";
            }
            else 
            if(firstValueString && !operatorString && keyType=='calculate'){
                return firstValueString;
            }

        }

        return "";
    }
    function startCalculator(){
        HandleKeyEvents();
    }
    startCalculator();
}