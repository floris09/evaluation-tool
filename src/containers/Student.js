import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchOneStudent } from '../actions/students/fetch'
import fetchEvaluations  from '../actions/evaluations/fetch'
import EvaluationForm from '../components/evaluations/EvaluationForm'
import './Student.css'

class Student extends PureComponent {

  componentWillMount(){
    this.props.fetchEvaluations()
    const { studentId } = this.props.match.params
    this.props.fetchOneStudent(studentId)
  }

  render() {
    const { students, evaluations } = this.props
    const studentEvaluations = evaluations.filter(evaluation => evaluation.student_id === students._id)

    return (
      <div className="Student">
        <div className='name'>
          <h1>{ students.name }</h1>
        </div>

        <div className="img" style={{backgroundImage:"url("+ students.imageUrl+")" }}/>

      { studentEvaluations.map( (evaluation,index) => <div className='square-container'><div className='square' key={ index } style={ {height:'50px',width:'50px',background: evaluation.color}  }/></div> )  }
      <EvaluationForm studentId={ students._id }/>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, students, evaluations }) => ({ batches, students, evaluations })

export default connect(mapStateToProps, { fetchEvaluations, fetchOneStudent, push })(Student)
