import { act, render, screen } from '@testing-library/react';
import DashBoardPage from './index';
import { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router';
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from '../../redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MockUserDataComponent from '../../commponents/userData/index';



const renderWithRedux = (
    wrapper: any,
    { initialState, store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk))) }: any = {}
) => {
    return {
        ...render(<Provider store={store}><MemoryRouter><DashBoardPage /></MemoryRouter></Provider>, wrapper), store
    };
};
jest.mock("../../commponents/userData/index", () => {
    return function FakeUserDataComponent() {
        return (
            <div data-testid="userData">
                0
            </div>
        );
    };
});
describe('DashBoardPage', () => {
    const fakedata = [{ _id: '1', name: 'Books one', description: 'Description book 1' },
    { _id: '2', name: 'Books two', description: 'Description book 2' }];
    let wrapper: any = null;
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementationOnce((): Promise<any> =>
            Promise.resolve({
                json: () => Promise.resolve(fakedata),
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
    it("should render correctly with fetched response", async () => {
        await act(async () => {
            renderWithRedux(wrapper);
        });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("/api/library/dashboard", { "method": "GET", "body": null, "headers": { "Content-Type": "application/json", "credentials": "include" } });
        expect(screen.getByText(fakedata[0].name)).toBeInTheDocument();
    });
});