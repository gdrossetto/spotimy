const initState = {
    user: {},
    loading:false,
}

const Reducer = (state = initState, action) => {
    switch (action.type) {

        case "SET_LOADING":
            return {
                ...state,
                loading: action.loading
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        default:
            return state
    }
}

export default Reducer
