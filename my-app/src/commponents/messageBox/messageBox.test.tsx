import { render, screen } from '@testing-library/react';
import MessageBoxComponent from './index';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import { rootReducer } from '../../redux/reducers/rootReducer';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

const renderWithRedux = (
    wrapper: any,
    { initialState, store = createStore(rootReducer, initialState) }: any = {}
) => {
    return {
        ...render(<Provider store={store}><MessageBoxComponent /></Provider>, wrapper), store
    };
};

describe('MessageBoxComponent', () => {
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
        const errorMessage = 'error description';
        act(() => {
            renderWithRedux(wrapper, { initialState: { fetch: { error: errorMessage } }, });
        });
        expect(document.querySelector('.messageBox')).toBeInTheDocument();
        const reg = new RegExp(errorMessage, 'i');
        expect(screen.getByText(reg)).toBeInTheDocument();
    });
    it("should not render", () => {
        act(() => {
            const { container } = renderWithRedux(wrapper, { initialState: { fetch: { error: null } }, });
        });
        expect(document.querySelector('.messageBox')).toBeFalsy();
    });
})