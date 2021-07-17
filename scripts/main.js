'use strict'
let recipeArray = getRecipeLs()

//Listening for Filtering recipes input change
document.getElementById('search-recipe').addEventListener('input', (e) => {
    renderRecipe(recipeArray, e.target.value)
})
    

// listening for add Recipe Button Click
const addRecipe = document.getElementById('add-recipe')
const uniqueId = uuidv4()
addRecipe.addEventListener('click', () => {
    location.assign(`edit.html#${uniqueId}`)
    recipeArray.push({
        id: uniqueId,
        title: 'Unnamed Recipe',
        steps: '',
        status: 'You dont have any ingridients',
        ingridients: []
    })
    addRecipeLs(recipeArray)
    if(location.pathname === '/edit.html'){
        renderRecipe(recipeArray)
    }
    })


// rendering intial Dom recipes
renderRecipe(recipeArray)



