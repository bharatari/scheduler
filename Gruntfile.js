module.exports = function(grunt) {
    grunt.initConfig({
        clean: ["SchedulerAPI/assets/SchedulerOnline/"],
        copy: {
            main: {
                files: [ 
                    {expand: true, cwd: 'SchedulerOnline/dist/', src: ['**'], dest: 'SchedulerAPI/assets/SchedulerOnline/'},
                ]
            }
        },
        replace: {
            index: {
                src: ['SchedulerAPI/assets/SchedulerOnline/index.html'], 
                dest: 'SchedulerAPI/views/homepage.ejs', 
                replacements: [{
                    from: 'href="assets/',                   
                    to: 'href="/SchedulerOnline/assets/'
                }, {
                    from: 'src="assets/',                   
                    to: 'src="/SchedulerOnline/assets/'
                }]
            },
            css: {
                src: ['SchedulerAPI/assets/SchedulerOnline/assets/*.css'], 
                overwrite: true,
                replacements: [{
                    from: "(/images/",                   
                    to: "(/SchedulerOnline/images/"
                }]
            },
            js: {
                src: ['SchedulerAPI/assets/SchedulerOnline/assets/*.js'],
                overwrite: true,
                replacements: [{
                    from: '"images/',                   
                    to: '"/SchedulerOnline/images/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('default', ['clean', 'copy', 'replace'])
}