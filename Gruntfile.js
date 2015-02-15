module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>  <%= pkg.version %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		bumpup: 'package.json',
		watch: {
			scripts: {
				files: ['src/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: true  
				}
			}
		},
		jshint: {
			all: [
			'src/<%= pkg.name %>.js'
			]	
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bumpup');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('release', ['bump', 'uglify']);
	grunt.registerTask('bump', function(type) {
			type = type ? type : 'patch';
			return grunt.task.run("bumpup:" + type);
	});

};