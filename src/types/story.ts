export type Story = {
  content?: string;
  image?: string;
  title?: string;
  narration?: string;
  sound?: string;
  creator?: string;
};
// Firestore data converter
export const storyConverter = {
  toFirestore: (story: Story) => {
    return {
      content: story.content,
      image: story.image,
      title: story.title,
      narration: story.narration,
      sound: story.sound,
      creator: story.creator,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return {
      content: data.content,
      image: data.image,
      narration: data.narration,
      sound: data.sound,
      title: data.title,
      creator: data.creator,
    } as Story;
  },
};
