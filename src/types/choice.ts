export type Choice = {
  id: string;
  content?: string;
  image?: string;
  level?: number;
  parents?: string[];
  sound?: string;
  caption?: string;
};
// Firestore data converter
export const choiceConverter = {
  toFirestore: (choice: Choice) => {
    return {
      content: choice.content,
      image: choice.image,
      level: choice.level,
      parents: choice.parents,
      sound: choice.sound,
      caption: choice.caption,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return {
      content: data.content,
      image: data.image,
      level: data.level,
      parents: data.parents,
      sound: data.sound,
      caption: data.caption,
    } as Choice;
  },
};
