//grab all element required for dom manipulation
document.addEventListener('DOMContentLoaded', ()=>{

    const searchButton = document.getElementById('search-btn');
    const mealLists = document.getElementById('meal');
    const mealDetails = document.querySelector('.meal-details-content');
    const recipeCloseButton = document.getElementById('recipe-close-btn');
    //event listener
    searchButton.addEventListener('click', getMealLists);
    mealLists.addEventListener('click', getRecipe);
    recipeCloseButton.addEventListener('click', () => {
        mealDetails.parentElement.classList.remove('showRecipe');
    });
    
    function getMealLists(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            //declare variable to store my data
            let myData = "";
            if(data.meals){
                data.meals.forEach(meal => {
                    myData += `
                        <div class = "meal-item" data-id = "${meal.idMeal}">
                            <div class = "meal-img">
                                <img src = "${meal.strMealThumb}" alt = "food">
                            </div>
                            <div class = "meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href = "#" class = "recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealLists.classList.remove('notFound')
               
            } else{
                myData= "oops no meal match this!";
                mealLists.classList.add('notFound');
            }
    
            mealLists.innerHTML = myData;
        });
    }
        //get meal recipe
        function getRecipe(e){
            e.preventDefault()
            if(e.target.classList.contains('recipe-btn')){
                let mealItems = e.target.parentElement.parentElement;
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItems.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipe(data.meals));
        }
    }
    function mealRecipe(meal){
        console.log(meal);
        meal=meal[0];
        let myMeal = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetails.innerHTML =myMeal;
    mealDetails.parentElement.classList.add('showRecipe');
    }
    
    })