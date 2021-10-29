import { render, screen } from '@testing-library/react';
import AddBookPage from './index';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { createStore } from 'redux';
import { rootReducer } from '../../redux/reducers/rootReducer';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

const renderWithRedux = (
    wrapper: any,
    { initialState, store = createStore(rootReducer, initialState) }: any = {}
) => {
    return {
        ...render(<Provider store={store}><MemoryRouter><AddBookPage /></MemoryRouter></Provider>, wrapper), store
    };
};

describe('AddBookPage', () => {
    const dataMock = {
        name: "Book name",
        description: "Description for this book",
    };
    let wrapper: any = null;
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementationOnce((): Promise<any> =>
            Promise.resolve({
                json: () => Promise.resolve(dataMock),
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
        act(() => { renderWithRedux(wrapper); });
        expect(document.querySelector('.loginCard')).toBeInTheDocument();
    });
    it("should submit button is disabled", () => {
        act(() => { renderWithRedux(wrapper); });
        expect(screen.getByRole('button')).toBeDisabled();
    });
    it("check name input validator (length>2)", () => {
        act(() => { renderWithRedux(wrapper); });
        const nameInput = document.querySelector('#name');
        expect(document.querySelector('.addBookInput .addBookInputName')).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        userEvent.type(nameInput!, 'Na');
        expect(nameInput).toHaveValue('Na');
        expect(document.querySelector('.addBookInput .addBookInputName')).toBeInTheDocument();
        userEvent.type(nameInput!, 'Name');
        expect(document.querySelector('.addBookInput .addBookInputName')).toBeFalsy();
    });
    it("check description textarea validator (length>4)", () => {
        act(() => { renderWithRedux(wrapper); });
        const textArea = document.querySelector('#description');
        expect(document.querySelector('.addBookInput .createBookArea')).toBeInTheDocument();
        expect(textArea).toBeInTheDocument();
        userEvent.type(textArea!, 'inva');
        expect(textArea).toHaveValue('inva');
        expect(document.querySelector('.addBookInput .createBookArea')).toBeInTheDocument();
        userEvent.type(textArea!, 'Description valid');
        expect(document.querySelector('.addBookInput .createBookArea')).toBeFalsy();
    });
    it("should submit button is not disabled", () => {
        act(() => { renderWithRedux(wrapper); });
        expect(screen.getByRole('button')).toBeDisabled();
        const nameInput = document.querySelector('#name');
        const textArea = document.querySelector('#description');
        userEvent.type(nameInput!, 'Name');
        userEvent.type(textArea!, 'Description valid');
        expect(nameInput).toHaveValue('Name');
        expect(textArea).toHaveValue('Description valid');
        expect(screen.getByRole('button')).not.toBeDisabled();
    });
    it("fetched form", async () => {
        act(() => { renderWithRedux(wrapper); });
        const nameInput = document.querySelector('#name');
        const textArea = document.querySelector('#description');
        const formData = new FormData();
        userEvent.type(nameInput!, dataMock.name);
        userEvent.type(textArea!, dataMock.description);
        formData.append('book', JSON.stringify(dataMock));
        expect(screen.getByRole('button')).not.toBeDisabled();
        await act(async () => { userEvent.click(screen.getByRole('button')); });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/library/add', { method: 'POST', body: formData, headers: {} });
    });
});