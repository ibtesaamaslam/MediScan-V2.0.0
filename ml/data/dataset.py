from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
from augmentation.augmentations import train_transforms, val_transforms

def create_dataloaders(train_dir, val_dir, batch_size):
    train_dataset = ImageFolder(train_dir, transform=train_transforms)
    val_dataset = ImageFolder(val_dir, transform=val_transforms)

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=4, pin_memory=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=4, pin_memory=True)

    return train_loader, val_loader
