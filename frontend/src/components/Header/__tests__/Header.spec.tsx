import { mount } from '@cypress/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../Header.component';
import { AdType } from '../../../constants';
import store from '../../../store';

it('Button', () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header
            isAuthorized={false}
            isCurtainActive
            isMobile
            onLoginClick={() => {}}
            onLogoutClick={() => {}}
            onWishlistIconClick={() => {}}
            searchType={AdType.Sale}
            setIsCurtainActive={() => {}}
          />
        </BrowserRouter>
      </Provider>
    );
});
