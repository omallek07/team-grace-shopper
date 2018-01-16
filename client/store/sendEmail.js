import axios from 'axios';

const SEND_EMAIL = 'SEND_EMAIL';

const sendEmailAction = () => {
  return {
    type: SEND_EMAIL
  }
}

export const sendEmailThunk = () => dispatch => {
  return axios
    .post(`/api/orders/email`)
    .then(res => res.data)
    .then(function(){
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



