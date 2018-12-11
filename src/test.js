const { curry } = require("./index");
const { expect } = require("chai");
const sinon = require("sinon");

describe("tiny-curry", () => {
  it("should default the number of intermediate functions to the arity of the function if no second parameter is passed", () => {
    const fn = sinon.spy(function(a, b) {});
    const curriedFn = curry(fn);
    expect(fn.called).to.be.false;
    const intermediateFn = curriedFn();
    expect(fn.called).to.be.false;
    intermediateFn();
    expect(fn.called).to.be.true;
  });
  it("should return the value of the function with the currently gathered arguments when '.value()' is called", () => {
    const curriedMax = curry(Math.max, Infinity);
    expect(curriedMax(5)(3)(88)(9)(100)(17).value()).to.equal(100);
  });
  describe("should default the number of intermediate functions to the arity of the function if the second parameter is not a positive integer", () => {
    [
      0,
      -1,
      -999999,
      "foo",
      true,
      false,
      NaN,
      [1, 2, 3, 4, 5],
      [],
      {},
      { a: 1, b: 2 },
      null,
      undefined
    ].forEach(arity => {
      it(`should use the arity of the function instead of ${arity}`, () => {
        const fn = sinon.spy(function(a, b) {});
        const curriedFn = curry(fn, arity);
        expect(fn.called).to.be.false;
        const intermediateFn = curriedFn();
        expect(fn.called).to.be.false;
        intermediateFn();
        expect(fn.called).to.be.true;
      });
    });
  });
  describe("should allow the maximum number of intermediate functions to be overwritten by a positive integer", () => {
    it("should set the number of intermediate functions to 1", () => {
      const fn = sinon.spy(function(a, b) {});
      const curriedFn = curry(fn, 1);
      expect(fn.called).to.be.false;
      curriedFn();
      expect(fn.called).to.be.true;
    });
    it("should set the number of intermediate functions to 3", () => {
      const fn = sinon.spy(function(a, b) {});
      const curriedFn = curry(fn, 3);
      expect(fn.called).to.be.false;
      const intermediateFn = curriedFn();
      expect(fn.called).to.be.false;
      const secondIntermediateFn = intermediateFn();
      expect(fn.called).to.be.false;
      secondIntermediateFn();
      expect(fn.called).to.be.true;
    });
  });
});
