export interface DrumPattern {
  id: string;
  name: string;
  bpm: number;
  timeSignature: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}
