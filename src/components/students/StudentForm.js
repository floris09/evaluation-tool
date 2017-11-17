import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import createStudent from '../../actions/students/create'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Title from '../../components/UI/Title'
import { push } from 'react-router-redux'

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

class StudentForm extends PureComponent {

  submitForm(event) {
    event.preventDefault()
    const { batchId } = this.props

    const student = {
      name: this.refs.name.getValue(),
      imageUrl: this.refs.imageUrl.getValue(),
      batch_id: batchId,
    }
    this.props.createStudent(student)

  }

  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="Create a New Student" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField name="name" ref="name" type="text" hintText="Name" />
          </div>
          <div className="input">
            <TextField name="name" ref="imageUrl" type="text" hintText="Image Url"  />
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

export default connect(mapStateToProps, { createStudent, push })(StudentForm)
