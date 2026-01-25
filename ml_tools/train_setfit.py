from setfit import SetFitModel, Trainer
from datasets import load_dataset, DatasetDict
from typing import List

dataset: DatasetDict = (
    load_dataset("json", data_files="ml_tools/data/tasks.dataset.json")["train"]
    .shuffle(seed=42)
    .train_test_split(test_size=0.2)
)

def train_model(label_column, model_save_path):

    labels: List[str] = sorted(set(dataset["train"][label_column]))

    model = SetFitModel.from_pretrained(
        "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
        labels=labels,
        device="cuda" if __import__("torch").cuda.is_available() else "cpu",
    )

    trainer = Trainer(
        model=model,
        train_dataset=dataset["train"],
        eval_dataset=dataset["test"],
        column_mapping={"description": "text", label_column: "label"},
    )

    trainer.train()

    matrics = trainer.evaluate()
    print(f"Matrics fpr label column '{label_column}': {matrics}")

    model.save_pretrained(model_save_path)
    print(f"Model saved to: {model_save_path}")

if __name__ == "__main__":
    PRIORITY_LABEL_COLUMN = "priority"
    CATEGORY_LABEL_COLUMN = "category"

    MODEL_PRIORITY_SAVE_PATH = "ml_tools/models/setfit_model_priority"
    MODEL_CATEGORY_SAVE_PATH = "ml_tools/models/setfit_model_category"

    train_model(PRIORITY_LABEL_COLUMN, MODEL_PRIORITY_SAVE_PATH)
    train_model(CATEGORY_LABEL_COLUMN, MODEL_CATEGORY_SAVE_PATH)