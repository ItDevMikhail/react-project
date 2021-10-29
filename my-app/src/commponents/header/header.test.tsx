import { render, screen } from '@testing-library/react';
import Header from './index';
import { MemoryRouter, withRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { rootReducer } from '../../redux/reducers/rootReducer';
import { ADD_BOOK_ROUTE, BLOG_ROUTE, DASHBOARD_ROUTE, HOMEPAGE_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, REGISTRATION_ROUTE } from "../../models/const";
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

const renderWithRedux = (
    wrapper: any,
    { initialState, store = createStore(rootReducer, initialState) }: any = {}
) => {
    return {
        ...render(<Provider store={store}><MemoryRouter><Header /><LocationDisplay /></MemoryRouter></Provider>, wrapper), store
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
    it('should render private + public content', () => {
        act(() => {
            renderWithRedux(wrapper, { initialState: { user: { isAuth: true } }, });
        })
        expect(screen.getByText(/library/i)).toBeInTheDocument();
        expect(screen.getByText(/logout/i)).toBeInTheDocument();
        expect(screen.queryByText(/login/i)).toBeNull();

    });
    it("should navigate to the home page", () => {
        act(() => {
            renderWithRedux(wrapper); // isAuth default = true
        })
        userEvent.click(screen.getByText(/home/i));
        expect(screen.getByTestId("location-display")).toHaveTextContent(HOMEPAGE_ROUTE);
    });
    it("should navigate to the Library page", () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        const link = screen.getByText(/library/i);
        expect(link).not.toHaveClass('selected');
        userEvent.click(link);
        expect(link).toHaveClass('selected');
        expect(screen.getByTestId("location-display")).toHaveTextContent(LIBRARY_ROUTE);
    });
    it("should navigate to the Add book page", () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        const link = screen.getByText(/add book/i);
        expect(link).not.toHaveClass('selected');
        userEvent.click(link);
        expect(link).toHaveClass('selected');
        expect(screen.getByTestId("location-display")).toHaveTextContent(ADD_BOOK_ROUTE);
    });
    it("should navigate to the Blog page", () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        const link = screen.getByText(/blog/i);
        expect(link).not.toHaveClass('selected');
        userEvent.click(link);
        expect(link).toHaveClass('selected');
        expect(screen.getByTestId("location-display")).toHaveTextContent(BLOG_ROUTE);
    });
    it("should navigate to the Dashboard page", () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        const link = screen.getByText(/dashboard/i);
        expect(link).not.toHaveClass('selected');
        userEvent.click(link);
        expect(link).toHaveClass('selected');
        expect(screen.getByTestId("location-display")).toHaveTextContent(DASHBOARD_ROUTE);
    });
    it("should navigate to the login page after click logout link", () => {
        act(() => {
            renderWithRedux(wrapper);
        })
        expect(screen.getByText(/logout/i)).toBeDefined();
        userEvent.click(screen.getByText(/logout/i));
        expect(screen.queryByText(/logout/i)).toBeNull();
        expect(screen.getByTestId("location-display")).toHaveTextContent(LOGOUT_ROUTE);
    });
    it("should render only public content", () => {
        act(() => {
            renderWithRedux(wrapper, { initialState: { user: { isAuth: false } }, });
        });
        expect(screen.getByTestId('login')).toBeInTheDocument();
        expect(screen.getByTestId('register')).toBeInTheDocument();
    });
    it("should navigate to the login page in the public content", () => {
        act(() => {
            renderWithRedux(wrapper, { initialState: { user: { isAuth: false } }, });
        });
        const link = screen.getByTestId('login');
        expect(link).not.toHaveClass('selected');
        userEvent.click(link);
        expect(link).toHaveClass('selected');
        expect(screen.getByTestId("location-display")).toHaveTextContent(LOGIN_ROUTE);
    });
    it("should navigate to the register page in the public content", () => {
        act(() => {
            renderWithRedux(wrapper, { initialState: { user: { isAuth: false } }, });
        });
        const link = screen.getByTestId('register');
        expect(link).not.toHaveClass('selected');
        userEvent.click(link);
        expect(link).toHaveClass('selected');
        expect(screen.getByTestId("location-display")).toHaveTextContent(REGISTRATION_ROUTE);
    });
})