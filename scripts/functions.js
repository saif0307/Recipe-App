'use strict'
// Render recipe's to DOM
const renderRecipe = (recipeArray, searchText = '') => {
    const recipeDiv = document.getElementById('recipe-array')
    recipeDiv.innerHTML = ' '
    const filteredRecipe = recipeArray.filter((recipe) => {
        return recipe.title.toLowerCase().includes(searchText.toLowerCase().trim())
    })

    filteredRecipe.forEach((recipe) => {
    const renderA = document.createElement('a')    
    const renderDiv = document.createElement('div')
    const titleEl = document.createElement('p')
    const statusEl = document.createElement('p')
    

    titleEl.textContent = recipe.title
    renderA.setAttribute('href', `../edit.html#${recipe.id}`)
    statusEl.textContent = recipe.status
    renderDiv.appendChild(titleEl)
    renderDiv.appendChild(statusEl)
    renderA.appendChild(renderDiv)
    recipeDiv.appendChild(renderA)
   })

}

// Get recipe from localStorage
const getRecipeLs = () => {
    const lsArray = localStorage.getItem('recipes')
    if (lsArray !== null) {
        return JSON.parse(lsArray)
    }
    return [] 
}

// Add and update recipes to local storage
const addRecipeLs = (recipeArray) => {
    const jsonArray = JSON.stringify(recipeArray)
    localStorage.setItem('recipes', jsonArray)

}
// remove From LocalStorage
const removeRecipe = (hash, recipeArray) => {
    const index = recipeArray.findIndex((recipe) => {
        return  recipe.id === hash
    })
    if(index !== -1) {
        recipeArray.splice(index, 1)
    }
    location.assign('./index.html')
}

// Rendering Ingridients TO DOM
const renderIngridients = (ingridients) => {
    const ingridientsMainEl = document.getElementById('ordered-list')
    ingridientsMainEl.innerHTML = ''
    ingridients.forEach((item, index) => {
        const ingridientIndvidual = document.createElement('li')
        const ingridientEl = document.createElement('span')
        const checkboxEl = document.createElement('input')
        const removeEl = document.createElement('button')

        ingridientEl.textContent = item.name
        checkboxEl.checked = item.check

        removeEl.addEventListener('click', () => {
            ingridients.splice(index, 1)
            reRender()

        })
        checkboxEl.setAttribute('type', 'checkbox')

        checkboxEl.addEventListener('change', (e) => {
            item.check = e.target.checked
            reRender()
        })
        removeEl.innerHTML = "remove"

        ingridientIndvidual.appendChild(checkboxEl)
        ingridientIndvidual.appendChild(ingridientEl)
        ingridientIndvidual.appendChild(removeEl)
        ingridientsMainEl.appendChild(ingridientIndvidual)

    })
}

// Add Ingridient To DOM and Localstorage
const AddNewIngridients = (recipe, ingridient) => {
    let already = false
    recipe.ingridients.forEach((item) => {
        if(item.name.toLowerCase() === ingridient.name.toLowerCase()) {
            alert('Ingridient already in list')
            already = true
        }
    })
    if(!already) {
        recipe.ingridients.push(ingridient)
    }
}

// Calucalting ingridients Status
const calculateStatus = (recipe) => {
    let status = ''

    if(recipe.ingridients.every(item =>  item.check === true)){
        status = 'You have all the ingridients'
    }else if(recipe.ingridients.every(item =>  item.check === false)) {
        status = 'You dont have any ingridients'
    }else {
        status = 'You have some of the ingridients'
    }
    recipe.status = status
}




