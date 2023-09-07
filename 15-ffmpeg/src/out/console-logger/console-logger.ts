import { IStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
	private static _instance: ConsoleLogger;

	log(...args: any[]): void {
		console.log(...args);
	}
	error(...args: any[]): void {
		console.log(...args);
	}
	end(): void {
		console.log('Готово');
	}

	public static getInstance (): ConsoleLogger {
		if (!ConsoleLogger._instance) {
			ConsoleLogger._instance = new ConsoleLogger();
		}
		return ConsoleLogger._instance;
	}
}