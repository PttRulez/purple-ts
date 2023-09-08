import { ICommandExec } from "../../core/executor/command.types";

export interface IFfmpegInput {
	inputPath: string;
	width: number;
	height: number;
	name: string;
}

export interface ICommandExecFfmpeg extends ICommandExec {
	output: string;
}