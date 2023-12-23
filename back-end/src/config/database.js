const orders = [
  {
    clientCode: "LQHGR9GU",
    clientName: "Maria",
    dishes: [{dishId: 1, dishName: "Sundae", amount: 2, price: 2000}],
    price: 4000,
    ready: false,
  }
]

const dishes = [
  {
    id:1,
    name:"Hambúrguer",
    price: 2000,
    category:"main",
    ingredients: "Hambúrguer 200g, queijo cheddar, tomate, alface, cebola, picles e molho da casa",
    imgUrl : "https://s2.glbimg.com/3Q9x2c8dWyetlqFutMZ8kmlarWo=/e.glbimg.com/og/ed/f/original/2022/05/27/tentador-carne.jpg"
  },
  {
    id:2,
    name: "Sundae",
    price: 1000,
    category: "dessert",
    ingredients: "Sorvete, calda de chocolate e pedaços de amendoim",
    imgUrl: "https://cache-mcd-ecommerce.appmcdonalds.com/images/BR/63475%20DLV.png"
  },
  {
    id:3,
    name: "Milkshake",
    price: 1500,
    category: "drink",
    ingredients: "-",
    imgUrl: "https://revistadegusta.com/wp-content/uploads/2023/06/7c0c428cbe1e4cc5bcbd3ba9768975d7ypMK0GwWcTw51Gp0-0-scaled-e1687272857320.jpg"
  },
  {
    id:4,
    name: "Batata frita",
    price: 1000,
    category: "garnish",
    ingredients: "Batata frita com cheddar e bacon",
    imgUrl: "https://cdn.awsli.com.br/2500x2500/1802/1802445/produto/2092821035b63f61a6e.jpg"
  }
]

const database = {
  orders,
  dishes
}

export default database