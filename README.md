# VocalPrep 🎙️

**VocalPrep** is an interactive speech recording and transcription tool designed for English speaking practice, test preparation (IELTS, TOEFL, PTE, job interviews), and fluency drills.

Record your spoken answers, transcribe them automatically, and review your transcripts to inspect vocabulary, structure, and speaking clarity.

---

## ✨ Features

- **Live Microphone Recording**: High-fidelity 16 kHz mono audio capture with real-time timer display.
- **Flexible Timing**: Set custom time limits (e.g., 60s for quick questions, 2–5 minutes for full mock presentations) or press `Ctrl+C` to stop early and transcribe immediately.
- **Automatic Transcription**: Chunked audio transcription powered by Google Speech Recognition.
- **Organized Storage**:
  - `input/`: Preserves all recorded `.wav` files with timestamps.
  - `output/`: Saves corresponding `.txt` transcripts for review and progress tracking.
- **Existing Audio Support**: Pass an existing `.wav` file directly to transcribe without recording.

---

## 🚀 Quick Start

### 1. Prerequisites
- Python 3.10+ (Fully compatible with Python 3.13 via `audioop-lts`)
- Microphone access enabled on macOS / Linux / Windows

### 2. Setup Virtual Environment

```bash
# Clone the repository
git clone https://github.com/your-username/vocal-prep.git
cd vocal-prep

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

## 📖 Usage

### Standard Practice Session (Default: 5 Minutes)
```bash
python audio_to_txt.py
```
- Start speaking into your microphone.
- Press <kbd>Ctrl+C</kbd> whenever you are done to automatically finish and transcribe.

### Timed Practice (e.g., 60-Second Drill)
```bash
python audio_to_txt.py --duration 60
```

### Transcribe an Existing Audio File
```bash
python audio_to_txt.py --file input/my_practice_session.wav
```

---

## 📁 Project Structure

```
vocal-prep/
├── audio_to_txt.py       # Core recording and transcription engine
├── requirements.txt      # Project dependencies
├── input/                # Saved recorded audio sessions (.wav)
├── output/               # Generated text transcripts (.txt)
├── .vscode/              # Editor settings (Python interpreter path)
├── .gitignore            # Clean git exclusion rules
└── README.md             # Project documentation
```

---

## 🗺️ Roadmap for Speaking Practice

- [ ] **WPM & Pacing Metrics**: Track words per minute and speech cadence.
- [ ] **Filler Word Counter**: Detect hesitation markers (`um`, `uh`, `like`, `you know`).
- [ ] **Vocabulary & Grammar Feedback**: AI-powered suggestions to elevate spoken responses for IELTS/TOEFL.
- [ ] **Pronunciation & Fluency Scoring**: Confidence and phoneme accuracy tracking.

---

## 📄 License

MIT License. Open for personal practice, education, and contributions!
