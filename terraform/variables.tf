variable "environment_name" {
  description = "Name of the environment"
  type        = string
  default     = "prod"
}

variable "vpc_id" {
  type    = string
  default = "vpc-0170ef4c11f2bdfc2"
}

variable "subnet_ids" {
  type    = list(string)
  default = ["subnet-0039b2766d57934f7", "subnet-00d4ccb2324b21e61", "subnet-0cc9db24f595975e0"]
}
