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
        const buttonDiv = document.createElement("div");
        buttonDiv.innerHTML = `
        <button class="btn" onClick = "loadSpecificButton('${categoryName.category_id}')">${categoryName.category_name}</button>
        `;
        categoriesContainer.appendChild(buttonDiv);
    })
}

const loadSpecificButton = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const specificButton = await res.json();
        console.log(specificButton);
    }
    catch (error) {
        console.log(error);
    }
}

loadCategoryType();