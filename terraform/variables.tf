variable "environment_name" {
  description = "Name of the environment"
  type        = string
  default     = "prod"
}

variable "app_version" {
  description = "Version of the application. Matches docker image tag."
  type        = string
}

variable "vpc_id" {
  type    = string
  default = "vpc-0170ef4c11f2bdfc2"
}

variable "subnet_ids" {
  type    = list(string)
  default = ["subnet-0039b2766d57934f7", "subnet-00d4ccb2324b21e61", "subnet-0cc9db24f595975e0"]
}

variable "ssl_certificate_arn" {
  type    = string
  default = "arn:aws:acm:eu-west-2:208822006106:certificate/d1618914-c826-484f-b5c3-441f2a395f63"
}

variable "jwt_secret" {
  type = string
  default = "somesupersecretsecret"
}
