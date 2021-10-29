import { act, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import LoginPage from './index';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from '../../redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';



const renderWithRedux = (
    wrapper: any,
    { initialState, store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk))) }: any = {}
) => {
    return {
        ...render(<Provider store={store}><MemoryRouter><LoginPage /></MemoryRouter></Provider>, wrapper), store
    };
};


describe('LibraryPage', () => {
    let wrapper: any = null;
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementationOnce((): Promise<any> =>
            Promise.resolve({
                json: () => Promise.resolve({ data: 'random data' }),
                status: 200,
                ok: true
            })
        );
        wrapper = document.createElement("div");
        document.body.appendChild(wrapper);
    });
    afterEach(() => {
        jest.clearAllMocks();
        unmountComponentAtNode(wrapper);
        wrapper.remove();
        wrapper = null;
    });
    it("should render correctly", () => {
        act(() => { renderWithRedux(wrapper) });
        expect(document.querySelector('.loginCard')).toBeInTheDocument();
    });
    it("should render correctly with disable button", () => {
        act(() => { renderWithRedux(wrapper) });
        expect(screen.getByRole('button')).toBeDisabled();
    });
    it("check input validator (not empty)", () => {
        act(() => { renderWithRedux(wrapper); });
        const nameInput = document.querySelector('#login');
        const passwordInput = document.querySelector('#password');
        expect(screen.getByRole('button')).toBeDisabled();
        userEvent.type(nameInput!, 'Na');
        expect(nameInput).toHaveValue('Na');
        userEvent.type(passwordInput!, 'pass');
        expect(passwordInput).toHaveValue('pass');
        expect(screen.getByRole('button')).not.toBeDisabled();
    });
    it("check fumbit form", async () => {
        act(() => { renderWithRedux(wrapper); });
        const loginText = 'isLOGIN';
        const passwordText = 'isPASS';
        userEvent.type(document.querySelector('#login')!, loginText);
        userEvent.type(document.querySelector('#password')!, passwordText);
        expect(screen.getByRole('button')).not.toBeDisabled();
        await act(async () => { userEvent.click(screen.getByRole('button')); });
        expect(fetch).toBeCalledTimes(1);
        const body = JSON.stringify({ login: loginText, password: passwordText });
        expect(fetch).toBeCalledWith("/api/users/login",
            {
                method: "POST",
                body: body,
                headers: { "Content-Type": "application/json", "credentials": "include" }
            });
    });
});