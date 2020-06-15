export class AppConfig {

  constructor(private config: any) {}

  get() {
    return this.config;
  }
}
