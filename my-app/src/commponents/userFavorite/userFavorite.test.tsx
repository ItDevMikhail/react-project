import { render, screen } from '@testing-library/react';
import UserFavoriteComponent from './index';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// jest.mock('./../bookDetModal/index', () => {
//     return function DummyBookDetModalComponent(props: any) {
//         return (
//             <div data-testid="bookDetModal">
//                 {props.favoriteBooks}:{props.index}:{props.changeHandler}:{props.open}
//             </div>
//         );
//     };
// });
// import BookDetModalComponent from './../bookDetModal/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../redux/reducers/rootReducer';
import { MemoryRouter } from 'react-router';


const renderWithRedux = (
    wrapper: any,
    { initialState, store = createStore(rootReducer, initialState) }: any = {}
) => {
    return {
        ...render(<Provider store={store}><MemoryRouter><UserFavoriteComponent /></MemoryRouter></Provider>), store
    };
};

describe('UserFavoriteComponent', () => {
    let wrapper: any = null;
    let dataUser: Array<any>;
    beforeEach(() => {
        wrapper = document.createElement("div");
        document.body.appendChild(wrapper);
        dataUser = [{ _id: '1', name: 'Books one', description: 'Description book 1' },
        { _id: '2', name: 'Books two', description: 'Description book 2' }];
    });

    afterEach(() => {
        unmountComponentAtNode(wrapper);
        wrapper.remove();
        wrapper = null;
        dataUser = [{}];
    });
    it("should render correctly", () => {
        act(() => {
            renderWithRedux(wrapper, { initialState: { favorite: { dataUser: dataUser } } });
        });
        expect(screen.getByText(dataUser[0].name)).toBeInTheDocument();
        expect(screen.getByText(dataUser[1].name)).toBeInTheDocument();
    });
    it("check render without favorite books", () => {

        act(() => {
            renderWithRedux(wrapper);
        });
        expect(screen.getByText('У вас нет избранных книг')).toBeInTheDocument();
    });
    it("should open modal component", () => {
        act(() => {
            renderWithRedux(wrapper, { initialState: { favorite: { dataUser: dataUser } } });
        });
        expect(document.querySelector('.bookDetModal')).toBeFalsy();
        userEvent.click(screen.getByText(dataUser[0].name));
        expect(document.querySelector('.bookDetModal')).toBeTruthy();
    });
});