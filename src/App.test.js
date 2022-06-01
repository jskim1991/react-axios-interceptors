import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter} from 'react-router-dom'
import App from './App'
import * as HttpClient from './component/HttpClient'

describe('App', () => {
    it('happy path', async () => {
        jest.spyOn(HttpClient, 'get').mockResolvedValue({
            title: 'Car',
            description: 'nice car',
        })

        renderApp()

        userEvent.click(screen.getByText('Start'))

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
