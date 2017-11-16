import {
  BATCH_STUDENTS_FETCHED,
  FETCHED_ONE_STUDENT
} from '../actions/students/fetch'
import { STUDENT_CREATED } from '../actions/students/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_STUDENTS_FETCHED :
        return [...payload]

    case FETCHED_ONE_STUDENT :
        return { ...payload }

    case STUDENT_CREATED :
        const newBatch = { ...payload }
        return [newBatch].concat(state)


        default :
          return state
  }
}
