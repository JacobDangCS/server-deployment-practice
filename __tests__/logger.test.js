'use strict';

const logger = require('../src/middleware/logger');

describe('Logger middleware', () => {
    let consoleSpy;
    let req = {};
    let res = {};
    let next = jest.fn(); //mocks the 'next' method
    beforeEach(() => {
        //attach a spy to console
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    afterEach(() => {
        //removes spy
        consoleSpy.mockRestore();
    });

    it('adds a timestamp', () => {
        logger(req, res, next);
        expect(req.timestamp).toBeTruthy();
        expect(req.timestamp).toBeInstanceOf(Date);
        expect(typeof(req.timestamp)).toEqual('object');
    });

    it('logs as expected', () => {
        logger(req, res, next);
        expect(consoleSpy).toHaveBeenCalledWith('logged at', req.timestamp);
    });

    it('calls next as expected', () => {
        logger(req, res, next);
        expect(next).toHaveBeenCalledWith();
        expect(next).not.toHaveBeenCalledWith('this should fail');
    });
})