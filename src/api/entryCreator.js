import { mockAccounts } from './mockData';

// generateEntry takes a sentence and desc runs extractLines to get the raw data for a LINE_ITEM
export const generateEntry = (sentence, desc) => {
	console.log(desc);
	console.log(mockAccounts);
	return {
		lineItems: []
	}
}

