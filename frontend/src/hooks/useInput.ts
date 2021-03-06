import { ChangeEventHandler, FocusEventHandler, useReducer } from 'react';
import { InputConfigType, InputType, ValidationType } from '../components/Input/Input.config';

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
    value?: string,
    message?: string
};

export type UseInputType = {
    value: string,
    isValid: boolean,
    valueChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    inputBlurHandler: FocusEventHandler,
    validate: () => void,
    reset: () => void,
    errorMessage: string | null,
    placeholder: string,
    name: string,
    type?: InputType,
    apiField?: string
};

export enum Action {
    Input,
    Blur,
    Reset,
    Validate
}

const PASSWORD_MIN_LENGTH = 6;

type ValidatorType = {
    validateValue: (value: string) => boolean,
    message: string
};

const validators: { [key in ValidationType]: ValidatorType } = {
    [ValidationType.isRequired]: {
        validateValue: (value: string) => value.trim() !== '',
        message: 'Field is required'
    },
    [ValidationType.isEmail]: {
        validateValue: (value: string) => /^(([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5}){1,25})+$/
            .test(value),
        message: 'Invalid email'
    },
    [ValidationType.isLongEnough]: {
        validateValue: (value: string) => value.trim().length >= PASSWORD_MIN_LENGTH,
        message: `Min length is ${PASSWORD_MIN_LENGTH}`
    },
    [ValidationType.noValidate]: {
        validateValue: () => true,
        message: ''
    }
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

    if (action.type === Action.Validate) {
        return {
            isTouched: true,
            value: state.value
        };
    }

    return state;
};

const useInput = ({
    validationType,
    placeholder,
    name,
    type,
    apiField
}: InputConfigType) : UseInputType => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    const { validateValue, message } = validators[validationType];
    const valueIsValid = validateValue ? validateValue(inputState.value) : true;
    const hasError = !valueIsValid && inputState.isTouched;
    const errorMessage = hasError ? message : null;

    const valueChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: Action.Input,
            value: event.target.value
        });
    };

    const inputBlurHandler = () => {
        dispatch({ type: Action.Blur });
    };

    const validate = () => {
        dispatch({ type: Action.Validate });
    };

    const reset = () => {
        dispatch({ type: Action.Reset });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        validate,
        reset,
        errorMessage,
        placeholder,
        name,
        type,
        apiField
    };
};

export default useInput;
