import json
import random
from pathlib import Path

TASK_TEMPLATES = [
    {
        "category": "BUG",
        "priority": "HIGH",
        "descriptions": [
            "Critical bug: users are logged out after token refresh",
            "Fix production issue causing 500 errors on valid API requests",
            "Payment processing fails under high concurrency",
            "Data loss occurs when updating user profile under load",
        ],
    },
    {
        "category": "BUG",
        "priority": "MEDIUM",
        "descriptions": [
            "Fix incorrect error message on login failure",
            "Resolve UI freeze when switching tabs quickly",
            "Fix pagination offset bug on tasks list endpoint",
        ],
    },
    {
        "category": "BUG",
        "priority": "LOW",
        "descriptions": [
            "Fix typo in settings page",
            "Minor CSS alignment issue on mobile",
        ],
    },

    {
        "category": "FEATURE",
        "priority": "HIGH",
        "descriptions": [
            "Implement JWT authentication with refresh tokens and role-based access",
            "Add real-time notifications using WebSockets",
            "Introduce audit logging for all financial operations",
        ],
    },
    {
        "category": "FEATURE",
        "priority": "MEDIUM",
        "descriptions": [
            "Add task filtering by priority and category",
            "Implement user profile editing with avatar upload",
            "Create admin panel for system monitoring",
        ],
    },
    {
        "category": "FEATURE",
        "priority": "LOW",
        "descriptions": [
            "Add optional email notifications for completed tasks",
            "Introduce keyboard shortcuts for power users",
        ],
    },

    {
        "category": "TASK",
        "priority": "HIGH",
        "descriptions": [
            "Refactor authentication module to support multi-tenant architecture",
            "Migrate database schema to support soft deletes",
            "Improve API rate limiting to prevent abuse",
        ],
    },
    {
        "category": "TASK",
        "priority": "MEDIUM",
        "descriptions": [
            "Refactor TaskService to reduce cyclomatic complexity",
            "Add unit tests for edge cases in transaction flow",
            "Optimize SQL queries used in analytics dashboard",
        ],
    },
    {
        "category": "TASK",
        "priority": "LOW",
        "descriptions": [
            "Remove deprecated config values",
            "Update dependencies to latest stable versions",
        ],
    },

    {
        "category": "GENERAL",
        "priority": "MEDIUM",
        "descriptions": [
            "Update Swagger API documentation",
            "Align frontend and backend naming conventions",
        ],
    },
    {
        "category": "GENERAL",
        "priority": "LOW",
        "descriptions": [
            "Discuss technical debt during sprint planning",
            "Review logging strategy for scalability",
        ],
    },
]

def generate_tasks(count: int = 100) -> list[dict]:
    tasks = []
    for _ in range(count):
        template = random.choice(TASK_TEMPLATES)
        description = random.choice(template["descriptions"])
        task = {
            "category": template["category"],
            "priority": template["priority"],
            "description": description,
        }
        tasks.append(task)
    return tasks

def save_tasks_to_json(tasks: list[dict], filename: str = "tasks.dataset.json", save_dir: str | Path = "data") -> Path:
    path = Path(save_dir) / filename
    path.parent.mkdir(parents=True, exist_ok=True)

    path.write_text(
        json.dumps(tasks, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
    return path

if __name__ == "__main__":
    TASK_COUNT = 100
    OUTPUT_FILE = "tasks.dataset.json"
    OUTPUT_DIR = "data"

    dataset = generate_tasks(TASK_COUNT)
    saved_path = save_tasks_to_json(dataset, OUTPUT_FILE, OUTPUT_DIR)
    print(f"Generated dataset with {TASK_COUNT} tasks at: {saved_path}")
