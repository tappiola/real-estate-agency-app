import {
    ChangeEventHandler,
    FocusEventHandler,
    useReducer
} from 'react';

const initialInputState = {
    value: '',
    isTouched: false
};

type StateType = {
    value: string,
    isTouched: boolean
};

type ActionType = {
    type: Action,
    value?: string
};

export enum Action {
    Input,
    Blur,
    Reset
}

export const PASSWORD_MIN_LENGTH = 6;

export const validators = {
    isRequired: (value: string) => value.trim() !== '',
    isEmail: (value: string) => /^(([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5}){1,25})+$/.test(value),
    isLongEnough: (value: string) => value.trim().length >= PASSWORD_MIN_LENGTH
};

const inputStateReducer = (state: StateType, action: ActionType) : StateType => {
    if (action.type === Action.Input) {
        return {
            value: action.value!,
            isTouched: state.isTouched
        };
    }

    if (action.type === Action.Blur) {
        return {
            isTouched: true,
            value: state.value
        };
    }

    if (action.type === Action.Reset) {
        return {
            isTouched: false,
            value: ''
        };
    }

    return state;
};

const useInput = (validateValue: (value: string) => boolean) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: Action.Input,
            value: event.target.value
        });
    };

    const inputBlurHandler : FocusEventHandler = () => {
        dispatch({ type: Action.Blur });
    };

    const reset = () => {
        dispatch({ type: Action.Reset });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput;
