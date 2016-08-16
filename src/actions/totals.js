import {
  GET_TOTALS_SUCCESS,
  GET_TOTALS_REQUEST,
  GET_TOTALS_FAILURE,
  GET_JOB_TOTALS_SUCCESS,
  GET_JOB_TOTALS_REQUEST,
  GET_JOB_TOTALS_FAILURE
} from '../constants/ActionTypes'
import { CALL_API } from 'redux-api-middleware'

export function getTotals (groupId) {
  let bodyData = { start_date: '2016-06-01', end_date: 'today' }
  if (groupId) bodyData.group_ids = groupId
  return {
    [CALL_API]: {
      endpoint: '/api/report',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
      types: [
        GET_TOTALS_REQUEST,
        GET_TOTALS_SUCCESS,
        GET_TOTALS_FAILURE
      ]
    }
  }
}

export function getLocationTotals (groupId) {
  let bodyData = { start_date: '2016-06-01', end_date: 'today' }
  if (groupId) bodyData.group_ids = groupId
  return {
    [CALL_API]: {
      endpoint: '/api/reports/payroll',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
      types: [
        GET_JOB_TOTALS_REQUEST,
        {
          type: GET_JOB_TOTALS_SUCCESS,
          meta: { groupId }
        },
        GET_JOB_TOTALS_FAILURE
      ]
    }
  }
}
