// Web Audio API Synthesizer specifically performing the iconic melody of
// "Anbil Avan" (Vinnaithaandi Varuvaayaa — A.R. Rahman)
// Provides instant, rich acoustic guitar/flute/tanpura harmonies

export class AnbilAvanMelodyEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerIds: number[] = [];

  // Key of D Major / Shankarabharanam (D4 = 293.66 Hz, E4 = 329.63 Hz, F#4 = 369.99 Hz, G4 = 392.00 Hz, A4 = 440.00 Hz, B4 = 493.88 Hz, C#5 = 554.37 Hz, D5 = 587.33 Hz)
  private readonly NOTE = {
    D3: 146.83,
    A3: 220.00,
    D4: 293.66,
    E4: 329.63,
    Fsharp4: 369.99,
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    Csharp5: 554.37,
    D5: 587.33,
    E5: 659.25,
    Fsharp5: 739.99,
  };

  public async init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    this.clearAllTimers();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 1.5);
    this.masterGain.connect(this.ctx.destination);

    // Start Ambient Drone & Pad
    this.startWarmDrone();

    // Start the iconic "Anbil Avan" Melodic Cycle
    this.loopAnbilAvanTheme();
  }

  public pause() {
    this.isPlaying = false;
    this.clearAllTimers();

    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      } catch {
        // ignore
      }
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

  private clearAllTimers() {
    this.timerIds.forEach(id => clearTimeout(id));
    this.timerIds = [];
  }

  private startWarmDrone() {
    if (!this.ctx || !this.masterGain) return;

    const droneFreqs = [this.NOTE.D3, this.NOTE.A3, this.NOTE.D4];

    droneFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
    });
  }

  // Plays a warm plucked acoustic guitar/harp note
  private playPluck(freq: number, time: number, duration: number = 1.2, volume: number = 0.15) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + duration);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(volume, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  // Plays a lyrical bamboo flute note with gentle vibrato and breathy envelope
  private playFlute(freq: number, time: number, duration: number = 1.5, volume: number = 0.18) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Vibrato
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(4.8, time);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(2.2, time);
    lfo.connect(osc.frequency);
    lfo.start(time + 0.2);
    lfo.stop(time + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(volume, time + 0.15);
    gain.gain.exponentialRampToValueAtTime(volume * 0.7, time + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  // Melodic Phrase: Anbil Avan Serndhaane...
  private loopAnbilAvanTheme() {
    if (!this.ctx || !this.isPlaying) return;

    const t = this.ctx.currentTime + 0.1;
    const tempo = 0.48; // seconds per beat

    // Intro Guitar Pluck Pattern (D Major - Bm - G - A)
    const arpeggio = [
      { f: this.NOTE.D4, d: 0 },
      { f: this.NOTE.Fsharp4, d: 0.5 },
      { f: this.NOTE.A4, d: 1.0 },
      { f: this.NOTE.D5, d: 1.5 },
      { f: this.NOTE.Csharp5, d: 2.0 },
      { f: this.NOTE.B4, d: 2.5 },
      { f: this.NOTE.A4, d: 3.0 },
      { f: this.NOTE.Fsharp4, d: 3.5 },
      
      { f: this.NOTE.G4, d: 4.0 },
      { f: this.NOTE.B4, d: 4.5 },
      { f: this.NOTE.D5, d: 5.0 },
      { f: this.NOTE.Csharp5, d: 5.5 },
      { f: this.NOTE.A4, d: 6.0 },
      { f: this.NOTE.Fsharp4, d: 6.5 },
      { f: this.NOTE.E4, d: 7.0 },
      { f: this.NOTE.D4, d: 7.5 },
    ];

    arpeggio.forEach(n => {
      this.playPluck(n.f, t + n.d * tempo, 1.2, 0.14);
    });

    // Lead Melody: "Anbil Avan... Serndhaane..."
    const leadNotes = [
      // "An - bil - A - van" (F#4, A4, D5, C#5, B4, A4)
      { f: this.NOTE.Fsharp4, start: 8.0, dur: 1.2 },
      { f: this.NOTE.A4, start: 9.2, dur: 1.0 },
      { f: this.NOTE.D5, start: 10.4, dur: 1.8 },
      { f: this.NOTE.Csharp5, start: 12.2, dur: 1.2 },
      { f: this.NOTE.B4, start: 13.4, dur: 1.4 },
      { f: this.NOTE.A4, start: 14.8, dur: 2.2 },

      // "Serndhaane... Anbil Avan..." (G4, B4, D5, E5, D5)
      { f: this.NOTE.G4, start: 17.2, dur: 1.2 },
      { f: this.NOTE.B4, start: 18.4, dur: 1.2 },
      { f: this.NOTE.D5, start: 19.6, dur: 1.5 },
      { f: this.NOTE.E5, start: 21.1, dur: 1.6 },
      { f: this.NOTE.Fsharp5, start: 22.8, dur: 2.4 },
      { f: this.NOTE.E5, start: 25.2, dur: 1.4 },
      { f: this.NOTE.D5, start: 26.6, dur: 3.0 },
    ];

    leadNotes.forEach(n => {
      this.playFlute(n.f, t + n.start * tempo * 0.7, n.dur * tempo, 0.22);
      this.playPluck(n.f, t + n.start * tempo * 0.7, 1.0, 0.08); // Acoustic layer
    });

    const totalCycleDuration = 22 * 1000; // 22 seconds loop

    const timer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.loopAnbilAvanTheme();
      }
    }, totalCycleDuration);

    this.timerIds.push(timer);
  }
}

export const anbilAvanEngine = new AnbilAvanMelodyEngine();
