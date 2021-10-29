import { render, screen } from '@testing-library/react';
import SearchInputComponent from './index';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('SearchInputComponent', () => {
    const fn = (val: any) => val.trim();
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
        act(() => {
            render(<SearchInputComponent onFilterChanged={fn} />, wrapper);
        })
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
    it("should onChange function", () => {
        act(() => {
            render(<SearchInputComponent onFilterChanged={fn} />, wrapper);
        });
        userEvent.type(screen.getByRole('textbox'), 'text');
        expect(screen.getByRole('textbox')).toHaveValue('text');
    });
    it("the button click should clear the input ", () => {
        act(() => {
            render(<SearchInputComponent onFilterChanged={fn} />, wrapper);
        });
        const clearBtn = document.querySelector('#searchBtn');
        expect(document.querySelector('#searchBtn')).toBeInTheDocument();
        if (clearBtn) {
            userEvent.click(clearBtn);
        }
        expect(screen.getByRole('textbox')).toHaveValue('');
    });
})