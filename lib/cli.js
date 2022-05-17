#! /usr/bin/env node

import { program } from "commander";
import { exec } from 'child_process';

const getBranch = () => new Promise((resolve, reject) => {
  return exec('git branch --show-current', (err, stdout, stderr) => {
    if (err) {
      reject(`Could not get current branch: ${err}`);
    } else if (typeof stdout === 'string') {
      resolve(stdout.trim());
    }
  });
});

program
  .version('0.0.1')
  .description("A CLI for Branch-Based Commit messages.")
  .option('-m, --message [message]', 'type your commit message')
  .action(async (options) => {
    const branch = await getBranch();
    const commitMessage = `git commit -m "${branch}: ${options.message}"`;
    exec(commitMessage, (error, stdout, stderr) => {
      if (error) {
        console.error(`${error}`);
      }
      if (stdout) {
        console.log(`${stdout}`);
      }
      if (stderr) {
        console.error(`${stderr}`);
      }
      return;
    });
  })
  .parse(process.argv);
