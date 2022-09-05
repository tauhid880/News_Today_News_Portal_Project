const loadNewsCategory = async() => {
   try{
    const url =`https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
  displayNewsCategorys(data.data.news_category);
   }
   catch (error){
    console.log(error);
   }
}

const displayNewsCategorys = newsCategorys => {
   const newsContainer = document.getElementById('category-container');
    newsCategorys.forEach(category => {
        const newsDiv = document.createElement('ul');
        newsDiv.classList.add('li');
        newsDiv.innerHTML = `<li  class="nav-item menu lg:menu-horizontal md:menu-horizontal menu-vertical lg:text-xl lg:font-semibold">
        <a onclick="openCategory('${category.category_id}')" class="nav-link mt-5" href="#">${category.category_name}</a>
        </li>`;
        newsContainer.appendChild(newsDiv);
    });
} 

const openCategory = (categoryId) => {
const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
// console.log(url);
fetch(url)
.then(res => res.json())
.then(data => console.log(data.data));
}


// const newsDetails = (posts) => {
//    for(const post of posts )
//    consol.log(post);
// }


loadNewsCategory();
