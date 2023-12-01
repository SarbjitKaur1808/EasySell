const create = async (user) => {
    console.log("user", JSON.stringify(user));

    try {
        let response = await fetch('/api/users/signup/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.error('Error during API call:', err);
        return { error: 'Something went wrong during the API call.' };
    }
};

const read = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/users/' + params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  };

  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/users/' + params.userId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  };

  const update = async (params, credentials, user) => {
    try {
      console.log("Here are params.........")
      console.log(params)
      let response = await fetch('/api/users/' + params.userId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

export {
    create,
    read,
    remove,
    update
};
