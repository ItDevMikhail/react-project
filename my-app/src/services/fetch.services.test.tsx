import { CheckAuth, FetchApi } from './fetch.services';


describe('fetch Services', () => {
    const data = {
        name: "Joni Baez",
        age: "32",
        address: "123, Charming Avenue",
    };
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementationOnce((): Promise<any> =>
            Promise.resolve({
                json: () => Promise.resolve(data),
                status: 200,
                ok: true
            })
        );
    })

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('fetches from FetchApi function', async () => {
        await FetchApi('urlstring', 'GET');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('urlstring', { method: 'GET', body: null, headers: { 'Content-Type': 'application/json', credentials: 'include' } });
    });
    it('fetches from CheckAuth function', async () => {
        await CheckAuth();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/users/auth', { method: 'GET', body: null, headers: { credentials: 'include' } });
    });
})