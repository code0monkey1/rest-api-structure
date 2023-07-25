import { greeter } from './greeter';

describe('greeter', () => {
  it('greeter is defined', () => {
    // Arrange
    const sut = greeter;
    //Act

    //Assert
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(Function);
  });

  it("greeter functions' hello world return `hello world` ", () => {
    // Arrange
    const sut = greeter();
    //Act
    const received = sut.helloWorld();
    const expected = 'Hello World!';
    //Assert
    expect(received).toBe(expected);
  });

  it('helloPerson function with no name should return `Hello!`', () => {
    // Arrange
    const sut = greeter();

    //Act
    const received = sut.helloPerson('');
    const expected = `Hello !`;

    //Assert
    expect(received).toBe(expected);
  });
});
