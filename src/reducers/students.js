import {
  STUDENTS_FETCHED,
  FETCHED_ONE_STUDENT,
  BATCH_STUDENTS_FETCHED
} from '../actions/students/fetch'
import { STUDENT_CREATED } from '../actions/students/create'

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


        default :
          return state
  }
}
