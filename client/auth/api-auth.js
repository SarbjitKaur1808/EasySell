const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
        return await response.json();
    } catch (error) {
        console.error('Error parsing JSON response:', error);
        return { error: 'Error parsing JSON response' };
    }
};

const signin = async (user) => {
    try {
        let response = await fetch('/api/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });

        return await handleResponse(response);
    } catch (err) {
        console.error('Error during signin:', err);
        return { error: 'Something went wrong during signin.' };
    }
};

const signout = async () => {
    try {
        let response = await fetch('/api/auth/signout/', { method: 'GET' });
        return await handleResponse(response);
    } catch (err) {
        console.error('Error during signout:', err);
        return { error: 'Something went wrong during signout.' };
    }
};

export { signin, signout };
