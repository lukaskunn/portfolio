I want you to create the animations for the homepage components.

I have a context to track when the loading is finished, so, after the load finish i want you to show the elements in the homepage.

I want these components to feel like awwwards website animations like the duration and the easing. These animations should looks good in terms of motion design.

Some ideas i have for the animations are:

1. The main title should appear each letter one by one with a slight delay between each letter.
2. the currently position and the local city should appear from top to bottom with a smooth easing.
3. The profile image should appear from clippath top-left to bottom-right. it should look like a reveal animation and wait 4s after the title loads so people can see the title first.
4. the header should slide down from the top with a smooth easing.
5. the footer social media links should appear one by one from left to right with a slight delay between each link.
6. the footer welcome message should appear each letter one by one with a slight delay between each letter. the animation should be a bit faster than the main title animation.

I want you to use GSAP for the animations and i want to make ease to create some animations for page transitions later. I think you can create a custom hook to use GSAP in the components and a context to control the animations easings and durations globally.

If you preffer, you can create a custom component to wrap the elements that will be animated with GSAP and use that component in the homepage components.

If you preffer also, you can create a custom component for each animation that looks repetitive, like the letter by letter animation for example.

After this. I want you to create some hover animations.
For the links, i want you to create a smooth text scroll effect when the user hover the link. Like the letters move up a bit and a duplicate of the text appears below it, so it looks like a continuous scroll of the text. It should be a foward-backward animation when the user hover and unhover the link. wrap this animations in all the links in the homepage (header and footer).
