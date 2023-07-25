"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greeter_1 = require("./greeter");
describe('greeter', () => {
    it('greeter is defined', () => {
        // Arrange
        const sut = greeter_1.greeter;
        //Act
        //Assert
        expect(sut).toBeDefined();
        expect(sut).toBeInstanceOf(Function);
    });
    it("greeter functions' hello world return `hello world` ", () => {
        // Arrange
        const sut = (0, greeter_1.greeter)();
        //Act
        const received = sut.helloWorld();
        const expected = 'Hello World!';
        //Assert
        expect(received).toBe(expected);
    });
    it('helloPerson function with no name should return `Hello!`', () => {
        // Arrange
        const sut = (0, greeter_1.greeter)();
        //Act
        const received = sut.helloPerson('');
        const expected = `Hello !`;
        //Assert
        expect(received).toBe(expected);
    });
});
