# RORK Client Installation and Development Guide

## Installation

1.  **Clone the repository:**

2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3. **Install dev launcher dependencies**
    ```bash
    cd packages/expo-dev-launcher
    yarn install
    cd ../..
    ```
4. **Run npx expo prebuild**
    ```bash
    npx expo prebuild
    ```

## Development Workflow

### Working with `packages/expo-dev-launcher`

If you make changes within the `packages/expo-dev-launcher` directory, you need to rebuild the development launcher package.

1.  **Rebuild the dev launcher:**
    Run the following command from the root directory:
    ```bash
    yarn build:dev-launcher
    ```

2.  **Install the dev launcher**
    Go into root directory and run:
    ```bash
    yarn install
    ```

3.  **Rebuild the application:**
    After rebuilding the dev launcher package, you need to rebuild the native application for your target platform (iOS/Android). This process will incorporate the changes into the development client installed on your simulator or device.

### Building for iOS Simulator (Local Development)

To build the application specifically for the iOS simulator:

1.  **Run the build command:**
    ```bash
    yarn ios
    ```

## How to debug

1.  **Start Metro of rork**

    Attention: We should at the root directory of `rork-client`, not `rork-client/packages/expo-dev-launcher`. And then start metro using 8090 port.
    ```
    npx expo start --port 8090
    ```
    
2.  **Run the client**

    Go to ios directory and pod install:
    ```
    cd ios/
    export EX_DEV_LAUNCHER_URL=http://localhost:8090
    pod install
    cd ..
    ``` 

    Then we can open the `rorkclient.xcworkspace` and run it to debug js and native code now.
    
    If we need to chang native code, we need `rm -rf node_modules` and `yarn install` again currently. 
    
