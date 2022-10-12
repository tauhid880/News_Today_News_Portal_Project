//  নিউস ক্যাটাগরি  লোড করলাম
const loadNewsSectionCategory = () => {
  showSpinner(true);
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((categories) =>
      displayNewsSectionCategories(categories.data.news_category)
    );
};

// নিউস ক্যাটাগরি ডিসপ্লে করলাম
const displayNewsSectionCategories = (newsSectionCategories) => {
  showSpinner(false);
  // console.log(newsSectionCategories);
  const categoryContainer = document.getElementById("category-container");
  newsSectionCategories.forEach((singleNewsSection) => {
    // console.log(singleNewsSection);
    const newsList = document.createElement("li");
    newsList.innerHTML = singleNewsSection.category_name;
    newsList.setAttribute(
      "onclick",
      `loadSingelCategory("${singleNewsSection.category_id}")`
    );
    newsList.classList.add(
      "btn",
      "btn-outline",
      "mb-5",
      "lg:mb-0",
      "border-none",
      "font-mono",
      "text-lg"
    );
    categoryContainer.appendChild(newsList);
  });
};

// ইন্ডিভিজুয়্যাল নিউস ক্যাটাগরি লোড করলাম

const loadSingelCategory = (categoryId) => {
  showSpinner(true);
  const categoriSec = document.getElementById("category-content");
  const categoriesCount = document.getElementById("categories-count");
  const errorMessage = document.getElementById("error-message");
  // categoriesCount.innerText = "";
  categoriesCount.style.display = "none";
  // categoriSec.innerHTML = "";
  // errorMessage.innerText = "";

  let url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  // console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data))
    .catch((err) => console.log(err));
};

const displayNews = (category) => {
  showSpinner(false);
  // console.log(category);
  const categoryContentSec = document.getElementById("category-content");
  //  cleare the old data
  categoryContentSec.innerHTML = "";
  if (category?.length <= 0) {
    const errorMessage = document.createElement("div");
    errorMessage.innerHTML = `<h1 class = "text-3xl font-bold text-center">No Data Found</h1>`;
    categoryContentSec.appendChild(errorMessage);
    return;
  }
  const categoriesCount = document.getElementById("categories-count");
  categoriesCount.style.display = "block";
  categoriesCount.innerHTML = `<p class = " mt-5 text-3xl font-bold text-center">${category.length} items found</P>`;
  category.sort((a, b) => b.total_view - a.total_view);

  category.forEach((news) => {
    const { _id, thumbnail_url, title, details, total_view, author } = news;
    const newsDetail = details.slice(0, 500);
    const dots = details.length > 500 ? "..." : "";
    categoryContentSec.innerHTML += `<div class="card my-5 lg:card-side bg-indigo-200 shadow-md shadow-slate-600">
          <figure class="">
            <img class="max-w-full h-auto lg:m-0 mt-5" src="${thumbnail_url}" alt="Album" />
          </figure>
          <div class="card-body p-5">
            <h2 class="card-title">${title}</h2>
            <p>${newsDetail}${dots}</p>
            <div class="grid lg:grid-cols-4 grid-rows-2 gap-4 items-center">
              <div class="flex flex-cols-2 gap-3 items-center">
                <div>
                  <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                      <img src="${author.img}" />
                    </div>
                  </label>
                </div>
                <div>
                  <p class=" font-lg font-semibold text-black">${
                    author.name ||
                    '<h4 class="text-red-500 font-bold">Name not found</h4>'
                  }</p>
                  <p class = "text-gray-500">${
                    author.published_date ||
                    '<h4 class="text-red-500 font-bold">Date not found</h4>'
                  }</p>
                </div>
              </div>
              <div class="flex flex-cols-2 gap-3 items-center font-bold text-indigo-900">
                <i class="fa-solid fa-eye"></i>
                <h1>Total view : ${
                  total_view ||
                  '<h4 class="text-red-500 font-bold">Data not found</h4>'
                }</h1>
              </div>
              <div class = "text-yellow-600">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star-half-stroke"></i>
                <i class="fa-regular fa-star-half-stroke"></i>
              </div>
          <label for="my-modal" onclick = "loadSingleNews('${_id}')" class="btn w-2 btn-outline modal-button text-xl text-black border-none hover:bg-indigo-500"><i class="fa-solid fa-right-long"></i></label>
          </div>
        </div>`;
  });
};

// ----------  -----------

const loadSingleNews = (id) => {
  const newsDetails = document.getElementById("news-details");
  const newsTitle = document.getElementById("news-title");
  // const newsImg = document.getElementById("news-img");
  let url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showSingleNewsDetails(data.data))
    .catch((err) => console.log(err));
};

const showSingleNewsDetails = (singleNewses) => {
  singleNewses.forEach((newses) => {
    const { author, details, image_url, rating, title, total_view } = newses;
    const newsDetails = document.getElementById("news-details");
    const newsTitle = document.getElementById("news-title");
    const newsImg = (document.getElementById("news-img").src = `${image_url}`);
    newsTitle.innerHTML = `<h1 class ="my-5">${title}</h1>`;
    newsDetails.innerHTML = `
            <h4 class="my-2 font-bold text-lg">Author Name : <span>${
              author.name ||
              '<h4 class="text-red-500 font-bold">Name not found</h4>'
            }</span></h4>
            <div><p>${details}</p></div>
            <h6 class = "font-semibold text-md mt-3">Total view : ${
              total_view ||
              '<h4 class="text-red-500 font-bold">Data not found</h4>'
            }</h6>
            <h6 class = "font-semibold text-md text-yellow-500 mt-3">Rating : ${
              rating.number
            }</h6>
  `;
  });
};

const showSpinner = (isLoading = false) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.add("block");
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
    spinner.classList.remove("block");
  }
};

loadNewsSectionCategory();
