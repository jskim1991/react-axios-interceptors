import ErrorPage from "./ErrorPage";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Error Page', () => {
    it('should render error content', () => {
        render(<ErrorPage />)

        expect(screen.getByText('This is error page')).toBeInTheDocument()
    });

    it('should go back to previous page when button is clicked', () => {
        render(<ErrorPage />)

        userEvent.click(screen.getByText('Go Back'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    });
})
