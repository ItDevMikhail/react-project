import { act, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import RegisterPage from './index';
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
        ...render(<Provider store={store}><MemoryRouter><RegisterPage /></MemoryRouter></Provider>, wrapper), store
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
        expect(document.querySelector('.registerCard')).toBeInTheDocument();
    });
    it("should render correctly with disable button", () => {
        act(() => { renderWithRedux(wrapper) });
        expect(screen.getByRole('button')).toBeDisabled();
    });
    it("check login input validator (valid = /^[a-zA-Z]+([-_]?[a-z0-9]+){1,2}$/), activated after focus", () => {
        act(() => { renderWithRedux(wrapper); });
        const loginInput = document.querySelector('#login');
        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.queryByText(/некорректный логин/i)).toBeFalsy();
        userEvent.type(loginInput!, 'N');
        expect(loginInput).toHaveValue('N');
        expect(screen.getByText(/некорректный логин/i)).toBeInTheDocument();
    });
    it("check email input validator (valid = /.+@.+\..+/), activated after focus", () => {
        act(() => { renderWithRedux(wrapper); });
        const emailInput = document.querySelector('#email');
        userEvent.type(emailInput!, 'N.com');
        expect(emailInput).toHaveValue('N.com');
        expect(screen.getByText(/некорректный email/i)).toBeInTheDocument();
    });
    it("check password input validator (valid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/), activated after focus", () => {
        act(() => { renderWithRedux(wrapper); });
        const passInput = document.querySelector('#password');
        userEvent.type(passInput!, 'a8888888');
        expect(passInput).toHaveValue('a8888888');
        expect(screen.getByText(/некорректный пароль/i)).toBeInTheDocument();
    });
    it("check confpassword input validator (confpass=pass), activated after focus", () => {
        act(() => { renderWithRedux(wrapper); });
        const passInput = document.querySelector('#password');
        const confPassInput = document.querySelector('#confPassword');
        userEvent.type(passInput!, 'Aa888888');
        userEvent.type(confPassInput!, 'aa888888');
        expect(passInput).toHaveValue('Aa888888');
        expect(confPassInput).toHaveValue('aa888888');
        expect(screen.getByText(/пароли не совпадают/i)).toBeInTheDocument();
    });
    it("check valid form", () => {
        act(() => { renderWithRedux(wrapper); });
        expect(screen.getByRole('button')).toBeDisabled();
        userEvent.type(document.querySelector('#login')!, 'Login');
        userEvent.type(document.querySelector('#name')!, 'Name');
        userEvent.type(document.querySelector('#lastName')!, 'lName');
        userEvent.type(document.querySelector('#email')!, 'Na@gmail.com');
        userEvent.type(document.querySelector('#password')!, 'Na888888');
        userEvent.type(document.querySelector('#confPassword')!, 'Na888888');
        expect(screen.getByRole('button')).not.toBeDisabled();
    });
    it("check fumbit form", async () => {
        act(() => { renderWithRedux(wrapper); });
        userEvent.type(document.querySelector('#login')!, 'Login');
        userEvent.type(document.querySelector('#name')!, 'Name');
        userEvent.type(document.querySelector('#lastName')!, 'lName');
        userEvent.type(document.querySelector('#email')!, 'Na@gmail.com');
        userEvent.type(document.querySelector('#password')!, 'Na888888');
        userEvent.type(document.querySelector('#confPassword')!, 'Na888888');
        expect(screen.getByRole('button')).not.toBeDisabled();
        await act(async () => { userEvent.click(screen.getByRole('button')); });
        expect(fetch).toBeCalledTimes(1);
        const body = JSON.stringify({ login: "Login", name: "Name", lastName: "lName", email: "Na@gmail.com", password: "Na888888" });
        expect(fetch).toBeCalledWith("/api/users/reg",
            {
                method: "POST",
                body: body,
                headers: { "Content-Type": "application/json", "credentials": "include" }
            });
    });
});