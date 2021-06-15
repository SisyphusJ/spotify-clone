export const authEndpoint = "https://accounts.spotify.com/authorize";
// endpoint = API가 서버에서 리소스에 접근할 수 있도록 가능하게 하는 URL이다

const redirectUri = "http://localhost:3000/";
//로그인 후 돌아갈 페이지

const clientId = "d7147bef19084c2e9d6b7c24e5e9c971";

const scopes = ["user-read-currently-playing", "user-read-recently-played", "user-read-playback-state", "user-top-read", "user-modify-playback-state"];
// API에 대한 요청사항
// join를 이용해 문자열로 변환 %20은 공백 아스키코드

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            //ex) #accessToken=mysupersecretkey&name=jinseong&dfsde
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
