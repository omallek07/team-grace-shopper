import axios from 'axios';

const SEND_EMAIL = 'SEND_EMAIL';

const sendEmailAction = () => {
  return {
    type: SEND_EMAIL
  }
}

export const sendEmailThunk = (currentOrder) => dispatch => {
  return axios
    .post(`/api/orders/email`, currentOrder)
    .then(res => res.data)
    .then(() => {
      dispatch(sendEmailAction)
    })
    .catch(err => console.log(err))
}

export default function (userEmail = {}, action) {
  switch (action.type) {
    case SEND_EMAIL:
        return {}
      default:
        return {}
  }
}
