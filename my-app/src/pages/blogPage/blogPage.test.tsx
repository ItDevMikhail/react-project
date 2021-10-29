import { render, screen } from '@testing-library/react';
import BlogPage from './index';

import { unmountComponentAtNode } from 'react-dom';


describe('BlogPage', () => {
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
        render(<BlogPage />, wrapper);
        expect(document.querySelector('.blog')).toBeInTheDocument();
        expect(screen.getByText(/посты/i)).toBeInTheDocument();
    });
});