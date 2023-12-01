let categoryWiseSortedDataId = "08";

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
    isNewsLoading(true);

    categoryWiseSortedDataId = id;

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const categoryWiseNews = await res.json();
        // console.log(categoryWiseNews);
        const categoryWiseNewsData = categoryWiseNews.data;
        // console.log(categoryWiseNewsData);
        displayCategoryWiseNews(categoryWiseNewsData);
    }
    catch (error) {
        console.log(error);
    }
}

let categoriesName;
const numberOfNews = document.getElementById("number-of-news");
const noMessageFound = document.getElementById("no-message-found");
const displayCategoryWiseNews = (categoryNews) => {
    // console.log(categoryNews);

    const categoryId = categoryNews[0] ? categoryNews[0].category_id : "not available";

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
    numberOfNews.innerText = `${categoryNews.length} items found for category of ${categoriesName}`;

    const carddContainer = document.getElementById("card-container");
    carddContainer.innerHTML = "";
    const cardsData = categoryNews;
    // console.log(cardsData);
    if (cardsData.length === 0) {
        noMessageFound.classList.remove("hidden");
    } else {
        noMessageFound.classList.add("hidden");
    }
    cardsData.forEach((cardData) => {
        // console.log(cardData);
        const cardDiv = document.createElement("div");
        cardDiv.classList = `mb-5`;
        cardDiv.innerHTML = `
        <div class="lg:h-[250px] md:h-[300px] h-auto flex lg:flex-row md:flex-row flex-col gap-5 p-3 bg-white rounded-lg">
            <div class="lg:w-[25%] md:w-[30%] w-[100%]"><img class="w-[100%] h-[100%] mb-5" src="${cardData.thumbnail_url}" alt=""></div>
            <div class="lg:w-[75%] md:w-[70%] w-[100%] flex flex-col justify-between">
                <div>
                    <h1 class="font-extrabold mb-3">${cardData.title}</h1>
                    <p class="text-[#949494] text-sm text-justify lg:pr-3 md:pr-1 pr-0 lg:pb-0 md:pb-0 pb-3">${(cardData.details).length > 350 ? (cardData.details).slice(0, 350) + `<span class="text-xl">&#x2026;</span>` : cardData.details}</p>
                    
                </div>
                <div class=" lg:flex md:flex lg:flex-row md:flex-row grid grid-cols-1 lg:justify-between md:justify-between lg:items-center md:items-center w-[100%] lg:pb-5 md:pb-5">
                    <div class="flex justify-center lg:pb-0 md:pb-0 pb-4">
                        <div class="mr-4"><img class="h-[40px] w-[40px] rounded-full" src="${cardData.author.img}" alt=""></div>
                        <div class="text-[13px]">
                            <p class="text-[#2B2C34]">${cardData.author.name ? cardData.author.name : "none"}</p>
                            <p class="text-[#718797]">${cardData.author.published_date ? cardData.author.published_date : "none"}</p>
                        </div>
                    </div>
                    <p class="text-[15px] text-[#515151] lg:pb-0 md:pb-0 pb-2 text-center"><span class="mr-3 lg:hidden md:hidden">Viewers :</span><i class="fa-regular fa-eye"></i><span class="ml-3">${cardData.total_view ? cardData.total_view : "none"}</span></p>
    
                    <div class="text-[#515151] lg:pb-0 md:pb-0 pb-4 text-center">
                        <span class="lg:hidden md:hidden mr-2">Ratings :  </span>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <p class="text-[25px] text-[#5D5FEF] bg-[#f7f2f2] hover:bg-[#5D5FEF] hover:text-white pl-3 rounded-lg cursor-pointer text-center" onClick="loadNewsDeails('${cardData._id}')"><i class="fa-solid fa-arrow-right mr-4"></i></p>
                </div> 

            </div>
            
        </div>
        `;
        carddContainer.appendChild(cardDiv);
    })
    isNewsLoading(false);
}

const loadNewsDeails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try {
        const response = await fetch(url);
        const data = await response.json()
        const newsData = data.data;
        displayDetailNews(newsData[0]);
    }
    catch (error) {
        console.log(error);;

    }
}

const showModalContainer = document.getElementById("detailNewsInShowModal");

const displayDetailNews = (detailNews) => {
    // console.log(detailNews);
    showModalContainer.innerHTML = `
    <dialog id="my_modal_5" class="modal">
        <div class="modal-box">
            <img class="w-full mb-5" src="${detailNews.thumbnail_url}" alt="">
            <h3 class="font-bold text-lg">${detailNews.title}</h3>
            <p class="py-4 text-justify">${detailNews.details}</p>
               <form method="dialog">
                <div class="flex justify-center mt-4"><button class="btn btn-warning outline-none">Close the Details</button></div>
               </form>
        </div>
    </dialog>
    `;
    my_modal_5.showModal();
}

const sortedDataViews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryWiseSortedDataId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const dataForSorting = data.data;
        // there is no need to use forEach to loop the array because sort()
        // is a JS' built-in-function which runs on an array to loop the element.  
        const sortedData = dataForSorting.sort((a, b) => {
            return (b.total_view) - (a.total_view);
        })
        // console.log(sortedData);
        // console.log(sortedData.map(e => e.total_view));
        displayCategoryWiseNews(sortedData);
    }
    catch (error) {
        console.log(error);
    }
}

// ********* Most Important to point out for sorting *************//

// I sent arguments to the displayCategoryWiseNews function for two times .
// firstly, to display the category wise news as we click category-wise button.
// secondly, to display the sorted data as we click the sort by view button. 
// for these two times displayCategoryWiseNews functions's received parameter's data 
// must be same format otherwise you will face an error. 
// In this project the displayCategoryWiseNews function received two 
// arguments from loadSpecificButton function for first time and 
// sortedDataViews function for second time. both arguments' format were same.
// It was mandatory to be these two arguments same otherwise you will face an
// error in the time of doing sorting data. 
// those two arguments are given below : 
// console.log(categoryWiseNewsData);
// console.log(sortedData);

const spinnerShownSection = document.getElementById("spinner-shown-section");

const isNewsLoading = (isLoading) => {
    if (isLoading) {
        spinnerShownSection.classList.remove("hidden");
    } else {
        spinnerShownSection.classList.add("hidden");
    }
}

document.getElementById("blog-button").addEventListener("click", function () {
    location.href = "blog.html";
})

loadSpecificButton("08");
loadCategoryType();



