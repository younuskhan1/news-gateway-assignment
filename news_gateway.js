
const loadCategoryType = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const category = await res.json();
        const categoryName = category.data.news_category;
        displayCategoryName(categoryName);
    }
    catch (error) {
        console.log(error);
    }
}

const categoriesContainer = document.getElementById("category-name");

const displayCategoryName = (categoryNames) => {
    // console.log(categoryNames);
    categoryNames.forEach((categoryName) => {
        // console.log(categoryName);
        const buttonDiv = document.createElement("div");
        buttonDiv.innerHTML = `
        <button class="category-button mb-4 lg:w-auto md:w-[160px] w-[220px]" onClick = "loadSpecificButton('${categoryName.category_id}')">${categoryName.category_name}</button>
        `;
        categoriesContainer.appendChild(buttonDiv);

        // the buttons have been active by below codes 
        // To do button active, I used forEach to do loop but 
        // the code do not work while using forEach for that 
        // reason I used here normal for loop. 

        const categoryButtons = document.getElementsByClassName("category-button");
        for (let buttons of categoryButtons) {
            buttons.addEventListener("click", function (event) {
                event.stopImmediatePropagation();
                for (let bttn of categoryButtons) {
                    bttn.classList.remove("active");
                    this.classList.add("active");
                }
            })
        }
    })
}

const loadSpecificButton = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const categoryWiseNews = await res.json();
        // console.log(categoryWiseNews);

        displayCategoryWiseNews(categoryWiseNews);
    }
    catch (error) {
        console.log(error);
    }
}

let categoriesName;
const numberOfNews = document.getElementById("number-of-news");

const displayCategoryWiseNews = (categoryNews) => {
    // console.log(categoryNews);

    const categoryId = categoryNews.data[0] ? categoryNews.data[0].category_id : "not available";

    if (categoryId === "01") {
        categoriesName = "Breaking News";
    }
    else if (categoryId === "02") {
        categoriesName = "Regular News";
    }
    else if (categoryId === "03") {
        categoriesName = "International News";
    }
    else if (categoryId === "04") {
        categoriesName = "Sports";
    }
    else if (categoryId === "05") {
        categoriesName = "Entertainment";
    }
    else if (categoryId === "not available") {
        categoriesName = "Culture";
    }
    else if (categoryId === "07") {
        categoriesName = "Arts"
    }
    numberOfNews.innerText = `${categoryNews.data.length} items found for category of ${categoriesName}`;

    const carddContainer = document.getElementById("card-container");
    const noMessageFound = document.getElementById("no-message-found");
    carddContainer.innerHTML = "";
    const cardsData = categoryNews.data;
    // console.log(cardsData);
    if (cardsData.length === 0) {
        noMessageFound.classList.remove("hidden");
    } else {
        noMessageFound.classList.add("hidden");
    }
    cardsData.forEach((cardData) => {
        console.log(cardData);
        const cardDiv = document.createElement("div");
        cardDiv.classList = `mb-5`;
        cardDiv.innerHTML = `
        <div class="h-[250px] flex gap-5 p-3 border border-orange-400 bg-white rounded-lg">
            <div class="w-[25%]"><img class="w-[100%] h-[100%] mb-5" src="${cardData.thumbnail_url}" alt=""></div>
            <div class="w-[75%]">
                <h1 class="font-extrabold mb-3">${cardData.title}</h1>
                <p class="text-[#949494] text-sm">${(cardData.details).slice(0, 350)} <span class="text-xl">&#x2026;</span> </p>
                </div>
                </div>
            <div>
        </div>
        
        `;
        carddContainer.appendChild(cardDiv);
    })


}


loadCategoryType();