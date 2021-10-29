import { render, screen } from '@testing-library/react';
import BlogPostComponent from './index';
import { MemoryRouter, withRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { rootReducer } from '../../redux/reducers/rootReducer';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';


const todos = [
    { _id: '1', name: "Book1", description: 'Book1 descr' },
    { _id: '2', name: "Book2", description: 'Book3 descr' },
    { _id: '3', name: "Book3", description: 'Book3 descr' },
];

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid="location-display">{location.pathname}</div>
));

const store = createStore(rootReducer);
const renderWithRedux = (wrapper: any) => {
    return {
        ...render(<Provider store={store}><MemoryRouter><BlogPostComponent todos={todos} /><LocationDisplay /></MemoryRouter></Provider>, wrapper)
    };
};

describe('BlogPostComponent', () => {
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

    it('render correctly', () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        const item = screen.getAllByTestId("bookListItem");
        expect(item).toBeDefined();
    });
    it('should navigate to the detail page', () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        userEvent.click(screen.getByTestId(todos[2]._id));
        expect(screen.getByTestId("location-display")).toHaveTextContent(`/library/detail/${todos[2]._id}`);
    });
    it('should open Dialog modal', () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        expect(document.querySelector('#acceptBtn')).toBeFalsy();
        userEvent.click(screen.getByTestId(`deleteIcon${todos[2]._id}`));
        expect(document.querySelector('#acceptBtn')).toBeInTheDocument();
    });
})