export const userData = (state, action) => {
  if ( typeof state === 'undefined' ) {
    return {
      user_auth: null,
      location: ''
    }
  }

  let newState = state;
  switch (action.type) {
    case 'SET_LOCATION':
      newState = Object.assign ({}, state, { location: action.data });
      break;
    case 'getJSON':
      getJSON (action.url, action.data, action.callback);
      break;
    case 'USER_LOGIN':
      newState = Object.assign ({}, state, { user_auth: action.data });
      break;
    case 'USER_LOGOUT':
      newState = Object.assign ({}, state, { user_auth: null, user_business: [] });
      break;
  }

  return newState;
};

export const mapStateToProps = (state) => {
  return {
    userAuth: state.user_auth,
    location: state.location
  };
};

const getJSON = (url, data, callback) => {
  let request = new XMLHttpRequest ();
  request.open ('POST', url, true);
  request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  request.onload = () => {
    if ( request.status != 200 )
      return callback ({ error: request.status + ' ' + request.statusText });

    callback (JSON.parse (request.responseText));
  };

  request.onerror = () => console.error ('POST ' + url + '. Request failed.');

  let postData = [];
  for ( let key in data ) {
    if ( !data.hasOwnProperty (key) ) continue;

    postData.push (key + '=' + data[key]);
  }

  request.send (postData.join ('&'));
};
