test("Initial test", () => {
   expect(2).toEqual(3).to;
});

//https://jestjs.io/docs/mock-functions
//forEach.test.js
//import { forEach } from './forEach';

//const mockCallback = jest.fn(x => 42 + x);

//test('forEach mock function', () => {
//    forEach([0, 1], mockCallback);

//    // The mock function was called twice
//    expect(mockCallback.mock.calls).toHaveLength(2);

//    // The first argument of the first call to the function was 0
//    expect(mockCallback.mock.calls[0][0]).toBe(0);

//    // The first argument of the second call to the function was 1
//    expect(mockCallback.mock.calls[1][0]).toBe(1);

//    // The return value of the first call to the function was 42
//    expect(mockCallback.mock.results[0].value).toBe(42);
//});

//const myMock = jest.fn();
//console.log(myMock());
//// > undefined

//myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

//console.log(myMock(), myMock(), myMock(), myMock());
//// > 10, 'x', true, true

//import axios from 'axios';
//import Users from './users';

//jest.mock('axios');

//test('should fetch users', () => {
//    const users = [{ name: 'Bob' }];
//    const resp = { data: users };
//    axios.get.mockResolvedValue(resp);

//    // or you could use the following depending on your use case:
//    // axios.get.mockImplementation(() => Promise.resolve(resp))

//    return Users.all().then(data => expect(data).toEqual(users));
//});

//jest.mock('../foo'); // this happens automatically with automocking
//const foo = require('../foo');

//// foo is a mock function
//foo.mockImplementation(() => 42);
//foo();
//// > 42

//beforeEach(() => {
//    initializeCityDatabase();
//});

//afterEach(() => {
//    clearCityDatabase();
//});

//test('city database has Vienna', () => {
//    expect(isCity('Vienna')).toBeTruthy();
//});

//test('city database has San Juan', () => {
//    expect(isCity('San Juan')).toBeTruthy();
//});

//beforeAll(() => {
//    return initializeCityDatabase();
//});

//afterAll(() => {
//    return clearCityDatabase();
//});

//test('city database has Vienna', () => {
//    expect(isCity('Vienna')).toBeTruthy();
//});

//test('city database has San Juan', () => {
//    expect(isCity('San Juan')).toBeTruthy();
//});

//describe('matching cities to foods', () => {
//    // Applies only to tests in this describe block
//    beforeEach(() => {
//        return initializeFoodDatabase();
//    });

//    test('Vienna <3 veal', () => {
//        expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
//    });

//    test('San Juan <3 plantains', () => {
//        expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
//    });
//});

//test('the data is peanut butter', () => {
//    return expect(fetchData()).resolves.toBe('peanut butter');
//});

https://jestjs.io/docs/tutorial-jquery

//'use strict';

//jest.mock('../fetchCurrentUser');

//test('displays a user after a click', () => {
//    // Set up our document body
//    document.body.innerHTML =
//        '<div>' +
//        '  <span id="username" />' +
//        '  <button id="button" />' +
//        '</div>';

//    // This module has a side-effect
//    require('../displayUser');

//    const $ = require('jquery');
//    const fetchCurrentUser = require('../fetchCurrentUser');

//    // Tell the fetchCurrentUser mock function to automatically invoke
//    // its callback with some data
//    fetchCurrentUser.mockImplementation(cb => {
//        cb({
//            fullName: 'Johnny Cash',
//            loggedIn: true,
//        });
//    });

//    // Use jquery to emulate a click on our button
//    $('#button').click();

//    // Assert that the fetchCurrentUser function was called, and that the
//    // #username span's inner text was updated as we'd expect it to.
//    expect(fetchCurrentUser).toHaveBeenCalled();
//    expect($('#username').text()).toBe('Johnny Cash - Logged In');
//});