export enum InputType {
    Text = 'text',
    Email = 'email',
    Password = 'password',
    Textarea = 'textarea',
    Phone = 'tel'
}

export enum TagType {
    Input = 'input',
    Textarea = 'textarea'
}

export type InputConfigType = {
    validationType: ValidationType,
    placeholder: string,
    name: string,
    type?: InputType,
    apiField?: string
};

export enum ValidationType {
    isRequired,
    isEmail,
    isLongEnough,
    noValidate
}
