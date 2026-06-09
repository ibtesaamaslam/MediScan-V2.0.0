import pandas as pd

def compute_group_accuracy(dataframe, group_column="fitzpatrick"):
    results = {}
    groups = dataframe[group_column].dropna().unique()

    for group in groups:
        subset = dataframe[dataframe[group_column] == group]
        accuracy = (subset["y_true"] == subset["y_pred"]).mean()

         results[str(group)] = {
            "samples": int(len(subset)),
            "accuracy": float(accuracy)
        }

    return results
