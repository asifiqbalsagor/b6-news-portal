const loadCategoryName = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategoryName(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};


const displayAllCategoryName = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const { category_id, category_name } = category;
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
          
          <div class="">
          <li class="nav-item mx-3">
            <a onclick="loadNewsByCategory('${category_id}')" class="nav-link active" aria-current="page" href="#">${category_name}</a>
          </li>
        </div>
          
          `;
    categoryContainer.appendChild(categoryDiv);
  });
};





const loadNewsByCategory = async (category_id) => {
  const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCardNewsCategory(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayCardNewsCategory = (users) => {
  console.log(users);
  const cardContainer = document.getElementById("card-container");
  toggleSpinner(true);
  cardContainer.textContent = "";
  for (const user of users) {
    console.log(user);
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("mb-3");

  }
}

loadCategoryName();
