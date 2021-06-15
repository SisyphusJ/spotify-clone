import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
    const [{ user, token }, dispatch] = useDataLayerValue();

    // 지정된  조건에 따라 코드를 실행. []안에는 변경되는 condition을 기입. 1회 실행이면 넣지 않는다.
    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = ""; //초기화
        const _token = hash.access_token; //한시적인 변수. 실질적으로 저장되고 변경되는 것은 useState의 token

        if (_token) {
            dispatch({
                type: "SET_TOKEN",
                token: _token,
            });

            // 로그인하면서 얻은 Access token으로 spotify API에 연결 (쿠키와 세션대신 토큰으로 사용)
            spotify.setAccessToken(_token);

            //UserAccount 불러오기
            spotify.getMe().then((user) => {
                dispatch({
                    type: "SET_USER",
                    user: user,
                });
            });

            spotify.getUserPlaylists().then((playlists) => {
                dispatch({
                    type: "SET_PLAYLISTS",
                    playlists: playlists,
                });
            });

            spotify.getPlaylist(`37i9dQZF1DWYbyYXnUYgqZ`).then((response) =>
                dispatch({
                    type: "SET_DISCOVER_WEEKLY",
                    discover_weekly: response,
                })
            );
        }
    }, []);

    return <div className="app">{token ? <Player spotify={spotify} /> : <Login />}</div>;
}

export default App;
