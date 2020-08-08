// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default {
	port: parseInt(process.env.SERVER_PORT || '8080', 10),
};
