const previousOperationText = document.querySelector("#previous-operation") //para usar a mesma função/layout do html #previous-operation, ou seja, trazer o mesmo resultado
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button") //para quando clicar no botao do html, vir pro js executar tambem, por ex, linkar de lá pra cá

//logica da calculadora
class Calculator {
    //usado para especificar as diferenças
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText //já ta na tela
        this.currentOperationText = currentOperationText //já ta na tela
        this.currentOperation = "" //tá digitando agora
    }

    //adicionar digito dos botoes na tela
    addDigit(digit) {
        //conferir se a operação já tem "."
        //se na operação já houver ponto e eu tentar incluir ponto mais uma vez volta, nao aceita
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    //adicionando as operações +, -, *, /
    processOperation(operation) {
        //checando se o valor debaixo está vazio, se nao tem nada selecionado
        if (currentOperationText.innerText === "" && operation !== "C") {
            if (this.currentOperationText !== "") {   //se o resultado também estiver vazio nao precisa trocar a operação, retorna
                //se chegar até aqui, ou seja, se houver resultado vai mudar a operação
                this.changeOperation(operation)
            }
            return
        }

        //pegar o valor atual e o valor anterior
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0] //pegando o que já havia sido clicado, selecioando. split usado para somar, tirando o espaço do $ no jogando o valor pra cima e substituindo por 0
        const current = +this.currentOperationText.innerText //passando pra operação numérica

        switch (operation) { //verificar operação
            case "+":
                operationValue = previous + current //valor que tá em cima + valor selecionado
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current //valor que tá em cima - valor selecionado
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current //valor que tá em cima / valor selecionado
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current //valor que tá em cima * valor selecionado
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperator() //deletar o ultimo valor digitado
                break
            case "CE":
                this.processCleanCurrentOperation() //deletar todos os valores digitados
                break
            case "C":
                this.processClearOperation() //deletar tudo
                break
            case "=":
                this.processEqualOperator() //=
                break
            default:
                return

        }
    }


    //trocar valores da tela
    updateScreen( //todos estão começando vazios
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation //colocar os numeros da seleção atual (botao clicado) na tela
        } else {
            // checar se o valor é zero, se for zero é só adicionar o valor selecionado
            if (previous === 0) {
                operationValue = current
            }

            //jogar o valor pra cima
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    //trocar as operações
    changeOperation(operation) {
        const mathOPerations = ["*", "/", "+", "-"] //selecionando quais são as operações matemáticas

        //checando se a operação matemática está inclusa aqui 
        if (!mathOPerations.includes(operation)) {
            return
        }

        //slice usado para retirar o último caractere(operação) e colocar o novo operador da função
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }
    //deletar o ultimo valor digitado
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //deleter todos os valores digitados
    processCleanCurrentOperation() {
        this.currentOperationText.innerText = ""
    }

    //deletar todos os valores
    processClearOperation() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""

    }
    //resultado final = 
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

//eventos para fazer a calculadora funcionar
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => { //pega o valor do botao que a pessoa clicou, o texto. e = botao clicado

        const value = e.target.innerText //valor é igual ao valor do botao selecionado. valor = resultado do botao

        //se o botao que foi clicado nao for um numero, traz a operação desejada
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        }
        else {
            calc.processOperation(value)
        }
    })
}) //