module.exports = function(app){

    app.get('/gerarseed', function (req, res) {
	 //  console.log(req);
           
           
          var url = require('url');
          var url_parts = url.parse(req.url, true);


           console.log(url_parts.query);
	});
}
