
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
        console.log(categoryName);
        const buttonDiv = document.createElement("div");
        buttonDiv.innerHTML = `
        <button class="category-button" onClick = "loadSpecificButton('${categoryName.category_id}')">${categoryName.category_name}</button>
        `;
        categoriesContainer.appendChild(buttonDiv);
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
}

loadCategoryType();