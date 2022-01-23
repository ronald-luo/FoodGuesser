/* JS for McHacks January 21-23, 2022 */
/* Title: FoodGuesser 2022 */
/* Written by: Dominic Ma, Ronald Luo */
/* GitHub: https://github.com/6okujins, https://github.com/ronald-luo/ */

let arr;
let countryName;
let foodName;

let hash = {
    "Canada" : ['poutine', 'nanaimo bar', 'maple syrup', 'Tim Horton\'s', 'Ketchup Chips', 'Coffee Crisp', 'Butter Tart'],
    "United States of America" : ['French Fries', 'Hamburger', 'Chocolate Chip Cookies', 'Chicken and Waffles', 'Hot Dogs', 'Twinkies', 'Nachos', 'Potato Chip', 'Spaghetti and Meatballs', 'Coca Cola'],
    "China" : ['Tomato Egg', 'Har Gow', 'Spring Rolls', 'Peking Duck', 'Dumplings', 'Char Siu', 'Mapo Tofu', 'Won Ton', 'Chow Mein', 'Moon Cake'],
    "Japan" : ['Ramen', 'Sushi', 'Takoyaki', 'Okonomiyaki', 'Yakisoba', 'Tempura', 'Dango', 'Natto', 'Ramune', 'Kompeito'],
    "South Korea" : ['Kimchi', 'Bibimbap', 'Ddeokbokki', 'Shin Ramyun', 'Japchae', 'Soju', 'Dalgona Coffee', 'Kimchi Jjigae', 'Jjajang Myeon', 'Gamjatang'],
    "Mexico" : ['Churros', 'Burrito', 'Quesadilla', 'Taco', 'Tamales', 'Enchilada', 'Guacamole', 'Salsa', 'Empanada'],
    "United Kingdom" : ['Black Pudding', 'Jellied Eel', 'Fish and Chips', 'Shepherd\'s Pie', 'Pie and Mash', 'English Fry Up', 'Sausage Roll', 'Beef Wellington', 'Haggis', 'Eton Mess', 'Yorkshire Pudding' ],
    "Jamaica" : ['Ackee and Saltfish', 'Jerk Chicken', 'Jamaican Patty', 'Rice and Peas', 'Curry Goat', 'Oxtail' ],
    "India" : ['Naan', 'Butter Chicken', 'Chicken Tikka Masala', 'Tandoori Chicken', 'Samosa', 'Pani puri', 'Dosa'],
    "Italy" : ['Pizza', 'Lasagna', 'Risotto', 'Tiramisu', 'Ravioli', 'Gnocchi', 'Salami']
};

/* Select a random food from a Country */
/* Input: obj of countries and their foods as arrays */
/* Output: array of random foodName and corresponding countryName*/
const selectFood = function(data) {
    // console.log('selectFood')
    const countries = Object.keys(data)
    const country = countries[ Math.floor( Math.random() * countries.length ) ]
    const foods = data[country]
    const food = foods[ Math.floor( Math.random() * foods.length )]
    return [food, country]
};

/* Select image corresponding to a food */
/* input: Name of food as a string */
/* Output: src url for image element */
const updateImage = function(foodName) {
    // console.log('updateImage')
    const endpoint = `/api/${foodName}`
    fetch(endpoint, {
        method: 'get',
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        const img = document.querySelector('img')
        img.src = data.src
        console.log(data.src)
    })
    .catch(err => console.log(err))
};

/* Updates the h2 element under the photo */
/* Input: str foodName*/
/* Output: No output */
const updateText = function(food) {
    // console.log('updateText')
    document.querySelector('h2.foodName').textContent = food
};

/* Compare country that user selected with country of food element */
/* Input: (1) Str guess of user and (2) Str country of origin */
/* Output: Boolean expression */
const compareGuess = function(user, computer) {
    // console.log('compareGuess')
    return user === computer
};

/* Render an informative card after the player guesses */
/* Input: str userCountryGuess and str countryName */
/* Output: No output */
const renderCard = function(user, computer) {
    // console.log('renderCard')
    let card = document.createElement('div')
    card.classList.add('answer-card')
    card.innerHTML = `

        <div>
            <h3>Your guess was: </h3>
            <h3>${user}</h3>
        </div>

        <div>
            <h3>The correct answer: </h3>
            <h3>${computer}</h3>
        </div>

    `
    document.body.appendChild(card)
    
    setTimeout(() => {
        document.body.removeChild(card)
    }, 2000)
};

/* Increase the score if the player gets the country correct */
/* Input: No input */
/* Output: No output */
const updateScore = function() {
    // console.log('updateScore')
    const score = document.querySelector('.player-score')
    let temp = score.textContent.split(' ')
    temp[1] = Number(temp[1])
    temp[1] += 1
    score.textContent = temp.join(' ')
};


/* Selects a new food, updating the corresponding text and image */
/* Input: No input */
/* Output: No output */
const main = (function() {
    // console.log('main')
    arr = selectFood(hash)
    countryName = arr[1]
    foodName = arr[0]
    updateText(foodName)
    updateImage(foodName)
});

main() // Run on initial load