import * as Tone from "tone";

export function createDrumSampler() {
  return new Tone.Sampler({
    urls: {
      C3: "kick.mp3",
      D3: "snare.mp3",
      E3: "hihat.mp3",
    },
    baseUrl: "/samples/",
  });
}
