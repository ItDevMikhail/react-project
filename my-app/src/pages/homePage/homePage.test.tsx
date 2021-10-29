import { act, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import HomePage from './index';

describe('HomePage', () => {
    let wrapper: any = null;
    beforeEach(() => {
        wrapper = document.createElement("div");
        document.body.appendChild(wrapper);
    });
    afterEach(() => {
        unmountComponentAtNode(wrapper);
        wrapper.remove();
        wrapper = null;
    });
    it("should render correctly", () => {
        act(() => { render(<HomePage />, wrapper) });
        expect(screen.getByText(/Home page/i)).toBeInTheDocument();
    });
});