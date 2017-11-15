import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
  }

  componentWillMount(){
    const { pathname } = this.props.router.location
    const id = pathname.slice(1)

    this.props.fetchOneBatch(id)
  }


  render() {

    return (
      <div className="Batch">
        <h3> Batch #{ this.props.batches.batchNumber }</h3>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, router }) => ({ batches, router })

export default connect(mapStateToProps, {
  fetchOneBatch
})(Batch)
