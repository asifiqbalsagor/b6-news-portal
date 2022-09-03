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



loadCategoryName();
