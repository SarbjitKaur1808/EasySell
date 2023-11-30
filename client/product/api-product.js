import queryString from 'query-string';

const create = async (credentials, product) => {
  try {
    let response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: product
      })
      return response.json();
    } catch(err) {
      console.log(err);
    }
};

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/products/' + params.productId, {
      method: 'GET',
      signal: signal
    });
    return response.json();
  } catch(err) {
    console.log(err);
  }
};

const update = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/products/' + params.productId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: product
    });
    return response.json();
  } catch(err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/products/' + params.productId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return response.json();
  } catch(err) {
    console.log(err);
  }
};

const listLatest = async (signal) => {
  try {
    let response = await fetch('/api/products/latest', {
      method: 'GET',
      signal: signal
    });
    return response.json();
  } catch(err) {
    console.log(err);
  }
};

const listRelated = async (params, signal) => {
  try {
    let response = await fetch('/api/products/related/' + params.productId, {
      method: 'GET',
      signal: signal
    });
    return response.json();
  } catch(err) {
    console.log(err);
  }
};

const listCategories = async (signal) => {
  try {
    let response = await fetch('/api/products/categories', {
      method: 'GET',
      signal: signal
    });
    return response.json();
  } catch(err) {
    console.log(err);
  }
};

const list = async (params, signal) => {
  const query = queryString.stringify(params);
  try {
    let response = await fetch('/api/products?' + query, {
      method: 'GET',
    });
    return response.json();
  } catch(err) {
    console.log(err);
  }
};

export {
  create,
  read,
  update,
  remove,
  listLatest,
  listRelated,
  listCategories,
  list
};
