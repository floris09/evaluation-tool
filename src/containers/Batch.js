import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'

const studentShape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string
})

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape),
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      started: PropTypes.bool,
      turn: PropTypes.number.isRequired,
      cards: PropTypes.arrayOf(PropTypes.shape({
        symbol: PropTypes.string,
        _id: PropTypes.string,
        won: PropTypes.bool,
        visible: PropTypes.bool
      }))
    }),
    currentStudent: studentShape,
    isStudent: PropTypes.bool,
    isJoinable: PropTypes.bool,
    hasTurn: PropTypes.bool
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch && !batch.students[0].name) {
      this.props.fetchStudents(batch)
    }
  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    return (
      <div className="Batch">


      </div>
    )
  }
}

export default connect(null, {
  fetchOneBatch,
  fetchStudents
})(Batch)
