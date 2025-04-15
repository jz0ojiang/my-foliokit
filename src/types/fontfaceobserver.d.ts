declare module 'fontfaceobserver' {
  export default class FontFaceObserver {
    constructor(family: string, descriptors?: { weight?: number; style?: string });
    load(text?: string | null, timeout?: number): Promise<void>;
  }
} 