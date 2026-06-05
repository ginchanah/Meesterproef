export const data = {
  glossaryItems: [
    {
      title: "Intra-action",
      slug: "intra-action",
      categories: ["category-1"],
      titleAnimation: {
        numberOfTexts: 20,
        repeatTextBlocks: 3,
        word: "intra-action",
        className: "intra-action"
      },
      content: [
        {
          type: "media-left",
          intro: {
            type: "quote",
            text: "Intra-action signifies the mutual constitution of entangled agencies. That is, in contrast to the usual ‘interaction,’ which assumes the prior existence of independent entities, intra-action recognizes that distinct agencies emerge through their intra-action."
          },
          author: "Karen Barad",
          subtext: {
            type: "source",
            text: "Barad, K. (2007). Meeting the universe halfway: Quantum physics and the entanglement of matter and meaning. duke university Press. p. 141"
          },
          media: [
            {
              type: "image",
              src: "/public/assets/images/intra-action-2.png",
              alt: "The word intra-action written several times, overlapping in a way that makes it almost unreadable.",
            },
          ],
        },
        {
          type: "media-right",
          heading: "Immaterials: Light Painting Wifi",
          intro: {
            type: "text",
            text: "The project explores the invisible terrain of WiFi networks in urban spaces by light painting signal strength in long-exposure photographs. A four-metre tall measuring rod with 80 points of light reveals cross-sections through WiFi networks using a photographic technique called light-painting."
          },
          author: "Timo Arnall",
          subtext: {
            type: "link",
            text: "https://www.elasticspace.com/2013/09/the-immaterials-project"
          },
          media: [
            {
              type: "image",
              src: "/public/assets/images/intra-action-1.png",
              alt: "Wifi portrayed as light point on a wall that together form a landscape like shape."
            },
          ]
        }
      ],
      generalImage: {
        type: "image",
        src: "/public/assets/images/intra-action-3.png"
      }
    },
    {
      title: "example",
      slug: "example",
      categories: ["example-category"],
    }
  ],
};
