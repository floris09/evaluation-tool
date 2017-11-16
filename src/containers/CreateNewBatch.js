import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import createBatch from '../actions/batches/create'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Title from '../components/UI/Title'

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

class CreateNewBatch extends PureComponent {

  submitForm(event) {
    event.preventDefault()
    const batch = {
      batchNumber: this.refs.batchNumber.getValue(),
      startDate: this.refs.startDate.getValue(),
      endDate: this.refs.endDate.getValue(),
    }
    this.props.createBatch(batch)
  }

  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="Create a New Batch" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField ref="batchNumber" type="text" hintText="Batch Number" />
          </div>
          <div className="input">
            <TextField ref="startDate" type="date" hintText=""  />
          </div>
          <div className="input">
            <TextField ref="endDate" type="date" hintText=""  />
          </div>
        </form>
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Create"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createBatch })(CreateNewBatch)
