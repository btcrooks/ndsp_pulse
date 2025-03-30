<!-- @format -->

# Pulse - Delay and Reverb Calculator

Pulse is a simple VST plugin designed to calculate delay and reverb timings based on your DAW's tempo or a manually set BPM. It provides a clear, table-based interface displaying precise values for delay (note values, dotted, triplets) and reverb (pre-delay, decay, total time), with options to toggle between milliseconds and seconds. Perfect for producers and engineers who need quick, tempo-synced effect settings without the clutter of modern buzzwords.

Pulse is built using JUCE and is available as a stereo insert plugin. The source code and pre-built binaries are hosted on this GitHub repository.

## Artwork

![Pulse VST Screenshot](assets/pulse-screenshot.png)  
\_Placeholder: A screenshot of the Pulse UI will be added here once available.\_G

## Installation Instructions

### Mac

1. **Download**: Grab the latest `.vst` file from the [Releases](https://github.com/yourusername/pulse/releases) page.
2. **Install**:
   - Copy `Pulse.vst` to `~/Library/Audio/Plug-Ins/VST/`.
   - If the folder doesn’t exist, create it.
3. **Verify**: Open your DAW, rescan plugins, and load Pulse on a stereo insert track.

### Windows

1. **Download**: Get the latest `.dll` file from the [Releases](https://github.com/yourusername/pulse/releases) page.
2. **Install**:
   - Copy `Pulse.dll` to `C:\Program Files\Common Files\VST2\` (or your DAW’s VST plugin directory).
   - Ensure your DAW is set to scan this folder.
3. **Verify**: Launch your DAW, rescan plugins, and insert Pulse on a stereo track.

## Usage

1. **Load Pulse**: Add the plugin to any stereo insert track in your DAW.
2. **Set Tempo**:
   - Pulse auto-detects your DAW’s tempo if available.
   - Or, enter a BPM manually in the "Tempo (BPM)" field (20–300 BPM).
3. **Choose Units**: Use the dropdown to switch between "Milliseconds" and "Seconds".
4. **View Results**:
   - **Delay Table**: Shows Note Value, Notes, Dotted, and Triplets timings.
   - **Reverb Table**: Displays Reverb Size, Pre-Delay, Decay Time, and Total Reverb Time.
5. **Apply**: Use the calculated values to set up your delay and reverb effects manually in other plugins.

Pulse is a calculator, not an audio processor—it passes audio through unchanged.

## Building from Source

To build Pulse yourself:

1. **Prerequisites**:
   - JUCE 7.x (download from [juce.com](https://juce.com)).
   - Xcode (Mac) or Visual Studio (Windows).
   - Projucer (included with JUCE).
2. **Steps**:
   - Clone this repository: `git clone https://github.com/yourusername/pulse.git`.
   - Open `Pulse.jucer` in Projucer.
   - Save and export to your IDE (Xcode or Visual Studio).
   - Build the VST target.
3. **Output**: Find the `.vst` (Mac) or `.dll` (Windows) in the build folder.

## Additional Documentation

- **Source Code**: Explore the `PluginProcessorV2.h/cpp` and `PluginEditorV2.h/cpp` files for implementation details.
- **Algorithm Details**:
  - Delay: Tempo-synced calculations based on `60000 / BPM`.
  - Reverb: Simplified Schroeder-style estimates scaled by room size.
- **Support**: For issues, check the [Issues](https://github.com/yourusername/pulse/issues) tab or file a new one.

## Terms of Use

- Pulse is provided as-is for personal or commercial use.
- Do not redistribute modified versions without permission.
- No warranty is implied—use at your own risk.

## License

Pulse is licensed under the MIT License. See the [LICENSE](LICENSE) file for details:

```
MIT License
Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

(Full text in the repository’s LICENSE file.)

## Contributing

Want to improve Pulse?

- Fork the repo, make your changes, and submit a pull request.
- Follow JUCE coding conventions.
- Suggestions? Open an issue with your idea.

## Contact

- GitHub: [yourusername](https://github.com/yourusername)
- Email: your.email@example.com (optional, add if desired)

---

_Note_: Replace `yourusername` with your GitHub username and update paths or details as needed once the repo is live.
