// src/actions/batches/create.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const STUDENT_DELETED = 'STUDENT_DELETED'
const api = new API()

export default (body) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.delete(`/students/${body}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: STUDENT_DELETED,
          payload: result.body
        })

      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
