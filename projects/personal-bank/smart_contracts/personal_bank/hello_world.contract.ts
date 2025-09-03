import { Contract, Box } from '@algorandfoundation/algokit-utils/types/app-contract';

export class HelloWorld extends Contract {
  boxGithub = Box<string>({ key: 'github' });

  hello(name: string): string {
    return `Hello, ${name}`;
  }

  deposit(github: string): void {
    this.boxGithub.value = github;
  }
}
