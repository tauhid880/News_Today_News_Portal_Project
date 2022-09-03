const loadNewsCategory = async() => {
   const url =`https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
  displayNewsCategorys(data.data.news_category);
}

const displayNewsCategorys = newsCategorys => {
   const newsContainer = document.getElementById('news-container');
    newsCategorys.forEach(category => {
        const newsDiv = document.createElement('ul');
        newsDiv.classList.add('li');
        newsDiv.innerHTML = `<li class="nav-item menu lg:menu-horizontal md:menu-horizontal menu-vertical lg:text-xl lg:font-semibold">
        <a class="nav-link mt-5" href="#">${category.category_name}</a>
        </li>`;
        newsContainer.appendChild(newsDiv);
    });
} 

loadNewsCategory();
 