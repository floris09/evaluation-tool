import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import  fetchStudents  from '../actions/students/fetch'
import  fetchEvaluations  from '../actions/evaluations/fetch'
import { randomStudent } from '../actions/students/fetch'
import { push } from 'react-router-redux'
import { fetchOneStudent } from '../actions/students/fetch'
import StudentForm from '../components/students/StudentForm'

class Batch extends PureComponent {
  static propTypes = {
    fetchStudents: PropTypes.func.isRequired,
    fetchEvaluations: PropTypes.func.isRequired
  }


  componentWillMount(){
    this.props.fetchStudents()
    this.props.fetchEvaluations()
  }


  batchStudents(){
    const { batchId } = this.props.match.params
    return this.props.students.filter(student => student.batch_id === batchId)
  }

  lastStudentEvaluation(studentId){
    var evaluations = []
    evaluations = (this.props.evaluations.filter(evaluation => evaluation.student_id === studentId))
    if(evaluations.length !== 0){return evaluations[0].color}
    else {return 'green'}
  }

  randomStudent(lastStudentEvaluations){
    this.props.randomStudent(lastStudentEvaluations)
  }

  renderRandomStudentImage(){
    const { theRandomStudent } = this.props
    const students = this.batchStudents()
    const studentNames = students.map(student => student.name)
    if (studentNames.indexOf(theRandomStudent.name) === -1) return
    return theRandomStudent.imageUrl
  }

  renderRandomStudentName(){
    const { theRandomStudent } = this.props
    const students = this.batchStudents()
    const studentNames = students.map(student => student.name)
    if (studentNames.indexOf(theRandomStudent.name) === -1) return
    return theRandomStudent.name
  }

  getPercentage(color){

  }

  toStudentPage(studentId){
    this.props.push(`/student/${studentId}`)
  }

  render() {
    const students = this.batchStudents()
    const lastStudentEvaluations = students.map(student => {return {...student, color: this.lastStudentEvaluation(student._id)}})
    const { batchId } = this.props.match.params
    const { batches } = this.props

    return (
      <div className="Batch">
        <h3> Batch #{ batches.batchNumber }</h3>
        <StudentForm batchId={ batchId } />
        <button onClick={ this.randomStudent.bind(this,lastStudentEvaluations) }>Random Student</button>
        <img src={this.renderRandomStudentImage()} />
        <p>{this.renderRandomStudentName()}</p>
        <div style={{width:'600px'}}>


        </div>
        { students.map((student,index) => <div onClick={ this.toStudentPage.bind(this,student._id) } style={ {background: this.lastStudentEvaluation(student._id)}} key={ `div${index}`}><img key={`img${index}`} src={ student.imageUrl } alt='student'/> <p key={ index }>{ student.name } </p> </div> )}
      </div>
    )
  }
}

const mapStateToProps = ({ batches, students, evaluations, theRandomStudent }) => ({ batches, students, evaluations,theRandomStudent })

export default connect(mapStateToProps, {
  fetchOneBatch,
  fetchStudents,
  fetchEvaluations,
  randomStudent,
  fetchOneStudent,
  push
})(Batch)
