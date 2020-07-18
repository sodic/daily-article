const enum Message {
	Success = 'Success',
	NoChanges = 'No changes were made',
	MissingArticleName = 'No article with the specified name',
	InvalidArticleName = 'The article with the given name does not exist',
	UnexpectedError = 'An unexpected error occurred',
}

export default Message;