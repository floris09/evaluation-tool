import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import createEvaluation from '../../actions/evaluations/create'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Title from '../../components/UI/Title'
import { push } from 'react-router-redux'
import { RadioGroup, RadioButton } from 'react-radio-buttons'

const dialogStyle = {
  width: '500px',
  margin: '50px auto',
  padding: '2rem',
  position: 'relative',
  left: '200px',
  bottom: '350px'
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

class EvaluationForm extends PureComponent {

  constructor(props){
    super()

    const { color } = props

    this.state = {
      color
    }
  }

  setColor(event){
    this.setState({
      color: event.toString()
    })
  }


  submitForm(event) {
    event.preventDefault()
    const { studentId } = this.props

    const evaluation = {
      date: this.refs.date.getValue(),
      color: this.state.color,
      remark: this.refs.remark.getValue(),
      student_id: studentId
    }
    this.props.createEvaluation(evaluation)
    this.props.push(`/batch/${this.props.students.batch_id}`)

  }


  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="Add Evaluation" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField ref="date" type="date" hintText="" default={Date.now} />
          </div>
          <div className="input">
          <RadioGroup ref="color" onChange={ this.setColor.bind(this) } horizontal>
            <RadioButton value="green">
              Good and on track
            </RadioButton>
            <RadioButton value="yellow">
              Slightly off-track
            </RadioButton>
            <RadioButton value="red">
              Needs extra attention
            </RadioButton>
          </RadioGroup>
          </div>
          <div className="input">
            <TextField ref="remark" type="text" hintText="Remark..."  />
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

const mapStateToProps = ({ students }) => ({ students })

export default connect(mapStateToProps, { createEvaluation, push })(EvaluationForm)
