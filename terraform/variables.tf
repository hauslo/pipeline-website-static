
variable "domain" {
  type        = string
  description = "domain"
}

variable "public" {
  type        = string
  description = "Path to website root"
}

variable "mime_types" {
  default = {
    html  = "text/html"
    css   = "text/css"
    js    = "application/javascript"
    map   = "application/javascript"
    json  = "application/json"
    ico   = "image/x-icon"
  }
}
