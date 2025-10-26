# TOEFL Speaking App Design Guidelines

## Design Approach
**System Selected:** Productivity-focused design inspired by Duolingo, Khan Academy, and Linear
**Rationale:** Educational tool requiring clarity, focus, and minimal distractions during practice sessions

## Core Design Principles
- **Focus-First:** Single-task interface that eliminates cognitive load during practice
- **State Clarity:** Every app state (ready, preparing, recording, reviewing) is unmistakably clear
- **Progressive Disclosure:** Show only what's needed at each step
- **Confidence Building:** Encouraging visual feedback throughout the practice flow

---

## Color Palette

### Light Mode
- **Background:** 0 0% 100% (pure white for maximum clarity)
- **Surface:** 220 13% 97% (subtle gray for cards/containers)
- **Primary:** 217 91% 60% (confident blue for CTAs and active states)
- **Text Primary:** 222 47% 11% (near-black for question text)
- **Text Secondary:** 215 16% 47% (muted for instructions)
- **Success:** 142 71% 45% (green for completion states)
- **Warning:** 38 92% 50% (amber for preparation timer)
- **Recording:** 0 84% 60% (red for active recording state)

### Dark Mode
- **Background:** 222 47% 11%
- **Surface:** 217 33% 17%
- **Primary:** 217 91% 60%
- **Text Primary:** 210 40% 98%
- **Text Secondary:** 215 20% 65%
- Success/Warning/Recording: Same as light mode

---

## Typography

**Fonts:** 
- Primary: Inter (Google Fonts) - for UI elements, buttons, labels
- Reading: Merriweather (Google Fonts) - for TOEFL questions and sample responses

**Type Scale:**
- Question Text: text-2xl md:text-3xl font-serif leading-relaxed
- Timer Display: text-6xl md:text-7xl font-bold tabular-nums
- Instructions: text-base font-normal
- Sample Response: text-lg font-serif leading-loose
- Button Text: text-base font-semibold
- Microcopy/Labels: text-sm font-medium

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Tight spacing: p-2, gap-2 (within components)
- Standard spacing: p-4, gap-4, m-6 (between elements)
- Section spacing: p-8, py-12 (major sections)
- Large breaks: py-16, py-24 (between states/screens)

**Container Strategy:**
- Max width: max-w-3xl (optimized for question readability)
- Center alignment: mx-auto for focused single-column layout
- Full viewport height: min-h-screen with flex centering

---

## Component Library

### Primary States/Screens

**1. Welcome/Permission Screen**
- Centered card with microphone icon (large, from Heroicons)
- Clear heading: "TOEFL Speaking Practice"
- Microphone permission request with explanation
- Primary CTA button: "Enable Microphone & Start"
- Badge/chip showing "100% Free Practice"

**2. Ready State**
- Question display in large card with subtle shadow
- "Generate New Question" button (secondary style)
- Large "Start Practice" button (primary, prominent)
- Subtle instruction text below

**3. Preparation State (15s Timer)**
- Large circular timer display showing countdown
- Question visible above timer
- "Skip Preparation" link/button (text style, subtle)
- Visual cue: warm amber color theme for this state

**4. Recording State (45s Timer)**
- Prominent recording indicator (pulsing red dot)
- Large countdown timer
- Recording waveform visualization (subtle, animated)
- Question remains visible but less prominent
- "Stop Early" option available

**5. Review State**
- Transcription in readable card
- Audio playback controls (play/pause, timeline)
- Sample response in expandable section
- "Practice Again" button (primary)
- "New Question" button (secondary)

### UI Components

**Timers:**
- Circular progress ring design
- Large tabular numbers in center
- Color-coded: amber (preparation), red (recording)
- Subtle pulse animation on active state

**Buttons:**
- Primary: Solid blue background, white text, rounded-lg, px-8 py-4
- Secondary: Outlined with border-2, transparent background, rounded-lg
- Text: No background, underline on hover, subtle color
- Icon buttons: Square/circular, ghost style with hover state

**Cards:**
- White/dark surface with border and subtle shadow
- Rounded corners: rounded-xl
- Padding: p-6 to p-8
- Elevated on hover for interactive cards

**Recording Indicator:**
- Red dot with pulsing animation
- "REC" label next to it
- Waveform bars showing audio input levels

**Question Display:**
- Large serif text for readability
- Generous line height (leading-relaxed)
- Light background or bordered card
- Topic/category label at top (small chip)

**Sample Response:**
- Collapsible section (initially collapsed)
- Serif font for natural reading
- Two reasons clearly marked with subtle numbering
- Word count indicator (120 words)

**Transcription Display:**
- Monospace or clean sans-serif
- Slightly smaller than question text
- Light background to distinguish from UI
- Scrollable if content is long

### Navigation/Header
- Minimal header: Logo/title on left, settings icon on right
- Sticky positioning
- Transparent or minimal background
- Height: h-16

---

## Interaction Patterns

**State Transitions:**
- Smooth fade transitions between states (150-200ms)
- Timer animations: smooth countdown with easing
- Button states: Clear hover, active, disabled states

**Microphone Access:**
- Modal/dialog for permission request if needed
- Clear error messaging if denied
- Retry mechanism

**Audio Recording:**
- Visual feedback during recording (waveform/levels)
- Clear start/stop indicators
- Automatic stop at timer end

---

## Animations

**Use Sparingly:**
- Timer countdown: Smooth circular progress
- Recording pulse: Subtle 1.5s ease-in-out loop
- State transitions: 200ms opacity/transform
- Button hovers: 100ms scale/color change
- NO distracting animations during recording/preparation

---

## Accessibility

**Dark Mode:**
- Consistent implementation across all states
- Maintain WCAG AA contrast ratios
- Form inputs and text fields follow dark theme

**Focus States:**
- Clear keyboard navigation indicators
- Tab order follows logical flow
- Focus visible on all interactive elements

**Audio/Visual Cues:**
- Visual countdown complements audio recording
- Screen reader announcements for timer states
- Clear error messages for microphone issues

---

## Responsive Behavior

**Mobile (base to md):**
- Single column, full-width cards
- Larger touch targets (min 48px)
- Timer scales to fit viewport
- Stack question and timer vertically

**Desktop (md and up):**
- Maintain max-w-3xl constraint for focus
- Larger text sizes
- More generous spacing

---

## Images
No hero images needed. This is a utility-focused single-page application. All visual interest comes from:
- Microphone icon on welcome screen (Heroicons: MicrophoneIcon)
- Recording waveform visualization during active recording
- Clean iconography throughout (from Heroicons CDN)