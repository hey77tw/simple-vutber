# Simple VTuber Audio Visualization App

This is a simple VTuber audio visualization application that changes character mouth expressions based on microphone input volume.

## 🎯 Features

- Real-time audio analysis
- Automatic mouth expression switching
- Support for multiple mouth shapes
- Clean user interface
- Customizable character images


## 🖼️ How to Replace Your Character Images

### Step 1: Prepare Image Files

You need to prepare the following 7 PNG format images and place them in the `assets` folder:

| Filename | Description |
|----------|-------------|
| `vtuber-mouth-close.png` | Closed mouth state |
| `vtuber-mouth-close-blink.png` | Closed mouth with blink |
| `vtuber-mouth-open-a.png` | Open mouth "A" sound |
| `vtuber-mouth-open-e.png` | Open mouth "E" sound |
| `vtuber-mouth-open-i.png` | Open mouth "I" sound |
| `vtuber-mouth-open-o.png` | Open mouth "O" sound |
| `vtuber-mouth-open-u.png` | Open mouth "U" sound |


### Step 2: Replace Images

1. Copy your prepared image files to the `assets` folder
2. Ensure filenames match the table above exactly
3. Overwrite the existing image files

### Step 3: Build Application

1. Double-click to run the `build.bat` file
2. Wait for the build process to complete (about 1-3 minutes)
3. After building, executable files will be generated in the `dist` folder

### Step 4: Run

1. Run `VTuber音訊視覺化.exe` in the `dist/win-unpacked` folder

## 🎮 Usage Instructions

1. **Launch Application**: Double-click desktop shortcut or launch from start menu
2. **Allow Microphone Permission**: When prompted by the system, allow the application to access the microphone
3. **Start Speaking**: Speak into the microphone, and the character will automatically change mouth expressions based on volume
4. **Adjust Volume**: You can adjust system volume or microphone volume to test different effects
5. **Mouth Shape Training**: To get better mouth synchronization, practice pronouncing vowel sounds (A, E, I, O, U) clearly at different volumes. The application will automatically switch between different mouth shapes based on your voice intensity and frequency patterns
