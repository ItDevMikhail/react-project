import { act, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import LibraryPage from './index';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from '../../redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import MockSearchInputComponent from "../../commponents/searchInput";
import MockBooksListComponent from "../../commponents/booksList";
import thunk from 'redux-thunk';



jest.mock("../../commponents/booksList", () => {
    return function FakeBooksListComponent() {
        return (
            <div data-testid="BookList">0</div>
        );
    };
});
jest.mock("../../commponents/searchInput", () => {
    return function FakeSearchInputComponent() {
        return (
            <div data-testid="SearchInput">0</div>
        );
    };
});

const renderWithRedux = (
    wrapper: any,
    { initialState, store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk))) }: any = {}
) => {
    return {
        ...render(<Provider store={store}><LibraryPage /></Provider>, wrapper), store
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
    it("should render correctly", async () => {
        await act(async () => { renderWithRedux(wrapper) });
        expect(screen.getByText(/Library page/i)).toBeInTheDocument();
    });
    it("check fetched request", async () => {
        await act(async () => { renderWithRedux(wrapper) });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("/api/library/favorite", { "method": "GET", "body": null, "headers": { "Content-Type": "application/json", "credentials": "include" } });
    });
});