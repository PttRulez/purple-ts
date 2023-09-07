export class FFMpegBuilder {
	private _inputPath: string;
	private _outputPath: string;
	private _options: Map<string, string> = new Map();

	constructor() {
		this._options.set('-c:v', 'libx264');
	}

	input(inputPath: string): this {
		this._inputPath = inputPath;
		return this;
	}

	setVideoSize(width: number, height: number): this {
		this._options.set('-s', `${width}x${height}`);
		return this;
	}

	output(outputPath: string): string[] {
		if(!this._inputPath) {
			throw new Error('Не задан параметр input')
		}
		const args: string[] = ['-i', this._inputPath];
		this._options.forEach((value, key) => {
			args.push(key);
			args.push(value);
		});
		args.push(outputPath);

		return args;
	}
}
