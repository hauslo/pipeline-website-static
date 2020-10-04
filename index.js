const path = require("path");
const Ajv = require("ajv");
const fsp = require("fs").promises;

const ajv = new Ajv();

const validate = ajv.compile(require("./schema/options.schema.json"));

const renderTf = require("./lib/resource.tf.js");

module.exports = async options => {
    const resourceOptions = options.options || {};
    resourceOptions.public = resourceOptions.public || "public";
    resourceOptions.region = resourceOptions.region || "eu-west-3";

    await fsp.writeFile(
        path.join(options.paths.repo, options.paths.build, `${options.id}.tf`),
        renderTf(options)
    );
};

module.exports.validate = (options = {}) => {
    if (!validate(options)) {
        const err = new Error("Invalid pipeline options");
        err.validationErrors = validate.errors;
        throw err;
    }
};

module.exports.versionCompatibility = "0.1.x";
