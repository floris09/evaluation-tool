import {
  STUDENTS_FETCHED,
  FETCHED_ONE_STUDENT,
  BATCH_STUDENTS_FETCHED
} from '../actions/students/fetch'
import { STUDENT_CREATED } from '../actions/students/create'
import { STUDENT_DELETED } from '../actions/students/delete'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case STUDENTS_FETCHED :
        return [...payload]

    case BATCH_STUDENTS_FETCHED :
        return state.filter(student => student.batch_id === payload)

    case FETCHED_ONE_STUDENT :
        return { ...payload }

    case STUDENT_CREATED :
        const newBatch = { ...payload }
        return [newBatch].concat(state)

    case STUDENT_DELETED :
        return state.filter((student) => (student._id !== payload._id))


        default :
          return state
  }
}
