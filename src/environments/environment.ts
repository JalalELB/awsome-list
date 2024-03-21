export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyCgyVouP2uDtIgMDycky_X-BXW1CzK-zio",
        authDomain: "awesome-list-d1c37.firebaseapp.com",
        projectId: "awesome-list-d1c37",
        storageBucket: "awesome-list-d1c37.appspot.com",
        messagingSenderId: "223574578038",
        appId: "1:223574578038:web:0a5fd46f523ed1f4bd2057",
        measurementId: "G-PX206D34T8",
        auth: {
            baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
        },
        firestore: {
            baseURL:
                `https://firestore.googleapis.com/v1/projects/awesome-list-d1c37/databases/(default)/documents`
        }
    }
};