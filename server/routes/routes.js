// https://blog.cloudboost.io/creating-your-first-mern-stack-application-b6604d12e4d3
const express = require('express')
const Expense = require('../../models/Expense')

const router = express.Router()

const parseExpense = req => {
  const { id, description, amount, month, year } = req.body
  const expense = { description, amount, month, year }
  if (id) expense.id = id
  return expense
}

router.get('/', (req, res) => {
  res.render('index')
})

// create
router.post('/insert', (req, res) => {
  const expense = new Expense(parseExpense(req))

  expense.save((error, expense) => {
    return error
      ? res.status(500).json({ error })
      : res.status(201).json({ expense })
  })
})

// get all
router.get('/getAll', (req, res) => {
  Expense.find({}, (error, expenses) => {
    return error
      ? res.status(500).json({ error })
      : res.status(200).json({ expenses })
  })
})

// get by id
router.get('/get/:id', (req, res) => {
  const id = req.params.id

  Expense.findById(id, (error, expense) => {
    return error
      ? res.status(500).json({ error })
      : res.status(200).json({ expense })
  })
})

// update
router.put('/update', (req, res) => {
  const expense = parseExpense(req)
  const id = expense.id

  Expense.update({ id }, expense, (error, expense) => {
    return error
      ? res.status(500).json({ error })
      : res.status(200).json({ expense })
  })
})

// delete
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id

  Expense.findByIdAndDelete(id, (error, expense) => {
    return error
      ? res.status(500).json({ error })
      : res.status(200).json({ expense })
  })
})

module.exports = router
