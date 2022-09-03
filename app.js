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
  console.log(categories.length);
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
  const noData = document.getElementById("items-count");
  const number = users.length;
  noData.innerText = `${
    number <= 0 ? "No data found" : number + "items Found"
  }`;
  for (const user of users) {
    // console.log(user);
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("mb-3");

    cardDiv.innerHTML = `
           
           <div  class="row g-0">
           <div class="col-md-4">
             <img src="${
               user.thumbnail_url
             }" class="img-fluid  w-100 " alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h3 class="card-title my-3 mb-3">${user.title}</h3>
               <p class="card-text m-3"><small class="text-muted">${user.details.slice(
                 0,
                 500
               )} <a href="#">Show More...</a> </small></p>
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
                user.total_view ? user.total_view : "No data ableable"
              }</p>
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

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader-Spinner");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

const loadPost = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/news/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNewsModal(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayNewsModal = (news) => {
  console.log(news);
  const modalTitle = document.getElementById("modal-title");

  modalTitle.innerText = `${news.title ? news.title : "Title not found"}`;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `

<img class="img-fluid" src="${news.image_url}" alt="">
<p>${news.details ? news.details : "Details not found"}</p>

<div class="col-md-8  d-flex">
<img src="${
    news.author.img
  }" class="img-fluid author_custom h- rounded-circle" alt="...">
<b class="card-title m-4">${
    news.author.name ? news.author.name : "Name not found!"
  }</b>

<p class="m-4"><i class="fa-solid fa-eye"></i></p>
<p class="card-text m-4">${
    news.total_view ? news.total_view : "Rating not fund"
  }</p>

<div class="d-flex m-4">

<i class="fa-regular fa-star-half-stroke"></i>
<i class="fa-regular fa-star"></i>
<i class="fa-regular fa-star"></i>
<i class="fa-regular fa-star"></i>
<i class="fa-regular fa-star"></i>
</div>


</div>
`;
};

loadNewsByCategory("01");
loadCategoryName();
