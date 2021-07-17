'use Strict'
let recipeArray = getRecipeLs()
const hash = location.hash.substr(1)

const currentRecipe = recipeArray.find((item) => {
    return item.id === hash
})

if(currentRecipe === undefined) {
    location.assign('./index.html')
}
// Listening for Remove Recipe Button Click
document.getElementById('btn-2').addEventListener('click',() => {
    removeRecipe(hash, recipeArray)
    addRecipeLs(recipeArray)
})


// Saving Data to localstorage And updating title (TITLE) (STEPS)
const recipeTitle = document.getElementById('recipe-title')
const stepsBody = document.getElementById('recipe-steps')

recipeTitle.addEventListener('input', (e) => {
    currentRecipe.title = e.target.value
    addRecipeLs(recipeArray)
})

const renderTitleSteps = (currentRecipe) => {
    if(currentRecipe.title !== 'Unnamed Recipe') {
        recipeTitle.value = currentRecipe.title
    }
    stepsBody.value = currentRecipe.steps
}
renderTitleSteps(currentRecipe)

stepsBody.addEventListener('input', (e) => {
    currentRecipe.steps = e.target.value
    addRecipeLs(recipeArray)
})

//reRendering the Ingridients After Removal
const reRender = () => {
    calculateStatus(currentRecipe)
    addRecipeLs(recipeArray)
    renderIngridients(currentRecipe.ingridients, recipeArray)
    
}

// Listning for ingridient submit Event
document.getElementById('ingridients-form').addEventListener('submit', (e) => {
    e.preventDefault()
    AddNewIngridients(currentRecipe, {
        name:e.target.ingridient.value,
        check: false
    })
    reRender()
    e.target.ingridient.value = ''
})

window.addEventListener('storage', (e) => {
    recipeArray = JSON.parse(e.newValue)
   const newRecipe = recipeArray.find(item => item.id === hash)
   renderTitleSteps(newRecipe)
   renderIngridients(newRecipe.ingridients, recipeArray)
   
})

document.querySelector('.home').addEventListener('click', () => {
    location.assign('/index.html')
})

renderIngridients(currentRecipe.ingridients, recipeArray)


    