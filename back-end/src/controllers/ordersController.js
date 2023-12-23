import database from "../config/database.js"


export function placeOrder (req, res) {

  const order = req.body
  console.log(req.body)
  let price = 0

  try {

    if(!order.clientCode || !order.dishes) return res.sendStatus(422)

    order.dishes.forEach(element => {
      database.dishes.forEach(dbelement => {
        if(element.dishId === dbelement.id) price += dbelement.price * element.amount
      })
    });

    database.orders.push({
      clientCode: order.clientCode,
      clientName: order.clientName,
      dishes: order.dishes,
      price: price,
      ready: false
    })

    res.status(201).send(order)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export function getOrders (req, res) {

  const orders = database.orders

  try {
    res.status(200).send(orders)
  } catch (error) {
    res.sendStatus(500)
  }
}

export function finishOrder (req, res) {

  const clientCode = req.params.clientCode
  let order

  try {

    database.orders.every(element => {
      if (element.clientCode === clientCode)  {
        element.ready = true
        order = element
        return false
      } else return true
    });

    if (!order) return res.status(404).send("Cliente não encontrado")
    res.sendStatus(200)

  } catch (error) {
    res.sendStatus(500)
  }
}

export function clearOrder (req, res) {

  const clientCode = req.params.clientCode
  let order

  try {

    for(let i = 0; i < database.orders.length; i++) {
      console.log(database.orders[i].clientCode)
      if(database.orders[i].clientCode === clientCode) {
        order = database.orders[i]
        database.orders.splice(i, 1)
      }
    } 

    if (!order) return res.status(404).send("Cliente não encontrado")
    res.sendStatus(200)

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}