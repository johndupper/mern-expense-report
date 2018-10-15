import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import axios from 'axios'

export default class Delete extends Component {
  constructor () {
    super()
    this.state = { id: '' }

    this.onClick = this.onClick.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount () {
    this.setState({ id: this.props.expense._id })
  }

  onClick (e) {
    this.delete(this)
  }

  delete (e) {
    axios.delete(`/delete/${e.state.id}`)
      .then(response => {
        // todo
      })
  }

  render () {
    return (
      <Button
        bsStyle='danger' bsSize='small'
        onClick={this.onClick}
      >
        <Link
          to={{ pathname: '/', search: '' }}
          style={{ textDecoration: 'none' }} >
          <span className='glyphicon glyphicon-remove' />
        </Link>
      </Button>
    )
  }
}
