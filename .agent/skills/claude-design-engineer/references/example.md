# Craft in Action

This shows how the subtle layering principle translates to real decisions. Learn the thinking, not the code. Your values will differ — the approach won't.

---

## The Subtle Layering Mindset

Before looking at any example, internalize this: **you should barely notice the system working.**

When you look at Vercel's dashboard, you don't think "nice borders." You just understand the structure. When you look at Supabase, you don't think "good surface elevation." You just know what's above what. The craft is invisible — that's how you know it's working.

---

## Example: Dashboard with Sidebar and Dropdown

### The Surface Decisions

```
Base (canvas): hsl(0 0% 7%)
Surface-100 (cards): hsl(0 0% 9%)      ← 2% lighter
Surface-200 (dropdown): hsl(0 0% 11%)  ← 2% lighter again
Surface-300 (nested): hsl(0 0% 13%)    ← 2% lighter again
```

**Why so subtle?** Each jump is only ~2% lightness. You can barely see the difference in isolation. But when surfaces stack, the hierarchy emerges. This is the Vercel/Supabase way — whisper-quiet shifts that you feel rather than see.

**What NOT to do:** Don't jump from 7% to 20% for your first elevation. That's jarring. Don't use different hues for different levels. Keep the same hue, shift only lightness.

### The Border Decisions

```
Border default: rgba(255, 255, 255, 0.06)
Border subtle: rgba(255, 255, 255, 0.04)
Border strong: rgba(255, 255, 255, 0.12)
```

**Why rgba, not solid colors?** Low opacity borders blend with their background. A 6% white border on a dark surface is barely there — it defines the edge without demanding attention. Solid `#333` borders look harsh in comparison.

**The test:** Look at your interface from arm's length. If borders are the first thing you notice, reduce opacity. If you can't find where regions end, increase slightly.

### The Sidebar Decision

**Why same background as canvas, not different?**

Many dashboards make the sidebar a different color. This fragments the visual space — now you have "sidebar world" and "content world."

Better: Same background, subtle border separation. The sidebar is part of the app, not a separate region. Vercel does this. Supabase does this. The border is enough.

### The Dropdown Decision

**Why surface-200, not surface-100?**

The dropdown floats above the card it emerged from. If both were surface-100, the dropdown would blend into the card — you'd lose the sense of layering. Surface-200 is just light enough to feel "above" without being dramatically different.

**Why border-overlay instead of border-default?**

Overlays (dropdowns, popovers) often need slightly more definition because they're floating in space. A touch more opacity (0.08 instead of 0.06) helps them feel contained without being harsh.

---

## Example: Form Controls

### Input Background Decision

```
Control background: hsl(0 0% 5%)  ← darker than canvas
```

**Why darker, not lighter?**

Inputs are "inset" — they receive content, they don't project it. A slightly darker background signals "type here" without needing heavy borders. This is the alternative-background principle.

### Focus State Decision

```
Default border: rgba(255, 255, 255, 0.06)
Focus border: rgba(255, 255, 255, 0.20)
```

**Why only 0.20 for focus?**

Focus needs to be visible, but 0.20 is plenty for a clear state change from 0.06. You don't need a glowing ring or dramatic color. Subtle-but-noticeable — the same principle as surfaces.

---

## What This Doesn't Prescribe

These specific values (7%, 9%, 0.06 alpha) are examples. Your product might need:
- Warmer hues (slight yellow/orange tint)
- Cooler hues (blue-gray base)
- Different lightness progression
- Light mode (principles invert — higher elevation = shadow, not lightness)

**The principle is constant:** barely different, still distinguishable. The values adapt to context.

---

## The Craft Check

Apply the squint test to your work:

1. Blur your eyes or step back
2. Can you still perceive hierarchy?
3. Is anything jumping out at you?
4. Can you tell where regions begin and end?

If hierarchy is visible and nothing is harsh — the subtle layering is working.
