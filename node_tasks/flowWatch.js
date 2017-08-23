'use strict';

const gulp = require('gulp');
const chalk = require('chalk');
const exec = require('child_process').exec;

class FlowGulp {

  constructor() {
    exec('flow start');
    this.out = this.out.bind(this);
    exec('flow', this.out);
    this.logInfo();
  }

  logInfo() {
    console.log('Flow Server is running on background.');
    console.log('Start watching files');
  }

  glob() {
    return [
      './js/src/**/*',
    ];
  }

  chalk(str) {
    return str.split('\n').map((s) => {
      let color = chalk.bold;
      this.chalkRules().forEach((rule) => {
        color = rule.regex.test(s) ? rule.chalk : color
      });
      return color(s);
    }).join('\n');
  }

  out(err, stdout, stderr) {
    console.log(this.chalk('Flow ========='));
    if (stdout) {
      console.log(this.chalk(stdout));
    }

    if (stderr) {
      console.log(this.chalk(stderr));
    }
    console.log(this.chalk('/Flow ========='));
  }

  chalkRules() {
    return [
      {
        regex: /^(\/)?Flow/,
        chalk: chalk.bold.blue
      },
      {
        regex: /^Found/,
        chalk: chalk.bold.red
      },
      {
        regex: /^(Found 0 errors|No errors!)/,
        chalk: chalk.bold.green
      },
      {
        regex: /^\s*\^+./,
        chalk: chalk.bold.red
      },
      {
        regex: /:[0-9]+$/,
        chalk: chalk.underline
      }
    ]
  }
}

gulp.task('exec:flow', () => {
  const flowGulp = new FlowGulp();
  gulp.watch(flowGulp.glob(), () => {
    exec('flow', flowGulp.out);
  });
});

gulp.start('exec:flow');

