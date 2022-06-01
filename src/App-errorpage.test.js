import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter} from 'react-router-dom'
import App from './App'
import axios from "axios";

jest.mock('axios', () => {
    return {
        interceptors: {
            response: {
                use: jest.fn(),
                eject: jest.fn()
            }
        },
        get: jest.fn()
    }
})

describe('App', () => {
    it('navigates to error page then back when Go Back button is pressed', async () => {
        let onSuccess, onError
        axios.interceptors.response.use.mockImplementation((onFulfilled, onRejected) => {
            onSuccess = onFulfilled
            onError = onRejected
        })
        axios.get.mockImplementationOnce(() => {
            onError({
                response: {
                    status: 404
                }
            });
            return {
                status: 404
            }
        }).mockImplementationOnce(() => {
            onSuccess({
                response: {
                    status: 200,
                    data: {
                        title: 'Car',
                        description: 'nice car'
                    }
                }
            })
            return {
                status: 200,
                data: {
                    title: 'Car',
                    description: 'nice car'
                }
            }
        })


        renderApp()

        userEvent.click(screen.getByText('Start'))

        await waitFor(() => {
            expect(screen.getByText('This is error page')).toBeInTheDocument()
            expect(screen.getByText('Go Back')).toBeInTheDocument()
        })

        userEvent.click(screen.getByText('Go Back'))

        await waitFor(() => {
            expect(screen.getByText('Car')).toBeInTheDocument()
            expect(screen.getByText('nice car')).toBeInTheDocument()
        })
    })
})

const renderApp = () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App/>
        </MemoryRouter>
    )
}
