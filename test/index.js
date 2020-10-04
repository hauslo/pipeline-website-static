/* eslint-env mocha */

const path = require("path");
const fsp = require("fs").promises;
const fse = require("fs-extra");

const chai = require("chai");
chai.use(require("chai-as-promised"));

const { assert } = chai;

const { version: VERSION, name: NAME } = require("../package.json");

const pipeline = require("../index");

const { validate, versionCompatibility } = pipeline;

describe(".versionCompatibility", () => {
    it("should export a valid semver condition", () => {
        assert.isString(versionCompatibility);
    });
});

describe(".validate()", () => {
    it("should accept undefined (options are optional)", () => {
        assert.doesNotThrow(() => validate(undefined));
    });
    it("should accept objects without props (optional options are still optional)", () => {
        assert.doesNotThrow(() => validate({}));
    });
    it("should accept objects with a single prop 'public'", () => {
        assert.doesNotThrow(() => validate({ public: "public" }));
    });
    it("should accept objects with a single prop 'region'", () => {
        assert.doesNotThrow(() => validate({ region: "eu-west-3" }));
    });
    it("should accept objects with the props 'region' and 'public'", () => {
        assert.doesNotThrow(() =>
            validate({ region: "eu-west-3", public: "public" })
        );
    });
    it("shouldn't accept objects with a props other than 'public' or 'region'", () => {
        assert.throws(() => validate({ unexpectedOption: true }));
    });
    it("shouldn't accept anything that is not the above", () => {
        assert.throws(() => validate("public"));
        assert.throws(() => validate(0));
        assert.throws(() => validate(null));
        assert.throws(() => validate(() => {}));
        assert.throws(() => validate([]));
    });
});

describe("pipeline()", () => {
    const options = {
        version: VERSION,
        namespace: "test",
        module: NAME,
        name: "test",
        paths: {
            repo: path.resolve(__dirname, ".."),
            src: "test/.test/src",
            _src: "../../..",
            build: "test/.test/build",
            _build: "../../..",
            res: "test",
            _res: ".."
        },
        options: {
            public: "public"
        },
        id: `test__website_static__test`,
        domain: `test.website-static.test`
    };

    before(async () => {
        await fse.mkdirp(path.join(__dirname, ".test", "src", "public"));
        await fsp.writeFile(
            path.join(__dirname, ".test", "src", "public", "index.html"),
            "<p>Hello World !</p>\n"
        );
        await fse.mkdirp(path.join(__dirname, ".test", "build"));
    });
    after(async () => {
        await fse.remove(path.join(__dirname, ".test"));
    });

    it("shouldn't throw", async () => {
        await assert.isFulfilled(pipeline(options));
    });
});
