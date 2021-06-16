import fc from "fast-check";
import TODO from "../AddTODO.js";

// This test intentionally has a bug in it that you should fix.
// There is also a jslint error which should give a hint.
describe("AddTODO", function () {
    it("Sned request of adding new TODO", function () {
        fc.assert(fc.property(fc.string(), function (str) {
            var response = TODO.add(str);
            return response === 200;
        }));
    });
});
