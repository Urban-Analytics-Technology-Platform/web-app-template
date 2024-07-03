#!/usr/bin/env node
import { input } from '@inquirer/prompts';

const answer = await input({ message: 'Enter your name' });

console.log(answer)
