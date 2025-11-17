class Processor extends AudioWorkletProcessor {
  process([input]) {
    if (input[0]?.length) {
      this.port.postMessage({ audioData: input[0] });
    }
    return true;
  }
}

registerProcessor("processor", Processor);