
const path = require("path");

module.exports = ({ id, domain, paths, options }) => `
module "${id}" {
  source = "github.com/hauslo/infra-website"

  domain = "${domain}"
  public = "${path.join(paths._infra, paths._build, paths.src, options.public)}"
}

output "${id}_bucket" {
  value = module.${id}.bucket
}

output "${id}_bucket_domain_name" {
  value = module.${id}.bucket_domain_name
}
`;