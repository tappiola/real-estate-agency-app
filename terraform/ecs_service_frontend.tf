resource "aws_ecs_service" "frontend" {
  name                  = "frontend"
  cluster               = aws_ecs_cluster.this.id
  task_definition       = aws_ecs_task_definition.frontend.arn
  desired_count         = 1
  launch_type           = "FARGATE"
  wait_for_steady_state = true

  load_balancer {
    container_name   = "app"
    container_port   = 80
    target_group_arn = aws_lb_target_group.frontend.arn
  }

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [aws_security_group.frontend_ecs_task.id]
    assign_public_ip = true
  }
}

resource "aws_ecs_task_definition" "frontend" {
  family                   = "real-estate-frontend-${var.environment_name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.frontend_ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name      = "app"
      image     = "${aws_ecr_repository.frontend.repository_url}:${var.app_version}"
      essential = true

      portMappings = [
        {
          containerPort = 80
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "BACKEND_URL"
          value = "https://localhost:5000"
        },
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.frontend_ecs_task.name
          awslogs-region        = "eu-west-2"
          awslogs-stream-prefix = "frontend"
        }
      }
    }
  ])
}

resource "aws_cloudwatch_log_group" "frontend_ecs_task" {
  name              = "/aws/ecs/${aws_ecs_cluster.this.name}/frontend"
  retention_in_days = 7
}

resource "aws_security_group" "frontend_ecs_task" {
  name_prefix = "real-estate-frontend-${var.environment_name}-"
  description = "Real estate app frontend ECS task"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 80
    to_port         = 80
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
    Name = "real-estate-frontend-${var.environment_name}"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# IAM Role for ECS Task Execution
resource "aws_iam_role" "frontend_ecs_task_execution" {
  name = "RealEstateApp-${title(var.environment_name)}-Frontend-Execution"

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

resource "aws_iam_role_policy_attachment" "frontend_ecs_task_execution_policy" {
  role       = aws_iam_role.frontend_ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
