// Web Audio API based ambient Indian classical Shehnai/Flute/Tanpura synthesizer
// Provides an instant, crystal-clear spiritual royal wedding background ambiance

class IndianWeddingAmbianceEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private tanpuraOscs: OscillatorNode[] = [];

  // Raag Mohanam / Bhupali (Auspicious South Indian wedding scale: Sa, Ri2, Ga3, Pa, Dha2)
  // Base C# (approx 277.18 Hz)
  private readonly scaleFreqs = [
    277.18, // Sa (C#4)
    311.13, // Ri (D#4)
    349.23, // Ga (F4)
    415.30, // Pa (G#4)
    466.16, // Dha (A#4)
    554.37, // Sa' (C#5)
    622.25, // Ri' (D#5)
    698.46, // Ga' (F5)
  ];

  public async init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  public async play() {
    await this.init();
    if (!this.ctx) return;

    this.isPlaying = true;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 3);
    this.masterGain.connect(this.ctx.destination);

    // Start Tanpura Drone (Sa - Pa - Sa')
    this.startTanpuraDrone();

    // Start Serene Flute Notes
    this.scheduleNextFluteNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        this.stopAllNodes();
      }, 1300);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private startTanpuraDrone() {
    if (!this.ctx || !this.masterGain) return;

    const droneNotes = [138.59, 207.65, 277.18]; // C#3, G#3, C#4

    droneNotes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle vibrato
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.2 + idx * 0.1, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(0.06 / (idx + 1), this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      this.tanpuraOscs.push(osc);
    });
  }

  private scheduleNextFluteNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    // Pick a note from auspicious Raag Mohanam
    const noteFreq = this.scaleFreqs[Math.floor(Math.random() * this.scaleFreqs.length)];
    const duration = 2.5 + Math.random() * 2.5;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle'; // Soft warm flute timbre
    osc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    // Gentle envelope
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.08, now + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);

    const nextDelay = (duration * 0.8 + Math.random() * 1.5) * 1000;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextFluteNote();
    }, nextDelay);
  }

  private stopAllNodes() {
    this.tanpuraOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.tanpuraOscs = [];
  }
}

export const ambianceEngine = new IndianWeddingAmbianceEngine();
