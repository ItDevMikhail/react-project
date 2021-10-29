import { act, render, screen } from '@testing-library/react';
import BookDetailPage from './index';
import { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router';
import { createStore } from 'redux';
import { rootReducer } from '../../redux/reducers/rootReducer';
import { Provider } from 'react-redux';


const renderWithRouter = (
    wrapper: any,
    { initialState, store = createStore(rootReducer, initialState) }: any = {}
) => {
    return {
        ...render(<Provider store={store}><MemoryRouter><BookDetailPage /></MemoryRouter></Provider>, wrapper), store
    };
};

describe('BookDetailPage', () => {
    const dataMock = {
        _id: "1",
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
    it("should render correctly with fetched response", async () => {
        await act(async () => { renderWithRouter(wrapper); });
        const dataName = new RegExp(dataMock.name, 'i');
        const dataDescritption = new RegExp(dataMock.description, 'i');
        expect(document.querySelector('.detailPage')).toBeInTheDocument();
        expect(screen.getByText(dataName)).toBeInTheDocument();
        expect(screen.getByText(dataDescritption)).toBeInTheDocument();
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});