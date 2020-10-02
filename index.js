
const path = require("path");
const Ajv = require("ajv");
const ajv = new Ajv();
const validate = ajv.compile(require("./schema/options.schema.json"));
const { writeFile } = require("@hauslo/pipeline-util");

const renderTf = require("./resource.tf.js");
const { writeFile } = require("fs").promises;

module.exports = async (options) => {
    options.options = options.options || {};
    options.options.public = options.options.public || "public";

    await writeFile(path.join(options.paths.repo, options.paths.build, options.paths.infra, options.id + ".tf"), renderTf(options));
};
 
module.exports.validate = (options = {}) => { 
    if (!validate(options)) {
        const err = new Error("Invalid pipeline options");
        err.validationErrors = validate.errors;
        throw err;
    }
};

module.exports.versionCompatibility = "0.0.2";