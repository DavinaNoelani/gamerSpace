import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock store for testing
const mockStore = configureStore({
  reducer: {
    // Add your actual reducers here when available
    cart: (state = { items: [] }) => state,
    user: (state = { currentUser: null }) => state,
    game: (state = { games: [] }) => state,
    merch: (state = { merch: [] }) => state,
  },
});

const renderWithProviders = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={mockStore}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithProviders(<App />);
  });

  test('renders main application structure', () => {
    renderWithProviders(<App />);
    
    // Test that the app renders (adjust based on your actual App component structure)
    const appElement = screen.getByRole('main') || document.body;
    expect(appElement).toBeInTheDocument();
  });
});

// Export the custom render function for use in other tests
export { renderWithProviders };
export default renderWithProviders;
