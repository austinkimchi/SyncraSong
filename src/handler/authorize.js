export async function launchAppleMusicAuthorization() {
    document.addEventListener("musickitloaded", async function () {
        const devToken = await fetch('https://syncrasongapi.austin.kim/api/apple/devToken', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => response.json())
            .then((data) => data.developerToken)
            .catch((error) => {
                console.error('Failed to get developer token:', error);
            });

        await MusicKit.configure({
            developerToken: await devToken,
            app: {
                name: 'SyncraSong',
                build: '0.0.1',
            },
        });

        const music = await MusicKit.getInstance();

        // Trigger authorization and obtain the Music-User-Token
        await music.authorize()
            .then(async (musicUserToken) => {
                const complete = await fetch('https://syncrasongapi.austin.kim/api/oAuth/callback/apple', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ musicUserToken })
                });

                if (complete.status === 200)
                    return true;
            }).catch((error) => {
                console.error('Authorization failed:', error);
                return false;
            });
    });


}