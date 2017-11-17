import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import  fetchStudents  from '../actions/students/fetch'
import  fetchEvaluations  from '../actions/evaluations/fetch'
import { randomStudent } from '../actions/students/fetch'
import { push } from 'react-router-redux'
import { fetchOneStudent } from '../actions/students/fetch'
import { fetchBatchStudents } from '../actions/students/fetch'
import StudentForm from '../components/students/StudentForm'
import RaisedButton from 'material-ui/RaisedButton'
import './Batch.css'

class Batch extends PureComponent {
  static propTypes = {
    fetchStudents: PropTypes.func.isRequired,
    fetchEvaluations: PropTypes.func.isRequired
  }


  componentWillMount(){
    const { batchId } = this.props.match.params

    if (this.props.students.length === 0){ return this.props.push('/')}
    this.props.fetchEvaluations()
    this.props.fetchOneBatch(batchId)
    this.props.fetchBatchStudents(batchId)
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
    const { theRandomStudent,students } = this.props
    const studentNames = students.map(student => student.name)
    if (studentNames.indexOf(theRandomStudent.name) === -1) return
    return theRandomStudent.imageUrl
  }

  renderRandomStudentName(){
    const { theRandomStudent,students } = this.props
    const studentNames = students.map(student => student.name)
    if (studentNames.indexOf(theRandomStudent.name) === -1) return
    return theRandomStudent.name
  }

  renderRandomStudentColor(){
    const { theRandomStudent,students } = this.props
    const studentNames = students.map(student => student.name)
    if (studentNames.indexOf(theRandomStudent.name) === -1) return
    return theRandomStudent.color
  }


  toStudentPage(studentId){
    this.props.push(`/student/${studentId}`)
  }

  render() {
    const { batchId } = this.props.match.params
    const { batches, students } = this.props

    const colors = students.map(student => this.lastStudentEvaluation(student._id))

    const green = colors.filter(color => color === 'green')
    const yellow = colors.filter(color => color === 'yellow')
    const red = colors.filter(color => color === 'red')

    const greenPercentage = `${Math.floor((green.length/students.length)*100)}%`
    const yellowPercentage = `${Math.floor((yellow.length/students.length)*100)}%`
    const redPercentage = `${Math.floor((red.length/students.length)*100)}%`

    const greenWidth = `${(green.length/students.length)*1000}px`
    const yellowWidth = `${(yellow.length/students.length)*1000}px`
    const redWidth = `${(red.length/students.length)*1000}px`

    const lastStudentEvaluations = students.map(student => {return {...student, color: this.lastStudentEvaluation(student._id)}})


    return (
      <div className="Batch">
        <div className='batch-name'>
          <h1> Batch #{ batches.batchNumber }</h1>
        </div>

        <StudentForm batchId={ batchId } />

        <div className="random-student-button">
          <RaisedButton
            label="Random Student"
            primary={true}
            onClick={ this.randomStudent.bind(this,lastStudentEvaluations) }
            />
        </div>

        <div className='random-student-container' style={{background:this.renderRandomStudentColor()}} >
          <div className='random-student-img' style={{backgroundImage:'url(' + this.renderRandomStudentImage() + ')'}} />
          <h3>{this.renderRandomStudentName()}</h3>
        </div>

        <div className='percentage-bar' style={{width:'1000px',height:'50px'}}>
          <div className='percentage' style={{width:`${greenWidth}`,height:'20px',background:'green'}}>{greenPercentage}</div>
          <div className='percentage' style={{width:`${yellowWidth}`,height:'20px',background:'yellow'}}>{yellowPercentage}</div>
          <div className='percentage' style={{width:`${redWidth}`,height:'20px',background:'red'}}>{redPercentage}</div>
        </div>

        <div className='all-students-container'>
        { students.map((student,index) =>
             <div className='student-container' onClick={ this.toStudentPage.bind(this,student._id) } style={ {background: this.lastStudentEvaluation(student._id)}} key={ `div${index}`}>

                  <div className='student-img' key={`img${index}`} style={{backgroundImage:'url(' + student.imageUrl + ')'}}/> <h3 key={ index }>{ student.name } </h3>
                  </div>
                      )
        }
        </div>
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
  fetchBatchStudents,
  push
})(Batch)
