import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseSearchForm from './BaseSearchForm.component';
import { enqueueToast } from '../../redux/notifier';
import { AdType, ToastTypes } from '../../constants';
import { useAppDispatch } from '../../redux/hooks';

const BaseSearchFormContainer: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onButtonClick = useCallback((adType: AdType) => {
        if (!selectedCity) {
            dispatch(enqueueToast({
                message: 'Please, select city',
                type: ToastTypes.Info
            }));

            return;
        }

        navigate(`/${adType}?city=${selectedCity}`);
    }, [dispatch, navigate, selectedCity]);

    return (
      <BaseSearchForm
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onButtonClick={onButtonClick}
      />
    );
};

export default BaseSearchFormContainer;
