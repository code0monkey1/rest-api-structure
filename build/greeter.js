'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.greeter = void 0;
function greeter() {
  return {
    helloWorld: function () {
      return 'Hello World!';
    },
    helloPerson: function (name) {
      return `Hello ${name}!`;
    },
  };
}
exports.greeter = greeter;
