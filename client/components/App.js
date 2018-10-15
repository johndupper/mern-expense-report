import React, { Component } from 'react'
import axios from 'axios'

import Add from './Add'
import Update from './Update'
import Delete from './Delete'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      selectedMonth: 'Jan',
      selectedYear: 2018,
      data: []
    }

    this.getData = this.getData.bind(this)
  }

  componentDidMount () {
    this.getData(this, '2018')
  }

  componentWillReceiveProps () {
    this.getData(this, '2018')
  }

  getData (ev, year) {
    axios.get(`/getAll?month=All&year=${year}`)
      .then(response => {
        ev.setState({
          data: response.data,
          selectedYear: parseInt(year)
        })
      })
  }

  render () {
    return (
      <div>
        <Add
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear} />

        <table>
          <thead>
            <tr>
              <th className='desc-col'>Description</th>
              <th className='button-col'>Amount</th>
              <th className='button-col'>Month</th>
              <th className='button-col'>Year</th>
              <th className='button-col'>Update</th>
              <th className='button-col'>Delete</th>
            </tr>
          </thead>

          <tbody>
            {
            this.state.data.map(function (exp) {
              return (
                <tr>
                  <td className='desc-col'>{exp.description}</td>
                  <td className='button-col'>{exp.amount}</td>
                  <td className='button-col'>{exp.month}</td>
                  <td className='button-col'>{exp.year}</td>
                  <td className='button-col'><Update id={exp._id} expense={exp} /></td>
                  <td className='button-col'><Delete id={exp._id} expense={exp} /></td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}
