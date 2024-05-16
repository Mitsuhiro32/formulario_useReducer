import { useReducer } from "react";

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: {
                    value: action.value,
                    error: null
                }
            };
        case 'SET_ERROR':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    error: action.error
                }
            };
        default:
            return state;
    }
}

const Formulario = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInput = (e) => {
        dispatch({
            type: 'SET_FIELD',
            field: e.target.name,
            value: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!state.firstName.value) {
            dispatch({
                type: 'SET_ERROR',
                field: 'firstName',
                error: 'First name is required'
            });
        }

        if (!state.lastName.value) {
            dispatch({
                type: 'SET_ERROR',
                field: 'lastName',
                error: 'Last name is required'
            });
        }

        if (!state.email.value) {
            dispatch({
                type: 'SET_ERROR',
                field: 'email',
                error: 'Email is required'
            });
        }

        if (state.firstName.value && state.lastName.value && state.email.value) {
            alert('Form submitted');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First name</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={state.firstName.value}
                onChange={handleInput}
            />
            {state.firstName.error && <p>{state.firstName.error}</p>}

            <label htmlFor="lastName">Last name</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={state.lastName.value}
                onChange={handleInput}
            />
            {state.lastName.error && <p>{state.lastName.error}</p>}

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={state.email.value}
                onChange={handleInput}
            />
            {state.email.error && <p>{state.email.error}</p>}

            <button type="submit">Submit</button>
        </form>
    );
};

export default Formulario;