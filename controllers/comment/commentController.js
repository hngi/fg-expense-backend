let rp = require('request-promise');
/**
 * export.method = req, res function
 * 
 */

exports.getAll = [
	async function(req, res, next) {
		let expense_id = req.params.expense_id;
		try{
			var options = {
		    	uri: `https://my-json-server.typicode.com/airondev/json-server/expenses/${expense_id}/comments`, //this will be replaced with uri to comments api service
			    headers: {
			        'User-Agent': 'Request-Promise'
			    },
		    	json: true // Automatically parses the JSON string in the response
			};
		 
			const comments = await rp(options)
		    	.then(function (comments) {
		        return comments;
		    })
		    .catch(function (err) {
        		// API call failed...
        		res.json({
   					status: false,
   					error: err.name,
   					message: err.message
   				});
   			});

   		if(comments){
   			res.json({
   				status: true,
   				comments: comments
   			});
   		}
   		
		 }catch(err){
		 		console.log(err.message);
		 }

	}
]