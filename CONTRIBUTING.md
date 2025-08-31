# Contributing to Owais Khan's Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports**: Report issues you find
- 💡 **Feature Suggestions**: Propose new features or improvements
- 🔧 **Code Contributions**: Submit pull requests
- 📖 **Documentation**: Improve docs and README
- 🎨 **Design**: Suggest UI/UX improvements
- ♿ **Accessibility**: Help improve accessibility

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Firebase CLI
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client && npm install
   
   # Install function dependencies
   cd ../functions && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example env files
   cp client/.env.example client/.env
   cp functions/.env.example functions/.env
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Start React dev server
   cd client && npm run dev
   
   # Terminal 2: Start Firebase emulator
   firebase emulators:start
   ```

## 📋 Development Guidelines

### Code Style
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Code formatting is handled by Prettier
- **Components**: Use functional components with hooks
- **CSS**: Use TailwindCSS utility classes
- **Naming**: Use camelCase for variables, PascalCase for components

### Component Structure
```jsx
// Import order: React, libraries, local components, hooks, utils
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SomeComponent from './SomeComponent';
import { useTheme } from '../contexts/ThemeContext';

export default function MyComponent({ prop1, prop2 }) {
  // Hooks at the top
  const [state, setState] = useState(null);
  const { theme } = useTheme();
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Event handlers
  const handleClick = () => {
    // Handle events
  };
  
  // Render
  return (
    <motion.div>
      {/* JSX content */}
    </motion.div>
  );
}
```

### Testing
- Write tests for new components and utilities
- Use React Testing Library for component tests
- Follow the AAA pattern: Arrange, Act, Assert
- Test accessibility with screen readers

```jsx
// Example test structure
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { ... };
    
    // Act
    render(<ComponentName {...props} />);
    
    // Assert
    expect(screen.getByRole('...')).toBeInTheDocument();
  });
});
```

### Accessibility Guidelines
- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper heading hierarchy
- Ensure color contrast meets WCAG 2.1 AA standards

## 🎯 Project Architecture

### Frontend Structure
```
client/src/
├── components/         # Reusable UI components
│   ├── about/         # About page components
│   ├── contact/       # Contact page components
│   └── projects/      # Projects page components
├── contexts/          # React contexts
├── data/              # Static data files
├── hooks/             # Custom React hooks
├── pages/             # Route components
├── test/              # Test files
└── themes/            # Theme configuration
```

### State Management
- **Theme Context**: Global theme state
- **Visitor Context**: User segmentation state
- **Local State**: Component-specific state with useState
- **Zustand**: For complex state if needed

### Styling Approach
- **TailwindCSS**: Utility-first CSS framework
- **Theme System**: Dynamic theming based on visitor type
- **Responsive Design**: Mobile-first approach
- **Animations**: Framer Motion for smooth transitions

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**: OS, browser, screen size
2. **Steps to reproduce**: Clear, numbered steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Console errors**: Any JavaScript errors

**Bug Report Template:**
```markdown
## Bug Description
Brief description of the issue.

## Environment
- OS: [e.g., Windows 11, macOS 12]
- Browser: [e.g., Chrome 91, Firefox 89]
- Screen size: [e.g., 1920x1080, mobile]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Additional Context
Any other context about the problem.
```

## 💡 Feature Requests

For feature suggestions:

1. **Check existing issues** to avoid duplicates
2. **Describe the problem** the feature would solve
3. **Propose a solution** with implementation details
4. **Consider alternatives** and trade-offs
5. **Add mockups** or examples if helpful

## 🔄 Pull Request Process

### Before Submitting
- [ ] Fork the repository
- [ ] Create a feature branch (`git checkout -b feature/amazing-feature`)
- [ ] Write tests for new functionality
- [ ] Ensure all tests pass (`npm test`)
- [ ] Run linting (`npm run lint`)
- [ ] Update documentation if needed

### PR Guidelines
- **Clear title**: Describe what the PR does
- **Detailed description**: Explain the changes and motivation
- **Link issues**: Reference related issues
- **Screenshots**: Include visual changes
- **Breaking changes**: Clearly mark any breaking changes

### PR Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots
If applicable, add screenshots.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🎨 Design Contributions

### Design System
- Follow the existing color palette
- Maintain consistency with current components
- Consider dark/light theme variations
- Ensure mobile responsiveness

### Animation Guidelines
- Use Framer Motion for animations
- Keep animations smooth and purposeful
- Respect user preferences (reduced motion)
- Maintain 60fps performance

## 📖 Documentation

### What to Document
- New components and their props
- Complex utility functions
- Setup and configuration changes
- API changes or additions

### Documentation Style
- Use clear, concise language
- Include code examples
- Add JSDoc comments for functions
- Update README for significant changes

## 🤝 Code of Conduct

### Our Standards
- **Be respectful** to all contributors
- **Be constructive** in feedback
- **Be patient** with newcomers
- **Be inclusive** and welcoming

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Other unprofessional conduct

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: owais@example.com for private matters

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in commit messages

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make this project better! 🙏
