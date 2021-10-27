import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders correctly', () => {
  const app = render(<App />);
  expect(app).toMatchSnapshot();
  // ругается на импорт fancybox т.к. в TS он задекларирован отдельным модулем. Для проверки теста нужно закомментировать fancybox в bookdetailpage

});
