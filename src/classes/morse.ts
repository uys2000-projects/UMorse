export class Morse {
  uid!: string;

  dot!: string;
  dash!: string;
  slash!: string;

  text!: string;

  timestamp!: number;
  utimestamp!: number;
  constructor(
    uid = "anonymous",
    dot = ".",
    dash = "-",
    slash = "/",
    text = "",
    timestamp = Date.now(),
    utimestamp = Date.now()
  ) {
    this.uid = uid;
    this.dot = dot;
    this.dash = dash;
    this.slash = slash;
    this.text = text;
    this.timestamp = timestamp;
    this.utimestamp = utimestamp;
  }
}
