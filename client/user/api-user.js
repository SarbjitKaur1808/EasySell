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

export {
    create
};
