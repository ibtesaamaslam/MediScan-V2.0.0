# Contributing to MediScan Local

Thank you for your interest in contributing to MediScan Local! This project is built for underserved communities, and every contribution helps improve healthcare accessibility.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

### Development Setup

1. Fork and clone the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Set up your environment:
   - Mobile: `cd mobile && npm install`
   - Backend: `cd backend && pip install -r requirements.txt`
   - ML: `cd ml && pip install -r requirements.txt`

### Project Structure

- **`mobile/`** — React Native + Expo frontend
- **`backend/`** — FastAPI server for dashboard and analytics
- **`ml/`** — Model training and export pipeline
- **`.github/workflows/`** — CI/CD pipelines

## Development Workflow

### Code Quality

- Run linting: `npm run lint` (mobile) or `flake8` (backend/ML)
- Format code: `npm run format` or `black .`
- Write tests for new features
- Ensure tests pass before submitting PR

### Branch Naming

- Features: `feature/description`
- Fixes: `fix/description`
- Docs: `docs/description`

### Commit Messages

Use clear, descriptive commits:
```
[mobile] Add image quality warning
[backend] Fix anonymized data filtering
[ml] Improve model quantization
```

## Submitting Changes

1. Ensure all tests pass and code is formatted
2. Update documentation as needed
3. Submit a pull request with a clear description
4. Address any feedback from maintainers
5. Celebrate when merged! 🎉

## Testing

### Mobile Testing

```bash
cd mobile
npm run test
npm run eas:build    # For device testing
```

### Backend Testing

```bash
cd backend
pytest
```

### ML Testing

```bash
cd ml
python validate_model.py
```

## Reporting Issues

- Use GitHub Issues for bug reports
- Include: OS, device/environment, steps to reproduce, expected vs. actual behavior
- Suggest fixes if you have ideas

## Feature Requests

We welcome feature ideas! Please:
- Check if a similar request exists
- Explain the use case and impact
- Link to related issues or PRs

## Documentation

- Update README if you change setup instructions
- Add comments to complex code
- Document new features or configuration options
- Keep medical/clinical terms clear and accessible

## Questions?

- Open a GitHub Discussion
- Check existing docs and issues
- Reach out to maintainers

Thank you for helping build healthcare accessibility! ✨
