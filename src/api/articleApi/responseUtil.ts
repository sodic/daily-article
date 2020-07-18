import { Response } from 'express';
import OperationStatus from 'api/types/OperationStatus';
import Message from 'api/types/Message';

export function sendErrorResponse(res: Response, message: string, status: 400 | 500 = 400): void {
	sendResponse(res, message, status);
}
export function sendAppropriateResponse(res: Response, operationStatus: OperationStatus): void {
	responseFor[operationStatus](res);
}

function sendResponse(res: Response, message: string, status: number) {
	res.status(status).send(message);
}

const responseFor: Record<OperationStatus, (r: Response) => void> = {
	[OperationStatus.NoChanges]: res => sendResponse(res, Message.NoChanges, 200),
	[OperationStatus.InvalidArticleName]: res => sendErrorResponse(res, Message.MissingArticleName),
	[OperationStatus.UnexpectedError]: res => sendErrorResponse(res, Message.UnexpectedError, 500),
	[OperationStatus.Success]: res => sendResponse(res, Message.Success, 200),
};
