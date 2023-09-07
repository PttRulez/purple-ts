import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { PromptService } from "../../core/prompt/prompt.service";
import { FFMpegBuilder } from "./ffmpeg.builder";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types";
import { FileService } from "../../core/files/file.service";
import { StreamHandler } from "../../core/handlers/stream.handler";


export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(logger: IStreamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<IFfmpegInput> {
		const inputPath = await this.promptService.input<string>('Введите путь до форматируемого файла', 'input');
		const width = await this.promptService.input<number>('Введите ширину конечного формата', 'number');
		const height = await this.promptService.input<number>('Введите высоту конечного формата', 'number');
		const name = await this.promptService.input<string>('Введите имя конечного файла', 'input');

		return { inputPath, width,	height,	name };
	}

	protected build({ inputPath, width, height, name }: IFfmpegInput): ICommandExecFfmpeg {
		const output = this.fileService.getFilePath(inputPath, name, 'mp4');
		
		const args = new FFMpegBuilder()
			.input(inputPath)
			.setVideoSize(width, height)
			.output(output);

		return {
			command: 'ffmpeg',
			args,
			output
		}
	}

	protected spawn({ output, command, args }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
		this.fileService.deleteFIleIfExists(output);
		return spawn(command, args);
	}

	protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
		const handler = new StreamHandler(logger);
		handler.processOutput(stream);
	}
}
