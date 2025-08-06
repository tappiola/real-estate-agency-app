locals {
  rds_master_user_credentials = jsondecode(data.aws_secretsmanager_secret_version.rds_master_user.secret_string)
}

resource "aws_ecs_service" "backend" {
  name                  = "backend"
  cluster               = aws_ecs_cluster.this.id
  task_definition       = aws_ecs_task_definition.backend.arn
  desired_count         = 1
  launch_type           = "FARGATE"
  wait_for_steady_state = true

  load_balancer {
    container_name   = "app"
    container_port   = 5000
    target_group_arn = aws_lb_target_group.backend.arn
  }

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [aws_security_group.backend_ecs_task.id]
    assign_public_ip = true
  }
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "real-estate-backend-${var.environment_name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.backend_ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name      = "app"
      image     = "${aws_ecr_repository.backend.repository_url}:${var.app_version}"
      essential = true

      portMappings = [
        {
          containerPort = 5000
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "DB_HOST"
          value = split(":", aws_db_instance.mariadb.endpoint)[0]
        },
        {
          name  = "DB_NAME"
          value = "flats"
        },
        {
          name  = "DB_USERNAME"
          value = local.rds_master_user_credentials["username"]
        },
        {
          name  = "DB_PASSWORD"
          value = local.rds_master_user_credentials["password"]
        },
        {
          name  = "JWT_SECRET"
          value = var.jwt_secret
        },
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.backend_ecs_task.name
          awslogs-region        = "eu-west-2"
          awslogs-stream-prefix = "backend"
        }
      }
    }
  ])
}

resource "aws_cloudwatch_log_group" "backend_ecs_task" {
  name              = "/aws/ecs/${aws_ecs_cluster.this.name}/backend"
  retention_in_days = 7
}

resource "aws_security_group" "backend_ecs_task" {
  name_prefix = "real-estate-backend-${var.environment_name}-"
  description = "Real estate app backend ECS task"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "real-estate-backend-${var.environment_name}"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# IAM Role for ECS Task Execution
resource "aws_iam_role" "backend_ecs_task_execution" {
  name = "RealEstateApp-${title(var.environment_name)}-Backend-Execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "backend_ecs_task_execution_policy" {
  role       = aws_iam_role.backend_ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
