// eslint-disable-next-line import/prefer-default-export
export const hasOperationName = (req, operationName) => {
    const { body } = req;
    return body.query.includes(operationName);
};
