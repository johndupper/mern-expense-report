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

  expense.save((error) => {
    return error
      ? res.status(500).json({ error })
      // modal displays this message
      : res.status(201).send('Expense Saved')
  })
})

// get all
router.get('/getAll', function (req, res) {
  const { month, year } = req.query

  if (month && month !== 'All') {
    const query = { $and: [{ month: month }, { year: year }] }

    Expense.find(query, (error, expenses) => {
      if (error) return res.send(error)
      res.json(expenses)
    })
  } else {
    const query = { year: year }

    Expense.find(query, (error, expenses) => {
      if (error) return res.send(error)
      res.json(expenses)
    })
  }
})

// router.get('/getAll', (req, res) => {
//   Expense.find({}, (error, expenses) => {
//     return error
//       ? res.status(500).json({ error })
//       : res.status(200).json({ expenses })
//   })
// })

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

  Expense.updateOne({ id }, expense, (error) => {
    return error
      ? res.status(500).json({ error })
      : res.status(201).send('Expense Updated')
  })
})

// delete
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id

  Expense.findByIdAndDelete(id, (error) => {
    return error
      ? res.status(500).json({ error })
      : res.status(200).send('Expense Deleted')
  })
})

module.exports = router
