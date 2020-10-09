const path = require("path");

module.exports = {};

module.exports.terraform = ({
    name,
    slug,
    paths,
    options: { public = "public", region = "eu-west-3" } = {}
}) => `
provider "aws" {
  alias                       = "${name}"
  region                      = "${region}"
}

module "${name}" {
  source = "github.com/hauslo/infra-website"

  providers = {
    aws = aws.${name}
  }

  id     = "${slug}"
  public = "${path.join(paths._build, paths.src, public)}"
}
`;

module.exports.validate = require("./schema/options.schema.json");

module.exports.versionCompatibility = ">=0.2.0 <0.3.0";
