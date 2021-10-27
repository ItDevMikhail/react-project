import React from 'react';
import { render } from '@testing-library/react';
import BlogPostComponent from './index';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('BlogPostComponent', () => {
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
    it('render correctly', () => {
        act(() => {
            render(<BlogPostComponent />, wrapper);
        })
        expect(document.querySelector('.blogContent')).toBeInTheDocument();

    })
})