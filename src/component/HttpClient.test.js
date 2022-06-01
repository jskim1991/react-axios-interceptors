import {get, setupResponseInterceptor} from "./HttpClient";
import axios from "axios";

const mockNavigate = jest.fn()

describe('Http Client', () => {
    beforeEach(() => {
        setupResponseInterceptor(mockNavigate)
    })

    it('should return data from response', async () => {
        jest.spyOn(axios, 'get')
            .mockResolvedValue({
                data: 'return value'
            })

        const data = await get('/path')

        expect(data).toEqual('return value')
    });

    it('should return data onFulfilled', async () => {
        await expect(axios.interceptors.response.handlers[0].fulfilled({data: 'car'})).toEqual({data: 'car'})
    });

    it('should return error when status code is not 404', async () => {
        const error = {
            response: {
                status: 500
            }
        }
        await expect(axios.interceptors.response.handlers[0].rejected(error)).rejects.toEqual(error)
    });

    it('should navigate to error page when status code is 404', () => {
        const error = {
            response: {
                status: 404
            }
        }

        axios.interceptors.response.handlers[0].rejected(error)

        expect(mockNavigate).toHaveBeenCalledWith('/error')
    });
})