const loadNewsCategory = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategorys(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

const displayNewsCategorys = (newsCategorys) => {
  const newsContainer = document.getElementById("category-container");
  newsCategorys.forEach((category) => {
    const newsDiv = document.createElement("ul");
    newsDiv.classList.add("li");
    newsDiv.innerHTML = `<li  class="nav-item menu lg:menu-horizontal md:menu-horizontal menu-vertical lg:text-xl lg:font-semibold">
        <a onclick="openCategory('${category.category_id}')" class="nav-link mt-5" href="#">${category.category_name}</a>
        </li>`;
    newsContainer.appendChild(newsDiv);
  });
};

const openCategory = (categoryId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (data) => {
  const categoryContent = document.getElementById("category-content");
  //  cleare the old data
  categoryContent.innerHTML = "";
  if (data?.length <= 0) {
    const errorMessage = document.createElement("div");
    errorMessage.innerHTML = `<h1>No Data Found</h1>`;
    categoryContent.appendChild(errorMessage);
    return;
  }
  data.forEach((news) => {
    categoryContent.innerHTML += `<div class="card m-5 lg:card-side bg-base-100 shadow-xl">
  <figure><img src="${news.thumbnail_url}" alt="Album"></figure>
  <div class="card-body">
    <h2 class="card-title">${news.title}</h2>
    <p>${news.details}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Listen</button>
    </div>
  </div>
       </div>`;
  });
};

loadNewsCategory();
