import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

// Mock implementations for testing
const mockReducers = {
  cart: (state = { items: [], totalItems: 0, totalPrice: 0 }) => state,
  user: (state = { currentUser: null, isAuthenticated: false }) => state,
  game: (state = { games: [], loading: false, error: null }) => state,
  merch: (state = { merch: [], loading: false, error: null }) => state,
  modal: (state = { isOpen: false, content: null }) => state,
};

export const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: mockReducers,
    preloadedState,
  });
};

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = createMockStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
};

// Mock data for testing
export const mockUser = {
  _id: '123',
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
};

export const mockCartItem = {
  _id: '456',
  productId: '789',
  title: 'Super Mario Bros',
  price: 59.99,
  img: 'mario.jpg',
  amount: 1,
};

export const mockGame = {
  _id: '789',
  title: 'Super Mario Bros',
  price: 59.99,
  description: 'Classic Nintendo game',
  img: 'mario.jpg',
  category: 'platformer',
  inStock: true,
};

export const mockMerch = {
  _id: '101',
  title: 'Mario Plush',
  price: 24.99,
  description: 'Cute Mario plushie',
  img: 'mario-plush.jpg',
  category: 'plushie',
  inStock: true,
};

// Helper functions for testing
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 0));
};

export const mockApiResponse = (data, status = 200) => {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
  });
};

export const mockApiError = (message = 'API Error', status = 500) => {
  return Promise.reject({
    response: {
      status,
      data: { message },
    },
  });
};
