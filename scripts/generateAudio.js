// Generate a valid audio file for public/audio/anbil_avan.mp3 (WAV formatted audio file)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sampleRate = 22050;
const durationSeconds = 18;
const totalSamples = sampleRate * durationSeconds;
const numChannels = 1;
const bytesPerSample = 2; // 16-bit

const notes = [
  // Anbil Avan intro arpeggio in D Major
  { f: 293.66, t: 0, d: 0.5 },
  { f: 369.99, t: 0.5, d: 0.5 },
  { f: 440.00, t: 1.0, d: 0.5 },
  { f: 587.33, t: 1.5, d: 0.5 },
  { f: 554.37, t: 2.0, d: 0.5 },
  { f: 493.88, t: 2.5, d: 0.5 },
  { f: 440.00, t: 3.0, d: 0.5 },
  { f: 369.99, t: 3.5, d: 0.5 },
  { f: 392.00, t: 4.0, d: 0.5 },
  { f: 493.88, t: 4.5, d: 0.5 },
  { f: 587.33, t: 5.0, d: 0.5 },
  { f: 554.37, t: 5.5, d: 0.5 },
  { f: 440.00, t: 6.0, d: 0.5 },
  { f: 369.99, t: 6.5, d: 0.5 },
  { f: 329.63, t: 7.0, d: 0.5 },
  { f: 293.66, t: 7.5, d: 0.8 },

  // Lead Melody Phrase (Anbil Avan Serndhaane...)
  { f: 369.99, t: 8.5, d: 0.8 },
  { f: 440.00, t: 9.3, d: 0.7 },
  { f: 587.33, t: 10.0, d: 1.4 },
  { f: 554.37, t: 11.4, d: 0.8 },
  { f: 493.88, t: 12.2, d: 0.9 },
  { f: 440.00, t: 13.1, d: 1.6 },
  { f: 392.00, t: 14.7, d: 0.7 },
  { f: 493.88, t: 15.4, d: 0.7 },
  { f: 587.33, t: 16.1, d: 1.8 },
];

const samples = new Float32Array(totalSamples);

// Render notes
notes.forEach(n => {
  const startSample = Math.floor(n.t * sampleRate);
  const noteSamples = Math.floor(n.d * sampleRate);
  for (let i = 0; i < noteSamples && startSample + i < totalSamples; i++) {
    const time = i / sampleRate;
    const progress = i / noteSamples;
    const env = Math.sin(progress * Math.PI) * Math.exp(-progress * 2.5);
    const fundamental = Math.sin(2 * Math.PI * n.f * time);
    const overtone = 0.3 * Math.sin(4 * Math.PI * n.f * time);
    samples[startSample + i] += (fundamental + overtone) * env * 0.45;
  }
});

// Render warm drone
for (let i = 0; i < totalSamples; i++) {
  const time = i / sampleRate;
  const drone = 0.08 * Math.sin(2 * Math.PI * 146.83 * time) + 0.05 * Math.sin(2 * Math.PI * 220.0 * time);
  samples[i] += drone;
}

// Write standard WAV header
const dataLength = totalSamples * bytesPerSample;
const buffer = Buffer.alloc(44 + dataLength);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataLength, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28); // ByteRate
buffer.writeUInt16LE(numChannels * bytesPerSample, 32); // BlockAlign
buffer.writeUInt16LE(bytesPerSample * 8, 34); // BitsPerSample
buffer.write('data', 36);
buffer.writeUInt32LE(dataLength, 40);

for (let i = 0; i < totalSamples; i++) {
  const clamped = Math.max(-1, Math.min(1, samples[i]));
  const intSample = clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF;
  buffer.writeInt16LE(intSample, 44 + i * 2);
}

const outDir = path.join(__dirname, '..', 'public', 'audio');
fs.mkdirSync(outDir, { recursive: true });
const targetFile = path.join(outDir, 'anbil_avan.mp3');
fs.writeFileSync(targetFile, buffer);
console.log('Successfully generated Anbil Avan audio at:', targetFile);
