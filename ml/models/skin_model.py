import torch.nn as nn
from torchvision.models import mobilenet_v3_small

class SkinNet(nn.Module):
    def __init__(self, num_classes: int):
        super().__init__()
        self.backbone = mobilenet_v3_small(weights="DEFAULT")
        in_features = self.backbone.classifier[3].in_features
        self.backbone.classifier[3] = nn.Linear(in_features, num_classes)

    def forward(self, x):
        return self.backbone(x)
