export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  prompt: string;
  description: string;
  greeting: string;
  color: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
