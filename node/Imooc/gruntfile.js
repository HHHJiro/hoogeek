module.exports = function(grunt){
	
	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true
				}
			},
			js:{
				files:['public/js/**','models/**/*.js','schemas/**/*.js'],
				//tasks:['jshint'],
				options:{
					livereload: true
					}
				}
			},

			mochaTest:{
				options:{
					reporter:'spec'
				},
				src:['test/**/*.js']
			},

			nodemon:{
				dev:{
					script: 'app.js',  //新版本的改动
					options:{
						//file:'app.js',   //不用这个
						args:[],
						ignoreFiles:['README.md','node_modules/**','DS_Store'],
						watchedExtensions:['js'],
						watchedFolders:['./'],
						debug:true,
						delayTime:1,
						env:{
							PORT:3000
						},
						cwd: __dirname
					}
				}
			},

			concurrent:{
				tasks:['nodemon','watch'],
				options:{
					logConcurrentOutput:true
				}
			}
		})
	

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')
	grunt.loadNpmTasks('grunt-mocha-test')

	grunt.option('force',true)
	grunt.registerTask('default',['concurrent'])

	grunt.registerTask('test',['mochaTest'])
}