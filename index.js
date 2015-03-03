var fs = require('fs');
var gravatar = require('gravatar');
var _ = require('lodash')
var Mustache = require('mustache');
var moment = require('moment');

function render(resumeObject) {


	_.each(resumeObject.work, function(w){
		w.startDateYear = moment(w.startDate).format("MMM YYYY");
		if(w.endDate) {
			w.endDateYear = moment(w.endDate).format("MMM YYYY");
		} else {
			w.endDateYear = 'Present'
		}
	});
	_.each(resumeObject.education, function(e){
    if( !e.area || !e.studyType ){
      e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
    }  else {
      e.educationDetail = e.area + ", "+ e.studyType;
    }
		e.startDateYear = moment(e.startDate).format("MMM YYYY");
		if(e.endDate) {
			e.endDateYear = moment(e.endDate).format("MMM YYYY");
		}  else {
			e.endDateYear = 'Present'
		}
	});
	if(resumeObject.basics && resumeObject.basics.email) {
		resumeObject.basics.gravatar = gravatar.url(resumeObject.basics.email, {
                        s: '100',
                        r: 'pg',
                        d: 'mm'
                    });
	}
	resumeObject.profiles = {};

	_.each(resumeObject.basics.profiles, function(profile){
    	resumeObject.profiles[profile.network] = profile.username;
	});
	console.log(resumeObject.profiles);
	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);


	return resumeHTML;
};
module.exports = {
	render: render
}
