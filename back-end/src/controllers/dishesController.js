import database from "../config/database.js";


export function getDishes (req, res) {

  try {

    res.status(200).send(database.dishes)

  } catch (error) {
    res.sendStatus(500)
  }
  
}