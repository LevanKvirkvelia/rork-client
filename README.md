# RORK Client Installation and Development Guide

## Installation

1.  **Clone the repository:**

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

## Development Workflow

### Working with `packages/expo-dev-launcher`

If you make changes within the `packages/expo-dev-launcher` directory, you need to rebuild the development launcher package.

1.  **Rebuild the dev launcher:**
    Run the following command from the root directory:
    ```bash
    yarn build:dev-launcher
    ```

2.  **Rebuild the application:**
    After rebuilding the dev launcher package, you need to rebuild the native application for your target platform (iOS/Android). This process will incorporate the changes into the development client installed on your simulator or device.

### Building for iOS Simulator (Local Development)

To build the application specifically for the iOS simulator:

1.  **Run the build command:**
    ```bash
    yarn build:ios-local
    ```
    This command will build the app and automatically install it onto your running iOS simulator.