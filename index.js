document.addEventListener("DOMContentLoaded", () => {
burgerMenu = document.querySelector('#burger-menu')
orderList = document.querySelector('#order-list')
burgerForm = document.querySelector('#custom-burger')
let burgerArray = []

  function fetchBurgers() {
    fetch('http://localhost:3000/burgers')
    .then(resp => resp.json())
    .then(burgers => renderBurgers(burgers))
  }

  function renderBurgers(burgers){
    burgers.forEach(burg => renderSingleBurger(burg))
  }

  function renderSingleBurger(burger) {
    burgerMenu.innerHTML += `
    <div class="burger">
      <h3 class="burger_title">${burger.name}</h3>
        <img src="${burger.image}">
        <p class="burger_description">
          ${burger.description}
        </p>
        <button id="order-btn" data-id = ${burger.id} class="button">Add to Order</button>
        <button id="delete-btn" data-id = ${burger.id} class="button">Delete this durg</button>
        <button id="edit-btn" data-id = ${burger.id} class="button">Edit this durg</button>

    </div>
    `
    burgerArray.push(burger)

  }

  function renderOrder(order) {
    orderList.innerHTML += `
    <p>${order.name}</p>
    `
  }

  burgerMenu.addEventListener("click" , e=> {
    if (e.target.id === "order-btn") {
      order = burgerArray.find(burger =>
      burger.id == e.target.dataset.id)
      renderOrder(order)
    }
    if (e.target.id === "delete-btn") {
      fetch(`http://localhost:3000/burgers/${e.target.dataset.id}`, {
        method: "DELETE"
      })
      e.target.parentElement.remove()
    }

  })

  burgerForm.addEventListener("submit", e=> {
    e.preventDefault()
    let name = e.target.name.value
    let description = e.target.description.value
    let image = e.target.url.value
    let data = {
      "name": name,
      "description": description,
      "image": image
    }
    fetch('http://localhost:3000/burgers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }).then(r => r.json())
    .then(r => renderSingleBurger(r))
    .then(renderOrder(data))

    })

  fetchBurgers()

})
