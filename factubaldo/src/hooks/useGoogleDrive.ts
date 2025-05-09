import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const SCOPE = 'https://www.googleapis.com/auth/drive.file';

const useGoogleDrive = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    const handleClientLoad = () => {
        gapi.load('client:auth2', initClient);
    };

    const initClient = () => {
        gapi.client.init({
            clientId: CLIENT_ID,
            scope: SCOPE,
        }).then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            setIsAuthenticated(authInstance.isSignedIn.get());
            setAccessToken(authInstance.currentUser.get().getAuthResponse().access_token);
            authInstance.isSignedIn.listen(updateSigninStatus);
        });
    };

    const updateSigninStatus = (isSignedIn) => {
        setIsAuthenticated(isSignedIn);
        if (isSignedIn) {
            setAccessToken(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
        } else {
            setAccessToken('');
        }
    };

    const signIn = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const signOut = () => {
        gapi.auth2.getAuthInstance().signOut();
    };

    const uploadFile = async (file) => {
        if (!isAuthenticated) return;

        const form = new FormData();
        form.append('file', file);

        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: form,
        });

        return response.json();
    };

    const deleteFile = async (fileId) => {
        if (!isAuthenticated) return;

        await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };

    useEffect(() => {
        handleClientLoad();
    }, []);

    return {
        isAuthenticated,
        signIn,
        signOut,
        uploadFile,
        deleteFile,
    };
};

export default useGoogleDrive;