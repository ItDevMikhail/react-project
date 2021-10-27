import React from 'react';
import { act, render, screen } from '@testing-library/react';
import BookDetModalComponent from './index';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { unmountComponentAtNode } from 'react-dom';


const favorite = [
    { _id: '1', name: "Angular", description: "AngularAngular" },
    { _id: '2', name: "React", description: "ReactReact" },
    { _id: '3', name: "Vue", description: "VueVue", picture: '1633614832815.jpg' },
];
let index = 2;
let open = true;
const changeHandler = (index: number) => {
    open = !open;
};

const renderWithRouter = (
    component: any,
    wrapper: any,
    {
        history = createMemoryHistory({ initialEntries: ['/'] })
    } = {},
) => {

    const Wrapper = ({ children }: any) => (
        <Router history={history}>{children}</Router>
    );
    return {
        ...render(component, { wrapper: Wrapper }),
        history,
        wrapper
    };
};

describe('BookDetModalComponent', () => {
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
            renderWithRouter(<BookDetModalComponent index={index} favoriteBooks={favorite} open={open} changeHandler={changeHandler} />, wrapper);
        })
        expect(document.querySelector('.bookDetModalContent')).toBeInTheDocument();
    })
    it("Click by 'element' should close the modal (open = false)", () => {
        act(() => {
            renderWithRouter(<BookDetModalComponent index={index} favoriteBooks={favorite} open={open} changeHandler={changeHandler} />, wrapper);
        })
        userEvent.click(screen.getByTestId('element'));
        expect(open).toBeFalsy();
    });
})