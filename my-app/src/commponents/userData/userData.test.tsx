import { render, screen } from '@testing-library/react';
import UserDataComponent from './index';
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
        ...render(<Provider store={store}><UserDataComponent /></Provider>, wrapper), store
    };
};

describe('UserDataComponent', () => {
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
        act(() => {
            renderWithRedux(wrapper, { initialState: { user: { data: { login: 'IvanLog', name: 'IvanNam', lastName: 'IvanLNam', email: 'IvanEmail' } } } });
        })
        expect(screen.queryByText(/My login/i)).toBeInTheDocument();
        expect(screen.queryByText(/My name/i)).toBeInTheDocument();
        expect(screen.queryByText(/My lName/i)).toBeInTheDocument();
        expect(screen.queryByText(/My email/i)).toBeInTheDocument();
        expect(screen.getByText('IvanLog')).toBeInTheDocument();
        expect(screen.getByText('IvanNam')).toBeInTheDocument();
        expect(screen.getByText('IvanLNam')).toBeInTheDocument();
        expect(screen.getByText('IvanEmail')).toBeInTheDocument();
    });
    it("Dont should render without props", () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        expect(screen.queryByText(/My login/i)).toBeFalsy();
        expect(screen.queryByText(/My name/i)).toBeFalsy();
        expect(screen.queryByText(/My lName/i)).toBeFalsy();
        expect(screen.queryByText(/My email/i)).toBeFalsy();
    });
});