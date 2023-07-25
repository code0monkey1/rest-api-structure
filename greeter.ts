export function greeter() {
  return {
    helloWorld: function () {
      return 'Hello World!';
    },
    helloPerson: function (name: string) {
      return `Hello ${name}!`;
    },
  };
}
