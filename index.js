
const path = require("path");
const Ajv = require("ajv");
const ajv = new Ajv();
const validate = ajv.compile(require("./schema/options.schema.json"));

const TERRAFORM_TEMPLATE = path.resolve(__dirname, "templates", "resource.tf.mustache");
const TERRAFORM_MODULE = path.resolve(__dirname, "terraform");

const renderMustacheFile = require("@hauslo/pipeline-util/renderMustacheFile");
const copyDir = require("@hauslo/pipeline-util/copyDir");

module.exports = async (options) => {
    options.options = options.options || {};
    options.options.public = options.options.public || "public";

    await copyDir(TERRAFORM_MODULE, path.join(options.paths.repo, options.paths.build, options.paths.res));
    await renderMustacheFile(
        TERRAFORM_TEMPLATE,
        path.join(options.paths.repo, options.paths.build, options.paths.infra, options.id + ".tf"),
        options
    );
};
 
module.exports.validate = (options = {}) => { 
    if (!validate(options)) {
        const err = new Error("Invalid pipeline options");
        err.validationErrors = validate.errors;
        throw err;
    }
};

module.exports.versionCompatibility = "^0.0.2";