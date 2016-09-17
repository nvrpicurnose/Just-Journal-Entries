
const activities = [
		/\sspent\s/ig,	// spent
		/\searned\s/ig,	// earned
		/\sinvested\s/ig	// invested
	];

const priceRegex = /\$\d+/i;

const prefixs = [
		/\son\s/g, 	// on
		/\sfrom\s/g, 	// from
		/\sin\s/g    // in
	];

const accountRegex = /\w+\s/ig;


export const keywordExtractor = (sentence) => {
	const p = new Promise(function(resolve, rej){
		processIntent(sentence)
			.then(function(desc){
				// console.log(desc);
				// console.log("successfully got intent");
				return processPrice(sentence, desc)
			})
			.then(function(desc){
				// console.log(desc);
				// console.log("successfully got price");
				return extractAccountName(sentence, desc)
			})
			.then(function(desc){
				console.log(desc);
				console.log("Finished extracting keywords!");
				resolve(desc);
			})
	});
	return p;
}

const processIntent = (sentence) => {
	const p = new Promise(function(resolve, rej){
		for(let a=0; a<activities.length; a++){
			let activity = sentence.match(activities[a]);
			if(activity.length == 0){
				break;
			}else{
				const desc = {
					intent: activity[0].trim()
				};
				resolve(desc);
			}
		}
		rej("No intent found");	// throw rejection if no intent was found
	});
	return p;
}

const processPrice = (sentence, desc) => {
	const p = new Promise(function(resolve, rej){
		let prices = sentence.match(priceRegex);
		if(prices.length == 0){
			rej("No dollar amount found");
		}else{
			const price = parseInt(prices[0].slice(1));
			// const we = Object.assign({}, desc, {price: price});
			desc.price = price;
			resolve(desc);
		}
	});
	return p;
}

const extractAccountName = (sentence, desc) => {
	const p = new Promise(function(resolve, rej){
		// prepare to find the account by searching the string for prefixes
		for(let a=0; a<prefixs.length; a++){
			let result = prefixs[a].exec(sentence);
			if(result){
				// then use the accountPosition to help accountRegex
				let accountPosition = result.index + result[0].length;	
				const account = sentence.slice(accountPosition);
				if(account){
					desc.acct_name = account;
					resolve(desc);
				}else{
					rej("No account name found");
				}
			}else{
				rej("No prefix found. Could not search for account name.");
			}
		}
	});
	return p;
}
