// Script Generator Dummy Data
export const scriptTemplates = [
  {
    id: 'youtube-script',
    name: 'YouTube Video Script',
    description: 'A script template for YouTube videos with intro, main content, and call to action.',
    structure: [
      { name: 'Introduction', description: 'Hook the viewer and introduce the topic' },
      { name: 'Main Content', description: 'Deliver the core information or story' },
      { name: 'Call to Action', description: 'Ask viewers to like, subscribe, and comment' }
    ]
  },
  {
    id: 'podcast-script',
    name: 'Podcast Script',
    description: 'A structured script for podcast episodes with segments and transitions.',
    structure: [
      { name: 'Intro Music & Welcome', description: 'Welcome listeners and introduce the show' },
      { name: 'Topic Introduction', description: 'Introduce the main topic of the episode' },
      { name: 'Main Discussion', description: 'The core content of your podcast' },
      { name: 'Guest Interview', description: 'Questions and discussion with guests' },
      { name: 'Conclusion', description: 'Summarize key points and thank listeners' },
      { name: 'Outro', description: 'Closing remarks and call to action' }
    ]
  },
  {
    id: 'short-film',
    name: 'Short Film Script',
    description: 'A template for creating short film scripts with proper formatting.',
    structure: [
      { name: 'Scene Heading', description: 'INT/EXT. LOCATION - TIME OF DAY' },
      { name: 'Action', description: 'Description of what happens in the scene' },
      { name: 'Character', description: 'CHARACTER NAME' },
      { name: 'Dialogue', description: 'What the character says' },
      { name: 'Parenthetical', description: '(direction for how dialogue is delivered)' },
      { name: 'Transition', description: 'CUT TO:, DISSOLVE TO:, etc.' }
    ]
  },
  {
    id: 'explainer-video',
    name: 'Explainer Video Script',
    description: 'A script template for creating clear and concise explainer videos.',
    structure: [
      { name: 'Problem Statement', description: 'Identify the problem your product/service solves' },
      { name: 'Solution Introduction', description: 'Introduce your solution' },
      { name: 'How It Works', description: 'Explain how your solution works' },
      { name: 'Benefits', description: 'Highlight the key benefits' },
      { name: 'Social Proof', description: 'Include testimonials or statistics' },
      { name: 'Call to Action', description: 'Tell viewers what to do next' }
    ]
  }
];

export const scriptHistory = [
  {
    id: 'script-1',
    title: 'How to Make Perfect Pasta',
    type: 'YouTube Video Script',
    dateCreated: '2023-10-15T14:30:00Z',
    lastEdited: '2023-10-15T16:45:00Z',
    snippet: 'Welcome to my channel! Today we\'re going to learn how to make perfect pasta every time...'
  },
  {
    id: 'script-2',
    title: 'The Future of AI Technology',
    type: 'Podcast Script',
    dateCreated: '2023-10-10T09:15:00Z',
    lastEdited: '2023-10-12T11:20:00Z',
    snippet: 'Welcome to Tech Talk, the podcast where we discuss the latest in technology trends...'
  },
  {
    id: 'script-3',
    title: 'Morning Routine',
    type: 'Short Film Script',
    dateCreated: '2023-10-05T18:20:00Z',
    lastEdited: '2023-10-07T14:10:00Z',
    snippet: 'INT. BEDROOM - MORNING\n\nSunlight streams through half-closed blinds...'
  },
  {
    id: 'script-4',
    title: 'Introducing Our New App',
    type: 'Explainer Video Script',
    dateCreated: '2023-09-28T13:45:00Z',
    lastEdited: '2023-10-02T10:30:00Z',
    snippet: 'Are you tired of wasting time organizing your schedule? Our new app solves this problem...'
  }
];

export const sampleScriptContent = `# How to Make Perfect Pasta

## Introduction

Hello pasta lovers! Welcome back to my channel. Today, I'm going to share with you my foolproof method for making perfect pasta every single time. If you've ever ended up with sticky, mushy, or bland pasta, this video is going to change your pasta game forever.

## Main Content

### Choosing the Right Pasta

First, let's talk about choosing the right pasta. There are over 350 different pasta shapes, each designed for specific sauces and dishes:

- **Long pasta** (spaghetti, linguine, fettuccine): Perfect for oil-based and cream sauces
- **Tube pasta** (penne, ziti, macaroni): Great for chunky vegetable sauces and baked dishes
- **Shaped pasta** (farfalle, fusilli): Ideal for thicker sauces that can cling to the shapes
- **Filled pasta** (ravioli, tortellini): Best served with light butter or oil-based sauces

For today's demonstration, I'll be using classic spaghetti, which is versatile and perfect for beginners.

### The Perfect Water-to-Pasta Ratio

One of the biggest mistakes people make is not using enough water. You need:

1. A large pot
2. 4-5 quarts (4-5 liters) of water for every pound (450g) of pasta
3. About 1-2 tablespoons of salt per pound of pasta

This gives the pasta enough room to cook evenly and prevents sticking.

### The Cooking Process

1. Bring the water to a rolling boil before adding salt
2. Add salt only after the water is boiling (adding it earlier can pit your cookware)
3. Add pasta to the boiling water and stir immediately to prevent sticking
4. Set a timer for 1-2 minutes less than the package instructions (we'll finish cooking it in the sauce)
5. Stir occasionally during cooking
6. Before draining, save about 1 cup of the starchy pasta water for your sauce

### Testing for Doneness

The perfect pasta should be "al dente" - tender but still firm when bitten. Here's how to test:

1. Fish out a piece of pasta with a fork
2. Let it cool slightly
3. Bite into it - there should be a tiny white dot in the center for perfect al dente pasta

### Finishing in the Sauce

This is the professional chef's secret to amazing pasta:

1. Drain the pasta about 1-2 minutes before it's completely done
2. Immediately add it to your hot sauce
3. Add a splash of the reserved pasta water (about 1/4 cup)
4. Toss everything together over medium heat for 1-2 minutes
5. The pasta will finish cooking in the sauce, absorbing flavors while the starchy water helps create a silky texture

## Conclusion

And there you have it - perfectly cooked pasta that's properly seasoned, has the ideal texture, and is beautifully married with your sauce. No more bland, mushy pasta!

If you enjoyed this tutorial, please give this video a thumbs up, share it with your pasta-loving friends, and don't forget to subscribe for more cooking tips and recipes. Hit that notification bell so you never miss a new video!

Drop a comment below telling me your favorite pasta dish, and I might make it in an upcoming video.

Thanks for watching, and I'll see you in the next one!`;

export const fontSizes = [
  { value: '10px', label: '10' },
  { value: '12px', label: '12' },
  { value: '14px', label: '14' },
  { value: '16px', label: '16' },
  { value: '18px', label: '18' },
  { value: '20px', label: '20' },
  { value: '24px', label: '24' },
  { value: '30px', label: '30' },
  { value: '36px', label: '36' }
];

export const fontFamilies = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Verdana, sans-serif', label: 'Verdana' }
]; 