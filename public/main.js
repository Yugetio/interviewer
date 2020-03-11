let curentCategoryId = null;

const createElement = (elName, data, appendTo, className, linkTo) => {
  const el = document.createElement(elName);
  if (className) el.classList.add(className);
  el.innerHTML = data;
  appendTo.appendChild(el);
};

const renderCategory = (id, title, parentId) => {
  curentCategoryId = parentId;

  const el = document.createElement('button');
  el.classList.add('category-btn');
  el.dataset.id = id;
  el.dataset.parentId = parentId;
  el.innerHTML = title;
  document.body.appendChild(el);
};

// fetch('/category/all')
//   .then(response => {
//     return response.json();
//   })
//   .then(res => {
//     createElement('p', res[0].title, document.body);
//   });

fetch('/category')
  .then(response => {
    return response.json();
  })
  .then(res => {
    console.log(res);
    res.categories.map(el => {
      renderCategory(el.id, el.title, el.parentId);
      return el;
    });
  });
