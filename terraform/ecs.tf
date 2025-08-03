resource "aws_ecs_cluster" "this" {
  name = "real-estate-${var.environment_name}"
}

resource "aws_ecs_cluster_capacity_providers" "this" {
  cluster_name = aws_ecs_cluster.this.name

  capacity_providers = ["FARGATE"]
}

# # CloudWatch Log Group for ECS Tasks
# resource "aws_cloudwatch_log_group" "ecs_tasks" {
#   name              = "/aws/ecs/${local.ecs_cluster_name}/tasks"
#   retention_in_days = 7
# }
#
# # Security Group for ECS Tasks
# resource "aws_security_group" "ecs_tasks" {
#   name_prefix = "ecs-tasks-${var.environment_name}-"
#   description = "Security group for ECS tasks"
#   vpc_id      = var.vpc_id
#
#   ingress {
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["10.0.0.0/8"]
#   }
#
#   ingress {
#     from_port   = 443
#     to_port     = 443
#     protocol    = "tcp"
#     cidr_blocks = ["10.0.0.0/8"]
#   }
#
#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
#
#   tags = {
#     Name        = "ecs-tasks-sg-${var.environment_name}"
#     Environment = var.environment_name
#   }
#
#   lifecycle {
#     create_before_destroy = true
#   }
# }
#
# # IAM Role for ECS Task Execution
# resource "aws_iam_role" "ecs_task_execution_role" {
#   name = "ecs-task-execution-role-${var.environment_name}"
#
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Principal = {
#           Service = "ecs-tasks.amazonaws.com"
#         }
#       }
#     ]
#   })
#
#   tags = {
#     Name        = "ecs-task-execution-role-${var.environment_name}"
#     Environment = var.environment_name
#   }
# }
#
# # Attach the AWS managed policy for ECS task execution
# resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
#   role       = aws_iam_role.ecs_task_execution_role.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
# }
#
# # IAM Role for ECS Tasks
# resource "aws_iam_role" "ecs_task_role" {
#   name = "ecs-task-role-${var.environment_name}"
#
#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Principal = {
#           Service = "ecs-tasks.amazonaws.com"
#         }
#       }
#     ]
#   })
#
#   tags = {
#     Name        = "ecs-task-role-${var.environment_name}"
#     Environment = var.environment_name
#   }
# }
