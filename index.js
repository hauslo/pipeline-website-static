const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv();

const { writeFile } = require("@hauslo/pipeline-util");
const validate = ajv.compile(require("./schema/options.schema.json"));

const renderTf = require("./lib/resource.tf.js");

module.exports = async options => {
    const resourceOptions = options.options || {};
    resourceOptions.public = resourceOptions.public || "public";

    await writeFile(
        path.join(
            options.paths.repo,
            options.paths.build,
            options.paths.infra,
            `${options.id}.tf`
        ),
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

module.exports.versionCompatibility = "0.0.2";
