import { act, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import ErrorPage from './index';

describe('ErrorPage', () => {
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
    it("should render correctly with props", () => {
        act(() => { render(<ErrorPage errorMess='Any message' />, wrapper) });
        expect(screen.getByText(/Any message/i)).toBeInTheDocument();
    });
});