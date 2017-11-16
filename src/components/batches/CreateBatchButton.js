// src/components/batches/CreateBatchButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/content/add-circle'
import { push } from 'react-router-redux'

class CreateBatchButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

createBatch(){
  this.props.push('/create')
}
  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateBatchButton">
        <RaisedButton
          label="Create Batch"
          primary={true}
          onClick={this.createBatch.bind(this)}
          icon={<StarIcon />} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push })(CreateBatchButton)
