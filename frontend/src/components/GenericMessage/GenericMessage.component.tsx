import React from 'react';
import './GenericMessage.style.scss';

const GenericMessage : React.FC = ({ children }) => <h4 className="GenericMessage">{children}</h4>;

export default GenericMessage;
