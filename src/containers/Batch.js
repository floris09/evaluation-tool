import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import  fetchStudents  from '../actions/students/fetch'
import  fetchEvaluations  from '../actions/evaluations/fetch'
import { randomStudent } from '../actions/students/fetch'
import { push } from 'react-router-redux'


class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
  }


  componentWillMount(){
    const { batchId } = this.props.match.params

    this.props.fetchEvaluations()
    this.props.fetchOneBatch(batchId)
    this.props.fetchStudents()
  }


  batchStudents(){
    const { batchId } = this.props.match.params
    return this.props.students.filter(student => student.batch_id === batchId)
  }

  lastStudentEvaluation(studentId){
    var evaluations = []
    evaluations = (this.props.evaluations.filter(evaluation => evaluation.student_id === studentId))
    return evaluations[0].color
  }

  randomStudent(lastStudentEvaluations){
    const { batchId } = this.props.match.params
    this.props.push(`/${batchId}/random-student`)
    this.props.randomStudent(lastStudentEvaluations)
  }

  getPercentage(color){

  }

  render() {
    const { theRandomStudent } = this.props
    const students = this.batchStudents()
    const lastStudentEvaluations = students.map(student => {return {...student, color: this.lastStudentEvaluation(student._id)}})


    return (
      <div className="Batch">
        <h3> Batch #{ this.props.batches.batchNumber }</h3>
        <button onClick={ this.randomStudent.bind(this,lastStudentEvaluations) }>Random Student</button>
        <img src={theRandomStudent.imageUrl} />
        <p>{theRandomStudent.name}</p>
        <div style={{width:'600px'}}>


        </div>
        { students.map((student,index) => <div style={ {background: this.lastStudentEvaluation(student._id)}} key={ `div${index}`}><img key={`img${index}`} src={ student.imageUrl } alt='student'/> <p key={ index }>{ student.name } </p> </div> )}
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
  push
})(Batch)
