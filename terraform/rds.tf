
resource "aws_db_instance" "mariadb" {
  identifier                  = "real-estate"
  engine                      = "mariadb"
  engine_version              = "11.4.5"
  instance_class              = "db.t4g.micro"
  allocated_storage           = 20
  storage_type                = "gp2"
  storage_encrypted           = true
  username                    = "snorlax"
  manage_master_user_password = true
  skip_final_snapshot         = true
  publicly_accessible         = true
  multi_az                    = false
  backup_retention_period     = 0

  db_subnet_group_name   = aws_db_subnet_group.mariadb.name
  vpc_security_group_ids = [aws_security_group.mariadb.id]
}

resource "aws_db_subnet_group" "mariadb" {
  name       = "real-estate-subnet-group"
  subnet_ids = var.subnet_ids
}

resource "aws_security_group" "mariadb" {
  name        = "real-estate-db"
  description = "Real estate app DB"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
