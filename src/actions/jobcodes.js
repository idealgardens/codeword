import {
  GET_JOBCODES_SUCCESS,
  GET_JOBCODES_REQUEST,
  GET_JOBCODES_FAILURE
} from '../constants/ActionTypes'
import { CALL_API } from 'redux-api-middleware'

export function getJobcodes () {
  return {
    [CALL_API]: {
      endpoint: `/api/jobcodes?modified_since=2016-02-05${encodeURIComponent('T15:19:21+00:00')}`,
      method: 'GET',
      types: [ GET_JOBCODES_REQUEST, GET_JOBCODES_SUCCESS, GET_JOBCODES_FAILURE ]
    }
  }
}
