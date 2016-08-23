let gruntConfig = require('./config/grunt.config');

module.exports = grunt => {
    grunt.initConfig(gruntConfig);
    grunt.task.loadTasks('./tasks');
};
