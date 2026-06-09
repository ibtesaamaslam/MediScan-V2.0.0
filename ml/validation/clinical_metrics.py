from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score
import numpy as np

def evaluate_predictions(y_true, y_pred, y_probs):
    cm = confusion_matrix(y_true, y_pred)
    report = classification_report(y_true, y_pred, output_dict=True)
    roc_auc = roc_auc_score(y_true, y_probs, multi_class="ovr")

    sensitivity = []
    specificity = []

    for i in range(len(cm)):
        tp = cm[i, i]
        fn = cm[i, :].sum() - tp
        fp = cm[:, i].sum() - tp
        tn = cm.sum() - (tp + fn + fp)

        sensitivity.append(tp / (tp + fn + 1e-8))
        specificity.append(tn / (tn + fp + 1e-8))

    return {
        "confusion_matrix": cm.tolist(),
        "classification_report": report,
        "roc_auc": float(roc_auc),
        "sensitivity": sensitivity,
        "specificity": specificity
    }
