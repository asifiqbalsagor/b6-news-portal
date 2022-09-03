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

    cardDiv.innerHTML = `
           
           <div  class="row g-0">
           <div class="col-md-4">
             <img src="${
               user.thumbnail_url
             }" class="img-fluid rounded-start" alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">${user.title}</h5>
               <p class="card-text"><small class="text-muted">${
                 user.details
               }</small></p>
               <div class="container text-center">
              <div class="row">
              <div class="col-md-8  d-flex">
              <img src="${
                user.author.img
              }" class="img-fluid author_custom h- rounded-circle" alt="...">
              <b class="card-title m-2">${
                user.author.name ? user.author.name : "No data ableable"
              }</b>
              <p class="card-text m-2">${
                user.author.published_date
                  ? user.author.published_date
                  : "No data ableable"
              }</p>
              <p class="m-2"><i class="fa-solid fa-eye"></i></p>
              <p class="card-text m-2">${
                user.rating.number ? user.rating.number : "No data ableable"
              }M</p>
             </div>
             <div class="col ">
             <div class="d-flex m-2">
         
               <i class="fa-regular fa-star-half-stroke"></i>
               <i class="fa-regular fa-star"></i>
               <i class="fa-regular fa-star"></i>
               <i class="fa-regular fa-star"></i>
               <i class="fa-regular fa-star"></i>
                </div>
                </div>
                <div class="col m-2"> <i onclick="loadPost('${
                  user._id
                }')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#loadModalDetail"></i></div>
              </div>
             </div>
           </div>
         </div>
         </div>
           
           `;
    cardContainer.appendChild(cardDiv);
  }
  toggleSpinner(false);
};








loadCategoryName();
