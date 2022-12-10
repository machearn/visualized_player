const audioContext = new AudioContext();

class MusicContext {
  constructor(options) {
    this.audioContext = audioContext;
    this.gainNode = audioContext.createGain();
    this.gainNode.connect(audioContext.destination);

    this.analyser = audioContext.createAnalyser();
    this.analyser.connect(this.gainNode);

    this.analyser.fftSize = options.size * 2 || 2048;

    if (options.audioElement) {
      this.source = audioContext.createMediaElementSource(options.audioElement);
      this.source.connect(this.analyser);
    }

    this.data = new Uint8Array(this.analyser.frequencyBinCount);

    if (audioContext) {
      const resumeAudio = () => {
        if (audioContext.state === 'suspended') { audioContext.resume(); }
        document.removeEventListener('click', resumeAudio);
      }
      document.addEventListener('click', resumeAudio);
    }
  }

  destroy() {
    this.analyser.disconnect(this.gainNode);
    this.source.disconnect(this.analyser);
    this.gainNode.disconnect(this.audioContext.destination);
  }

  setAudioElement(audioElement) {
    if (this.source) {
      this.source.disconnect(this.analyser);
    }
    this.source = this.audioContext.createMediaElementSource(audioElement);
    this.source.connect(this.analyser);
  }

  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.data);
    return this.data;
  }
}

export default MusicContext;