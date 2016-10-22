// Cody Molho and Sam Gilbert
// IOT Hackday 2016, Hacking Brainwaves

var express = require('express');
var app = express();

var google = require('googleapis');
var prediction = google.prediction('v1.6');

var capture = false;
var trainingAnswer;

// google.auth.getApplicationDefault(function(err, authClient) {
// 	if (err) {
//     	console.log('Authentication failed because of ', err);
//     	return;
//   	}
//   if (authClient.createScopedRequired && authClient.createScopedRequired()) {
//     var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
//     authClient = authClient.createScoped(scopes);
//   }
//   var request = {
//   // TODO: Change placeholders below to appropriate parameter values for the 'list' method:
//     project: "brainwaves-147216", // The project associated with the model.
//     auth: authClient // Auth client
//   };
//   var recur = function(err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       if (result.nextPageToken) {
//         request.pageToken = result.nextPageToken;
//         prediction.trainedmodels.list(request, recur);
//       }
//     }
//   };
//   prediction.trainedmodels.list(request, recur);
// });

//WORKS
// google.auth.getApplicationDefault(function(err, authClient) {
//    if (err) {
//      console.log('Authentication failed because of ', err);
//      return;
//    }
//    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
//      var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
//      authClient = authClient.createScoped(scopes);
//    }

//   //  var request = { //WORKS FOR INSERT
//   //    // TODO: Change placeholders below to appropriate parameter values for the 'insert' method:
//   //    project: "brainwaves-147216",  //The project associated with the model.
//   //    auth: authClient,  // Auth client
//   //    resource: {
//   //    	id: "brainwavesfoo",
// 	 //    trainingInstances: [{output: "lie", csvInstance: ['1','2','3']}]
//  	// }
//   //  };

//     var request = {
//     	// TODO: Change placeholders below to appropriate parameter values for the 'insert' method:
//     	project: "brainwaves-147216",  //The project associated with the model.
//     	auth: authClient,  // Auth client
//     	id: "brainwavesiot",
//  		resource: {output: "lie", csvInstance: ['7','8','9']}
// 	};

//    prediction.trainedmodels.update(request, function(err, result) {
//      if (err) {
//        console.log(err);
//      } else {
//        console.log(result);
//      }
//    });
//  });


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/index', function(req, res) {
  console.log('GET /index');
  res.sendFile(__dirname + '/www/index.html');
});

// app.post('/toggleRecording', function(req, res) {
//   recording = !recording;
//   console.log("Recording set to " + recording);
//   res.send("Recording set to " + recording);
// });

app.post('/capture', function(req, res) {
  capture = true;
  trainingAnswer = req.data;
  console.log("capture on");
  res.send("capture on");
});

app.post('/dataStream', function (req, res) {
  if (capture) {
  	console.log("capture data: " + req.query.data);
  	var data = req.query.data.split(',');
  	google.auth.getApplicationDefault(function(err, authClient) {
	   if (err) {
	     console.log('Authentication failed because of ', err);
	     return;
	   }
	   if (authClient.createScopedRequired && authClient.createScopedRequired()) {
	     var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
	     authClient = authClient.createScoped(scopes);
	   }

	    var request = {
	    	// TODO: Change placeholders below to appropriate parameter values for the 'insert' method:
	    	project: "brainwaves-147216",  //The project associated with the model.
	    	auth: authClient,  // Auth client
	    	id: "brainwavesiot",
	 		resource: {output: trainingAnswer, csvInstance: data}
		};

	   prediction.trainedmodels.update(request, function(err, result) {
	     if (err) {
	       console.log(err);
	     } else {
	       console.log(result);
	     }
	   });
	 });
  	capture = false;
  	console.log("capture off");
  }
  res.send('data recieved');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});