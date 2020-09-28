
const path = require("path");
const fsp = require("fs").promises;
const fse = require("fs-extra");

const Terraunit = require("terraunit");
const terraunit = new Terraunit({
    port: 9999
});

const chai = require("chai");
chai.use(require("chai-as-promised"));
const { assert } = chai;

const { version: VERSION, name: NAME } = require("../package.json");

const pipeline = require("../index");
const { validate, versionCompatibility } = pipeline;

const KEEP_TEST_ARTIFACTS = true;


describe(".versionCompatibility", () => {
    it("should export a semver condition", () => {
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
        assert.doesNotThrow(() => validate({ "public": "public" }));
    });
    it("shouldn't accept objects with a single prop that is not 'public'", () => {
        assert.throws(() => validate({ "unexpectedOption": true }));
    });
    it("shouldn't accept objects with more than the 'public' prop", () => {
        assert.throws(() => validate({ "public": "public", "unexpectedOption": true }));
    });
    it("shouldn't accept anything that is not the above", () => {
        assert.throws(() => validate("public"));
        assert.throws(() => validate(0));
        assert.throws(() => validate(null));
        assert.throws(() => validate(() => { }));
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
            infra: "terraform",
            _infra: "..",
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
        await fsp.writeFile(path.join(__dirname, ".test", "src", "public", "index.html"), "Hello World !\n");
        await fse.mkdirp(path.join(__dirname, ".test", "build"));
    });

    it("shouldn't throw", async () => {
        await assert.isFulfilled(pipeline(options));
    });
    it("should have worked /o/");
});

describe("terraform", () => {
    before(async () => {
        return terraunit.start();
    });
    after(async () => {
        if (!KEEP_TEST_ARTIFACTS) {
            await fse.remove(path.join(__dirname, ".test"));
            //await fse.remove(path.join(__dirname, "..", "__terraunit__"));
        }
        return terraunit.stop();
    });

    describe("plan", () => {
        it("does not throw", async () => {
            await assert.isFulfilled(terraunit.plan({
                configurations: [
                    {
                        workingDirectory: path.resolve(__dirname, "..")
                    },
                    {
                        mockProviderType: "aws"
                    }, {
                        content: await fsp.readFile(path.resolve(__dirname, ".test", "build", "terraform", "test__website_static__test.tf"))
                    }
                ]
            }).catch(err => {
                console.error(err.stderr);
                throw err;
            }));
        }).timeout(60000);
    });
});