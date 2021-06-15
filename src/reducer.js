export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    // token: "BQD7-S2QR7NhhULZetp-H6nsWmN6KUx-GLTbFJoP_lsOoh5WgJfpe4S0SaPHURw8AI01TG69iEnG_9GRwZDys6pqBvzYAdKbBdiaz2KYAN8rEzRY_FQqw5mAgzgI50zW-yLJXWzDMTR1nNCpl-jt7ZQMyoEVtR5uO5fTywaitPJIIJed",
};

const reducer = (state, action) => {
    console.log(action);

    // Action -> type, [payload]

    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
            };

        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists,
            };

        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };
        default:
            return state;
    }
};

export default reducer;
