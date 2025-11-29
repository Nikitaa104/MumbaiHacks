# Neural Network Hero Integration Guide

## ✅ Component Successfully Installed

The Neural Network Hero component has been integrated into your project!

### 📦 What Was Installed

1. **Core Component**: `/components/ui/neural-network-hero.tsx`
   - Features a stunning 3D shader background (CPPN neural network visualization)
   - GSAP-powered text animations with blur and stagger effects
   - Fully customizable props for content and styling

2. **Alternative Hero**: `/components/HeroNeural.tsx`
   - Drop-in replacement for your current Hero
   - Pre-configured for your misinformation detection landing page
   - Integrated with your AuthContext

### 🔧 Required Dependencies

You need to install these npm packages:

```bash
npm install gsap three @gsap/react @react-three/drei @react-three/fiber
```

Or with yarn:

```bash
yarn add gsap three @gsap/react @react-three/drei @react-three/fiber
```

### 🚀 How to Use

#### Option 1: Replace Current Hero (Quick Swap)

Open `/App.tsx` and replace the Hero import:

```tsx
// Change this:
import { Hero } from "./components/Hero";

// To this:
import { HeroNeural as Hero } from "./components/HeroNeural";
```

That's it! The Neural Hero will render with the animated shader background.

#### Option 2: Side-by-Side Comparison

Keep both heroes and switch between them:

```tsx
import { Hero } from "./components/Hero";
import { HeroNeural } from "./components/HeroNeural";
import { useState } from "react";

export default function App() {
  const [useNeuralHero, setUseNeuralHero] = useState(false);

  return (
    <AuthProvider>
      {/* ... navbar ... */}
      {useNeuralHero ? <HeroNeural /> : <Hero />}
      {/* ... rest of app ... */}
    </AuthProvider>
  );
}
```

#### Option 3: Custom Implementation

Use the Neural Hero component directly with custom props:

```tsx
import NeuralNetworkHero from "./components/ui/neural-network-hero";

<NeuralNetworkHero
  title="Your Custom Title"
  description="Your custom description"
  badgeText="Your Badge Text"
  badgeLabel="Label"
  ctaButtons={[
    {
      text: "Primary CTA",
      href: "#",
      primary: true,
      onClick: () => {},
    },
    { text: "Secondary CTA", href: "#" },
  ]}
  microDetails={["Detail 1", "Detail 2", "Detail 3"]}
/>;
```

### 🎨 Component Features

- **3D Shader Background**: Neural network CPPN visualization that animates smoothly
- **GSAP Animations**: Professional text reveal with blur, scale, and stagger effects
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Customizable**: All text, buttons, and details are configurable via props
- **Performance**: Optimized with React Three Fiber and efficient shader rendering

### ⚙️ Props Reference

```typescript
interface HeroProps {
  title: string; // Main heading
  description: string; // Subheading text
  badgeText?: string; // Badge right text (default: "Generative Surfaces")
  badgeLabel?: string; // Badge left label (default: "New")
  ctaButtons?: Array<{
    text: string;
    href: string;
    primary?: boolean;
    onClick?: () => void;
  }>;
  microDetails?: Array<string>; // Bottom detail items
}
```

### 🎯 Performance Notes

- The shader is GPU-accelerated and runs smoothly on modern devices
- Canvas renders at appropriate DPR (device pixel ratio) for quality/performance balance
- GSAP animations are hardware-accelerated
- Component lazy-loads and respects reduced motion preferences

### 🔄 Reverting to Original Hero

If you want to switch back, simply change the import back:

```tsx
import { Hero } from "./components/Hero";
```

Your original Hero component at `/components/Hero.tsx` remains unchanged.

### 🐛 Troubleshooting

**Issue**: "Cannot find module 'gsap/SplitText'"

- **Solution**: Make sure you have GSAP installed. SplitText is included with GSAP.

**Issue**: Shader background is black or not rendering

- **Solution**: Ensure Three.js and React Three Fiber are properly installed.

**Issue**: Text animations not working

- **Solution**: Check that GSAP and @gsap/react are installed correctly.

### 📝 Customization Tips

1. **Change shader colors**: Edit the `fragmentShader` in `neural-network-hero.tsx`
2. **Adjust animation timing**: Modify the GSAP timeline durations in the `useGSAP` hook
3. **Change text styling**: Update the Tailwind classes in the component
4. **Modify background gradient overlays**: Edit the gradient divs at the bottom of ShaderBackground

---

Enjoy your new Neural Network Hero! 🎉