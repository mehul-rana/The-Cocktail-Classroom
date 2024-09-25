document.querySelector('#getDrink').addEventListener('click', getDrink)
document.querySelector('#nextDrink').addEventListener('click', nextDrink)
document.querySelector('#previousDrink').addEventListener('click', previousDrink)

let i = 0
let drinksLen;
function getDrink(){

  let drink = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      // Test to see if you get any data back from the server
      console.log(data)
      console.log(data.drinks[i])
      // Set up a variable to hold data.drinks.length
      drinksLen = data.drinks.length;
      document.querySelector('h2').innerText = data.drinks[i].strDrink
      document.querySelector('img').src = data.drinks[i].strDrinkThumb
      document.querySelector('h3').innerText = data.drinks[i].strInstructions

      // let properties = [] --> might not need this
      // let values = [] --> might not need this
      let ingredientsArr  = []
      // if(i == data.drinks.length) { i = 0;} - not sure if this is needed but delete once finalized
      for(const property in data.drinks[i]){ // for(const Thing in setofThings)
        // properties.push(property)
        // values.push(data.drinks[i][property]);
        if(property.includes('Ingredient') && data.drinks[i][property] !== null) {
          ingredientsArr.push(data.drinks[i][property]);
        }
      }
      const ingredientEl = document.getElementById('ingredients')
      console.log(ingredientsArr) // this is just to see the ingredients, not necessarily needed
      let htmlStr = '';
      for(let j = 0; j < ingredientsArr.length; j++){
        htmlStr += `<li>${ingredientsArr[j]}</li>`
      }
      ingredientEl.innerHTML = htmlStr;
      document.querySelector('span').innerText = data.drinks[i].strAlcoholic
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}


function nextDrink(){
  i++
  if(i == drinksLen) i = 0;
  getDrink()
}

function previousDrink(){
  i--
  if(i < 0){
    i = drinksLen - 1
  }
  getDrink()
}
