import numpy as np

def apply_abstention_rules(probs, threshold=0.75):
    """
    Apply clinical abstention. Returns prediction index or -1 if uncertain.
    """
    max_prob = np.max(probs)
    if max_prob < threshold:
        return -1
    return np.argmax(probs)
