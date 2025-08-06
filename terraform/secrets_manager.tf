data "aws_secretsmanager_secret" "rds_master_user" {
  arn = aws_db_instance.mariadb.master_user_secret[0].secret_arn
}

data "aws_secretsmanager_secret_version" "rds_master_user" {
  secret_id = data.aws_secretsmanager_secret.rds_master_user.id
}
