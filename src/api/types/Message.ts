const enum Message {
	Success = 'Success',
	NoChanges = 'No changes were made',
	MissingArticleName = 'No article name spacified',
	InvalidArticleName = 'The article with the given name does not exist',
	UnexpectedError = 'An unexpected error occured',
}

export default Message;