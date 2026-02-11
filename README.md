**🚇 MRT Sense
A Multi-Modal Assistive Navigation App for Public Transport**

MRT Sense is an inclusive assistive mobile application designed to support specially-abled individuals in navigating Singapore’s MRT system independently.

Many assistive solutions rely on a single interaction mode — either audio, visual, or tactile — which excludes users who cannot access that specific mode.

MRT Sense addresses this gap by providing a multi-modal navigation experience that works across multiple abilities, including:

**👁️ Partially Blind Users

🦻 Deaf / Hard-of-Hearing Users**

The app is built using React Native (Expo) and designed as a rapid prototype that demonstrates real-world accessibility innovation.

**🎯 Problem Statement**

Technology has transformed communication and mobility, yet many assistive systems rely on only one interaction mode (e.g., speech-based systems or visual interfaces).

This excludes users who:

Cannot hear announcements

Cannot rely solely on visual signage

Require tactile feedback

Need multimodal reinforcement

MRT Sense explores how a single solution can support multiple abilities through layered interaction.

**🔑 Core Features
🚇 1. Journey Simulation**

Simulates MRT arrival notifications.

🔊 Audio announcement (for partially blind users)

📳 Continuous vibration alert (for deaf users)

💡 Visual glow effect to demonstrate haptic feedback during presentations

🟡 **2. Platform Alignment Mode**

Guides users left or right when exiting the train.

Distinct vibration patterns:

Left → Single vibration

Right → Double vibration

Spoken directional guidance (Partially Blind Mode)

Visual glow indicator to simulate vibration during demo

Clear differentiation of directional encoding

🚪 **3. Guided Exit Mode**

Step-by-step navigation after exiting the train.

**For Partially Blind Mode:**

Spoken step instructions

Sequential navigation

**For Deaf Mode:**

Visual instruction display

Continuous vibration alert when destination reached

Manual stop control

🆘 **4. SOS Emergency Alert (Hold Activation)**

Press and hold the SOS button to:

Trigger emergency alert screen

Activate vibration pattern

Display full-screen red emergency confirmation

This simulates contacting an emergency contact for safety situations.

🧩 ** 5. User Profile Setup**

Users can:

Enter name

Add emergency contact details

Select accessibility mode (Partially Blind / Deaf)

This demonstrates personalization and safety readiness.

🛠 **Tech Stack**

React Native (Expo)

TypeScript

Expo Router

Expo Speech

React Native Animated API

Haptic / Vibration Feedback

🌏 **Why This Matters**

Public transport accessibility often assumes:

Blind users always have assistance

Deaf users can rely purely on visual signage

One sensory mode is enough

MRT Sense challenges this assumption by:

✔ Layering multiple feedback systems
✔ Designing for partial impairments
✔ Reinforcing navigation through vibration + speech + visual glow
✔ Demonstrating inclusive transport innovation in Singapore

🚀 Future Improvements

Real-time MRT API integration

Indoor station mapping

Bluetooth beacon navigation

SMS emergency trigger

AI-powered adaptive feedback strength

Multi-language support

-----------------------------------------------------------------------------------------

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
