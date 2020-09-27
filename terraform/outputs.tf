
output "bucket" {
  value = aws_s3_bucket.resource.id
}

output "bucket_domain_name" {
  value = aws_s3_bucket.resource.bucket_domain_name
}
