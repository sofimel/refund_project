//seleciona os elementos do formulário
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")

//seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")

const totalExpense = document.querySelector("aside header h2")


//captura o evento de input para formatar o valor
amount.oninput = () =>{
    let value = amount.value.replace(/\D/g, "")

    value = Number(value)/100

    amount.value = formatCurrencyBRL(value)

}
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value

}
//captura o evento de submit do formulario
form.onsubmit = (event) =>{
    event.preventDefault()
//cria um novo objeto para a despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    addExpense(newExpense)
}
function addExpense(newExpense){
    try{
        //cria o elemento para adicionar o item na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //cria o ícone da categoria
        const expenseIcon = document.createElement("img")//cria o elemento imagem
        expenseIcon.setAttribute(//define o atributo do elemento imagem
        "src", //source
        `img/${newExpense.category_id}.svg`//caminho do arquivo
        )
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //cria o nome da despesa

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //cria a categoria da despesa

        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.toUpperCase().replace("R$", "")
        }`

        //cria o icone de remover
        const deleteIcon = document.createElement("img")
        deleteIcon.classList.add("remove-icon")
        deleteIcon.setAttribute("src", "img/remove.svg")

        //adiciona name e category em expenseInfo

        expenseInfo.append(expenseName, expenseCategory)

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, deleteIcon)
        

        //adiciona o item na lista
        expenseList.append(expenseItem)

        //atualiza os totais

        updateTotals()

        clearForm()

    } catch (error){
        alert("Não foi possível atualizar a lista de despesas")
    }
}
function updateTotals(){
    try{

        //recupera todos os itens da lista

        const items = expenseList.children
        
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`


        //variavel para incrementar o total

        let total = 0

        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

            value = parseFloat(value)

            if(isNaN(value)){
                return alert("Não foi possível calcular o total.")
            }

        total += Number(value)

        }

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        totalExpense.innerHTML = ""

        totalExpense.append(symbolBRL, total)

    } catch (error){
        console.log(error)
        alert("Não foi possível atualizar os totais")
    }
}

expenseList.addEventListener("click", function(event){
    //verifica se o elemento clicado é o ícone de deletar
    if(event.target.classList.contains("remove-icon")){
        const item = event.target.closest(".expense")
        item.remove()
    }
    updateTotals()






})
function clearForm(){
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus()


}