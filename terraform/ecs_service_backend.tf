resource "aws_ecs_service" "backend" {
  name                  = "backend"
  cluster               = aws_ecs_cluster.this.id
  task_definition       = aws_ecs_task_definition.backend.arn
  desired_count         = 1
  wait_for_steady_state = true

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    base              = 1
    weight            = 1
  }

  load_balancer {
    container_name   = "app"
    container_port   = 4000
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
          containerPort = 4000
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
          name  = "JWT_SECRET"
          value = var.jwt_secret
        },
        {
          name  = "DD_ENV"
          value = "prod"
        },
        {
          name  = "DD_VERSION"
          value = var.app_version
        },
      ]

      secrets = [
        {
          name      = "DB_USERNAME",
          valueFrom = "${data.aws_secretsmanager_secret.rds_master_user.arn}:username::",
        },
        {
          name      = "DB_PASSWORD",
          valueFrom = "${data.aws_secretsmanager_secret.rds_master_user.arn}:password::",
        },
      ]

      logConfiguration = {
        logDriver = "awsfirelens"
        options = {
          Name       = "datadog"
          Host       = "http-intake.logs.datadoghq.com"
          dd_service = "real-estate-backend"
          dd_source  = "app"
          TLS        = "on"
          provider   = "ecs"
        }

        secretOptions = [
          {
            name      = "apikey"
            valueFrom = data.aws_secretsmanager_secret_version.datadog.arn
          }
        ]
      }
    },
    {
      name  = "datadog-agent"
      image = "public.ecr.aws/datadog/agent:latest"

      environment = [
        {
          name  = "ECS_FARGATE"
          value = "true"
        }
      ]

      secrets = [
        {
          name      = "DD_API_KEY"
          valueFrom = data.aws_secretsmanager_secret_version.datadog.arn
        }
      ]

      portMappings = [
        {
          "hostPort" : 8126,
          "protocol" : "tcp",
          "containerPort" : 8126
        }
      ]

      healthCheck = {
        command     = ["CMD-SHELL", "agent health"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }

      logConfiguration = {
          logDriver = "awsfirelens"
          options = {
            Name       = "datadog"
            Host       = "http-intake.logs.datadoghq.com"
            dd_service = "real-estate-backend"
            dd_source  = "datadog-agent"
            TLS        = "on"
            provider   = "ecs"
          }

          secretOptions = [
            {
              name      = "apikey"
              valueFrom = data.aws_secretsmanager_secret_version.datadog.arn
            }
          ]
        }
    },
    {
      name      = "log_router"
      image     = "amazon/aws-for-fluent-bit:stable"
      essential = true

      firelensConfiguration = {
        type = "fluentbit"
        options = {
          "enable-ecs-log-metadata" = "true"
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
    from_port       = 4000
    to_port         = 4000
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

resource "aws_iam_role_policy" "backend_ecs_secrets_manager_access" {
  role = aws_iam_role.backend_ecs_task_execution.name

  name   = "SecretsManagerAccess"
  policy = data.aws_iam_policy_document.backend_ecs_secrets_manager_access.json
}

data "aws_iam_policy_document" "backend_ecs_secrets_manager_access" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue",
    ]
    resources = [
      data.aws_secretsmanager_secret.rds_master_user.arn,
      data.aws_secretsmanager_secret.datadog.arn,
    ]
  }
}
