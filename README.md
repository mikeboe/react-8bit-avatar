# React 8bit Avatar Component

A customizable React component that generates an 8-bit style avatar based on an input value. The avatar can be rendered with different color schemes, dimensions, and custom CSS classes for light and dark modes.

## Installation

You can install the `react-8bit-avatar` package using npm:

```bash
npm install react-8bit-avatar
```

## Usage

Import the `Avatar` component and use it in your React application:

```jsx
import React from "react";
import Avatar from "react-8bit-avatar";

function App() {
  return (
    <div className="App">
      <Avatar
        inputValue="your_input_here"
        width={200}
        height={200}
        lightModeColors={{ background: "#F8F8F8" }}
        darkModeColors={{ background: "#333" }}
        darkMode={false}
        lightModeClass="light-mode"
        darkModeClass="dark-mode"
      />
    </div>
  );
}

export default App;
```

Replace `"your_input_here"` with the desired input value.

## Props

- `inputValue` (required): The input value to generate the avatar. This can be any string.
- `width` (required): Width of the canvas for the avatar.
- `height` (required): Height of the canvas for the avatar.
- `lightModeColors` (optional, default: `{ background: "#F8F8F8" }`): An object containing color values for the light mode.
- `darkModeColors` (optional, default: `{ background: "#333" }`): An object containing color values for the dark mode.
- `darkMode` (optional, default: `false`): Boolean value to enable dark mode. If `true`, colors will be inverted.
- `lightModeClass` (optional, default: `""`): CSS class for the container in light mode.
- `darkModeClass` (optional, default: `""`): CSS class for the container in dark mode.

## License

This project is licensed under the MIT License.