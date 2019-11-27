import VueJwtDecode from 'vue-jwt-decode'
var myStorage = window.localStorage;
export default class AuthService {
    constructor() {
        this.applicationConfig = {
            graphScopes: {
                scopes: ["user.read"]
            }
        }
        var msalConfig = {
            auth: {
                clientId: "d8ae0c56-3d9a-4e5b-b333-b082701e853e",
                authority: "https://login.microsoftonline.com/730e7c1f-aaa1-4990-8a65-e377c3fd0eef",
                redirectURI: "http://localhost:8080/"
            },
            cache: {
                cacheLocation: "localStorage",
                storeAuthStateInCookie: true
            }
        };

        this.app = new Msal.UserAgentApplication(msalConfig);
    }
    authen(token) {
        myStorage.setItem('token', token);
        myStorage.setItem('data', VueJwtDecode.decode(token));
        console.log(myStorage.getItem('data'));
    };
}